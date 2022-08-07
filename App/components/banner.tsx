import React from 'react';
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';

import { Assessment } from '@mui/icons-material';
import { AppBar, Divider, Button, Box, IconButton, Toolbar, Typography } from '@mui/material';

import LoginMenu from './loginmenu';

const Banner = () => {
  let isAuthenticated = useIsAuthenticated();
  let navigate = useNavigate();

  return (
    <AppBar position="relative" sx={{ background: "linear-gradient(to right bottom, #00498D, #02386E)" }}  >
      <Toolbar variant='dense' disableGutters >
        <IconButton onClick={() => { navigate("/") }} color="inherit" sx={{mx:0}} >
          <Assessment  />
          <Typography variant="h6" sx={{ml:1}} >Power BI React SPA Starter</Typography>
        </IconButton>
        <Divider orientation='vertical' flexItem sx={{mx:1}} />
        {isAuthenticated && (
          <>
             <Button onClick={()=>{navigate("/workspaces")}} sx={{color:"white"}} >Workspaces</Button>
             <Divider orientation='vertical' flexItem sx={{mx:1}} />
             <Button onClick={()=>{navigate("/profile")}} sx={{color:"white"}} >User Profile</Button>
             <Divider orientation='vertical' flexItem sx={{mx:1}} />
          </>
        )}
        <LoginMenu />
      </Toolbar>
    </AppBar>
  )
}

export default Banner;