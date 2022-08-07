import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { useIsAuthenticated } from "@azure/msal-react";

import PageLayout from './components/pagelayout'
import { Box, CssBaseline } from '@mui/material';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </Box>
  )
}

export default App;