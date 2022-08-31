import React from 'react';
import Wrapper from "../components/wrapper/Wrapper";
import useAuth from "../auth/AuthProvider";
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const Profile = () => {
    const {user} = useAuth()
    return (
        <div className="profil-wrapper">
            <Wrapper>
                {user && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <TableHead>Id</TableHead>
                                </TableCell>
                                <TableCell>
                                    {user.id}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TableHead>Email</TableHead>
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <TableHead>Roles</TableHead>
                                </TableCell>
                                <TableCell>
                                    {user.roles}
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>)}

            </Wrapper>
        </div>
    )
}
export default Profile