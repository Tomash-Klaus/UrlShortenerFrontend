import React from "react";
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import useAuthHook from "../hooks/useAuthHook";
import { useNavigate } from "react-router-dom";
import { deleteUrl } from "../services/urlApi";
import { getRedirectUrl } from "../services/shortUrlApi";
import "./ComponentsStyles.css"; // імпортуємо стилі

const UrlTableItemComponent = ({ url, fetchData }) => {
    const { isAuthenticated, role, userId } = useAuthHook();
    const navigate = useNavigate();

    const handleDeleteUrl = async (id) => {
        try {
            await deleteUrl(id);
            fetchData();
        } catch (err) {
            console.error("Error deleting short URL", err);
        }
    };

    const handleShortLinkClick = async (url) => {
        try {
            window.location.href = await getRedirectUrl(url);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <TableRow key={url.id} className="url-table-item">
            <TableCell>
                <Typography variant="body2" color="textSecondary">{url.id}</Typography>
            </TableCell>
            <TableCell
                onClick={() => navigate(`/url/${url.id}`)}
                className="url-cell"
                sx={{cursor: 'pointer'}}
            >
                <Typography variant="body1">{url.fullUrl}</Typography>
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => handleShortLinkClick(url.shortUrl)}
                    variant='text'
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        width: '100%',
                        '&:hover': {
                            textDecoration: 'underline',
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    {url.shortUrl}
                </Button>
            </TableCell>
            {isAuthenticated && (
                <TableCell>
                    {(role === "Admin" || url.createdBy === userId) && (
                        <Button
                            variant="contained"
                            onClick={() => handleDeleteUrl(url.id)}
                            sx={{ textTransform: 'none' }}
                        >
                            Delete
                        </Button>
                    )}
                </TableCell>
            )}
        </TableRow>
    );
};

export default UrlTableItemComponent;
