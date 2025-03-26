import { useFormik} from "formik";
import {Button, TextField, Typography, Box, Paper, Card, FormControl, FormLabel, Divider} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/authApi.js";
import * as Yup from "yup";
import useAuthHook from "../hooks/useAuthHook.js";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const LoginPage = () => {
    const navigate = useNavigate();
    const {login}=useAuthHook();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                const result = await loginRequest(values);
                if (result) {
                    login(result)
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
            }
        }});

    return (
        <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h5" component="h1" gutterBottom>Login</Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="jon.snow@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="********"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </FormControl>

                    <Divider sx={{ my: 2 }} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </Box>
            </Card>
        </Paper>
    );
};
