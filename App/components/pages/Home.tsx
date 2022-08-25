import { useIsAuthenticated } from "@azure/msal-react";
import { Box, Typography, Alert } from '@mui/material';

const Home = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <Box>
        <Typography variant='h5' component="h2" sx={{ my: 3 }} >You are now authenticated</Typography>
        <Alert sx={{ border: 1, padding: 2, mx: 2 }} severity='success' >
          Now, click on the nav links for <strong>Workspaces</strong> and <strong>User Profile</strong>.
        </Alert>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <Typography variant='h5' component="h2" sx={{ my: 3 }} >Welcome to the React MSAL Starter</Typography>
        <Alert sx={{ border: 1, padding: 2, mx: 2 }} severity='info' >Click the <strong>LOGIN</strong> button to get started.</Alert>
      </Box>
    )
  }
}

export default Home;


