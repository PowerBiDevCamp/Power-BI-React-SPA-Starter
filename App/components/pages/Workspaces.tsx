
import { useState, useEffect } from 'react';
import { useIsAuthenticated } from "@azure/msal-react";

import { PowerBiWorkspace } from '../../models/PowerBiModels';
import PowerBiService from '../../services/PowerBiService'

import { Box, Button, Paper, Typography,  } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import PageNotAccessible from '../PageNotAccessible';

const Workspaces = () => {
    const isAuthenticated = useIsAuthenticated();
    const [workspaces, setWorkspaces] = useState<PowerBiWorkspace[] | null>(null);

    useEffect(() => {

        // define async function
        const setWorkspacesAsync = async () => {
            setWorkspaces(await PowerBiService.GetWorkspaces());
        }

        // call async function if authenticated
        if (isAuthenticated) { setWorkspacesAsync(); }

    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <PageNotAccessible />
    }
    else {
        return (
            <Box sx={{ pt:2 }} >
                <Typography variant='h5' component="h2" >Workspaces</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ marginTop: "12px" }}>
                        <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>Read-Only</TableCell>
                                <TableCell>Premium</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workspaces && workspaces.map((workspace) => (
                                <TableRow key={workspace.id}>
                                    <TableCell>{workspace.name}</TableCell>
                                    <TableCell>{workspace.id}</TableCell>
                                    <TableCell>{String(workspace.isReadOnly)}</TableCell>
                                    <TableCell>{String(workspace.isOnDedicatedCapacity)}</TableCell>
                                    <TableCell>
                                        <Button variant='contained' target="_blank" 
                                                href={'https://app.powerbi.com/groups/' + workspace.id}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>);
    }
};

export default Workspaces;