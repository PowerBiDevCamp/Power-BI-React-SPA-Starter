
import React from 'react';
import { useMsal, useIsAuthenticated, useAccount } from "@azure/msal-react";

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

const Profile = () => {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const [showTokenClaims, setShowTokenClaims] = React.useState(false);

  return (
    <Container  maxWidth="xl">
      <h2>User Profile</h2>

      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
          <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
            <TableRow>
              <TableCell>Profile Property</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={"name"}>
              <TableCell component="th" scope="row">name</TableCell>
              <TableCell>{account?.name}</TableCell>
            </TableRow>
            <TableRow key={"username"}>
              <TableCell component="th" scope="row">username</TableCell>
              <TableCell>{account?.username}</TableCell>
            </TableRow>
            <TableRow key={"localAccountId"}>
              <TableCell component="th" scope="row">localAccountId</TableCell>
              <TableCell>{account?.localAccountId}</TableCell>
            </TableRow>
            <TableRow key={"tenantId"}>
              <TableCell component="th" scope="row">tenantId</TableCell>
              <TableCell>{account?.tenantId}</TableCell>
            </TableRow>
            <TableRow key={"homeAccountId"}>
              <TableCell component="th" scope="row">homeAccountId</TableCell>
              <TableCell>{account?.homeAccountId}</TableCell>
            </TableRow>
            <TableRow key={"environment"}>
              <TableCell component="th" scope="row">environment</TableCell>
              <TableCell>{account?.environment}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <br />

      <Button onClick={() => {
        setShowTokenClaims(!showTokenClaims);
      }} >
        {showTokenClaims ? "Hide Token Claims" : "Show Token Claims"}
      </Button>

      {showTokenClaims && (
        <>
          <h2>Token Claims</h2>

          <TableContainer component={Paper}>
            <Table aria-label="simple table" sx={{ marginTop: "12px" }}>
              <TableHead sx={{ "& th": { color: "white", backgroundColor: "black" } }} >
                <TableRow>
                  <TableCell>Profile Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(account.idTokenClaims).map((key) => (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row">{key}</TableCell>
                    <TableCell>{(account.idTokenClaims[key] as string)}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  )
}

export default Profile;