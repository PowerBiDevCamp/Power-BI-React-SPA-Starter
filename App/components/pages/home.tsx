import * as React from 'react';
import { useIsAuthenticated } from "@azure/msal-react";
import { Box } from '@mui/system';

const Home = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <Box>
        <h2>You are now authenticated</h2>
        <div>Now, click on the nav links for <strong>Workspaces</strong> and <strong>User Profile</strong> to demo this sample app.</div>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <h2>Welcome to the React MSAL Starter</h2>
        <div>Click the <strong>LOGIN</strong> button in the upper right to get started.</div>
        </Box>
    )
  }
}

export default Home;