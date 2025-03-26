import {Field, Form, Formik} from "formik";
import {Button, Paper, TextField} from "@mui/material";
import {createNewUrl} from "../services/urlApi.js";
import * as Yup from "yup";

const AddNewUrlComponent = ({fetchData}) => {

    const handleAddUrl = async (values, {resetForm}) => {
        try {
            await createNewUrl(values.newUrl);
            resetForm();
            fetchData(); // Повертаємо на першу сторінку після додавання URL
        } catch (err) {
            console.error("Error adding short URL", err);
        }
    };

    const validationSchema = Yup.object({
        newUrl: Yup.string()
            .url("Invalid URL format")
            .required("URL is required")
    });

    return (
        <Paper className="add-url-form" elevation={3}>
            <Formik
                initialValues={{newUrl: ''}}
                validationSchema={validationSchema}
                onSubmit={handleAddUrl}
            >
                {({values, handleChange, handleBlur, errors, touched}) => (
                    <Form>
                        <Field
                            name="newUrl"
                            as={TextField}
                            label="Enter URL to shorten"
                            variant="outlined"
                            fullWidth
                            value={values.newUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.newUrl && Boolean(errors.newUrl)}
                            helperText={touched.newUrl && errors.newUrl}
                            style={{marginBottom: '16px'}}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            disabled={Boolean(errors.newUrl) || !values.newUrl}
                        >
                            Add New URL
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}

export default AddNewUrlComponent;