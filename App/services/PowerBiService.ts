import { msalInstance } from './../index';
import { PowerBiPermissionScopes } from "../AuthConfig";
import { PowerBiWorkspace, PowerBiReport, PowerBiDataset } from "./../models/PowerBiModels";

const PowerBiApiRoot: string = "https://api.powerbi.com/v1.0/myorg/";

export const MyWorkspaceId = "00000000-0000-0000-0000-000000000000";

export default class PowerBiService {

  static GetAccessToken = async (): Promise<string> => {
    const account = msalInstance?.getActiveAccount();
    if (account) {
      const response = await msalInstance.acquireTokenSilent({
        scopes: PowerBiPermissionScopes,
        account: account
      });
  
      return response.accessToken;
    }
    else {
      return "";
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

  static GetWorkspace = async (WorkspaceId: string): Promise<PowerBiWorkspace> => {

    if (WorkspaceId === MyWorkspaceId) {
      return new Promise<PowerBiWorkspace>( resolve => resolve({
        id: MyWorkspaceId,
        name: "My Workspace"
      }) )
    }

    var restUrl = PowerBiApiRoot + "groups/" + "?$filter=id eq '" + WorkspaceId + "'";
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response.value[0]; });
  }

  static GetReports = async (WorkspaceId: string): Promise<PowerBiReport[]> => {
    var restUrl: string;
    if (WorkspaceId === MyWorkspaceId) {
      restUrl = PowerBiApiRoot + "/Reports/";
    }
    else {
      restUrl = PowerBiApiRoot + "groups/" + WorkspaceId + "/Reports/";
    }
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response.value; });
  }
  
  static GetReport = async (WorkspaceId: string, ReportId: string): Promise<PowerBiReport> => {
    var restUrl: string;
    if (WorkspaceId === MyWorkspaceId) {
      restUrl = PowerBiApiRoot + "Reports/" + ReportId;
    }
    else {
      restUrl = PowerBiApiRoot + "groups/" + WorkspaceId + "/reports/" + ReportId;
    }
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response; });
  }

  static GetDatasets = async (WorkspaceId: string): Promise<PowerBiDataset[]> => {
    var restUrl: string;
    if (WorkspaceId === MyWorkspaceId) {
      restUrl = PowerBiApiRoot +  "datasets/";
    }
    else {
      restUrl = PowerBiApiRoot + "groups/" + WorkspaceId +  "/datasets/";
    }

    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response.value; });
  }

  static GetDataset = async (WorkspaceId: string, DatasetId: string): Promise<PowerBiDataset> => {
    var restUrl: string;
    if (WorkspaceId === MyWorkspaceId) {
      restUrl = PowerBiApiRoot + "datasets/" + DatasetId;
    }
    else {
      restUrl = PowerBiApiRoot + "groups/" + WorkspaceId + "/datasets/" + DatasetId;
    }
    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response; });
  }

}