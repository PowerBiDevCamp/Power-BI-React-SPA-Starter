
import { msalInstance } from './../index';
import { PowerBiPermissionScopes } from "../AuthConfig";
import { PowerBiWorkspace } from "./../models/PowerBiModels";
import { AuthenticationResult } from '@azure/msal-browser';

const PowerBiApiRoot: string = "https://api.powerbi.com/v1.0/myorg/";

export default class PowerBiService {

  static GetAccessToken = async (): Promise<string> => {
    const account = msalInstance?.getActiveAccount();
    if (account) {
      let authResult: AuthenticationResult;
      try {
        // try to acquire access token from MSAL cache first
        authResult = await msalInstance.acquireTokenSilent({ scopes: PowerBiPermissionScopes, account: account });
        console.log("access token acquire from local MSAL cache");
      }
      catch {
        // if access token not available in cache, interact with user to acquire new access token 
        authResult = await msalInstance.acquireTokenPopup({ scopes: PowerBiPermissionScopes, account: account });
        console.log("access token acquire from call to Azire AD");
      }
      // return access token from authnetication result 
      return authResult.accessToken;
    }

  };

  static GetWorkspaces = async (): Promise<PowerBiWorkspace[]> => {
    var restUrl = PowerBiApiRoot + "groups/";

    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response.value; });
  }

}

