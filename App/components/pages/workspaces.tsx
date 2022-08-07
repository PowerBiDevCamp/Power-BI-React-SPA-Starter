import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { useIsAuthenticated } from "@azure/msal-react";

import PowerBiService from './../../services/PowerBiService'
import { PowerBiWorkspace } from '../../models/PowerBiModels';

import { Box, Button, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import Signin from './../signin';

const Workspaces = () => {
    const isAuthenticated = useIsAuthenticated();
    const [workspaces, setWorkspaces] = useState<PowerBiWorkspace[] | null>(null);

    useEffect(() => {
        const setWorkspacesAsync = async () => {
            setWorkspaces(await PowerBiService.GetWorkspaces());
        }
        if (isAuthenticated) {
            setWorkspacesAsync();
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return (
            <Box>
                <h2>Workspaces</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
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
                                    <TableCell><Button variant='contained' target="_blank" href={'https://app.powerbi.com/groups/' + workspace.id}>View</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>)
    }
    else {
        return <Signin />
    }
};

export default Workspaces;