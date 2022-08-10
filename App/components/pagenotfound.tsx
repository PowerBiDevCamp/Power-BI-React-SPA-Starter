import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, Alert } from '@mui/material';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant='h5' component="h2" sx={{my:3}} >The request page cannot be found</Typography>
            <Alert severity="error">The following URL is not valid: <strong>{document.URL}</strong></Alert>
            <Button onClick={() => { navigate("/"); }} sx={{mt:3}} >
                Go to home page
            </Button>
        </Box>
    )
};

export default PageNotFound;