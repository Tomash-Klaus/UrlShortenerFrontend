import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFullUrlInfoById } from "../services/urlApi";
import { Paper, Typography, Card, CardContent, Grid, Divider } from '@mui/material';
import "./PagesStyles.css";
import useAuthHook from "../hooks/useAuthHook.js"; // імпортуємо стилі

const UrlInfoPage = () => {
    const [shortUrlInfo, setShortUrlInfo] = useState();
    const { id } = useParams();
    const { role} = useAuthHook();

    useEffect(() => {
        const fetchShortUrlById = async () => {
            try {
                const data = await getFullUrlInfoById(id);
                setShortUrlInfo(data);
            } catch (err) {
                console.error("Error fetching short URLs", err);
            }
        };
        fetchShortUrlById();
    }, [id]);

    return (
        <Paper className="url-info-container" style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Short URL Info
            </Typography>
            {shortUrlInfo && (
                <Card elevation={3}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Original URL:
                                </Typography>
                                <Typography variant="body1" className="long-url">
                                    {shortUrlInfo.fullUrl}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Short URL:
                                </Typography>
                                <Typography variant="body1">
                                    {shortUrlInfo.shortUrl}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{ margin: '20px 0' }} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Created By:
                                </Typography>
                                <Typography variant="body1">
                                    {shortUrlInfo.createdBy}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Created Date:
                                </Typography>
                                <Typography variant="body1">
                                    {shortUrlInfo.createdDate}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="subtitle1" color="textSecondary">
                            {`Created by ${role}`}
                        </Typography>
                        <Typography variant="body1">
                            {shortUrlInfo.user.email}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Paper>
    );
};

export default UrlInfoPage;
