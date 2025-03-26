import React from "react";
import useAuthHook from "../hooks/useAuthHook";
import UrlTableItemComponent from "./UrlTableItemComponent";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import "./ComponentsStyles.css";

const UrlTableComponent = ({ shortUrls = [],  fetchData }) => {
    const { isAuthenticated } = useAuthHook();

    return (
        <TableContainer
            component={Paper}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Original URL</TableCell>
                        <TableCell>Short URL</TableCell>
                        {isAuthenticated && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shortUrls.map((url) => (
                        <UrlTableItemComponent key={url.id} url={url} fetchData={fetchData} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UrlTableComponent;
