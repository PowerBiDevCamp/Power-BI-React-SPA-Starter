import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';

import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// get configuration data
import { msalConfig } from "./AuthConfig";

// make MSAL instance available to other source files
export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance?.getAllAccounts();
if (accounts && accounts.length > 0) {
    msalInstance?.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if ((msalInstance?.getAllAccounts().length > 0) && event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance?.setActiveAccount(account);
        console.log("Set active MSAL  user: ", account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance} >
            <App />
        </MsalProvider>
    </React.StrictMode>
);

