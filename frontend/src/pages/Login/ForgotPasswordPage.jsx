import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import authService from "../../services/authService";

function ForgotPasswordPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        username: "",
        email: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleVerifyUser = async () => {

        if (!formData.username.trim()) {

            alert("Please enter Username.");

            return;

        }

        if (!formData.email.trim()) {

            alert("Please enter Email Address.");

            return;

        }

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailPattern.test(formData.email.trim())) {

            alert("Please enter a valid Email Address.");

            return;

        }

        try {

            setLoading(true);

            const response =
                await authService.forgotPassword(formData);

            if (response.success) {

                navigate("/reset-password", {

                    state: {

                        username: formData.username

                    }

                });

            } else {

                alert(response.message);

            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            }

            alert("Unable to connect to server.");

        } finally {

            setLoading(false);

        }

    };

    const handleReset = () => {

        setFormData({

            username: "",
            email: ""

        });

    };

    const handleCancel = () => {

        navigate("/");

    };

    return (

        <AuthLayout>

            <Card
                sx={{
                    maxWidth: 650,
                    mx: "auto",
                    mt: 4,
                    borderRadius: 3,
                    boxShadow: 4
                }}
            >

                <CardContent sx={{ p: 4 }}>

                    <Typography
                        variant="h4"
                        align="center"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Forgot Password
                    </Typography>

                    <Typography
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Verify your username and registered email address.
                    </Typography>

                    <Grid
                        container
                        spacing={3}
                    >

                        <Grid size={12}>

                            <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                Username
                            </Typography>

                            <TextField
                                fullWidth
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />

                        </Grid>

                        <Grid size={12}>

                            <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                Email Address
                            </Typography>

                            <TextField
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </Grid>
                        <Grid size={12}>

                            <Box
                                display="flex"
                                justifyContent="center"
                                gap={2}
                                mt={2}
                            >

                                <Button
                                    variant="contained"
                                    onClick={handleVerifyUser}
                                    disabled={loading}
                                    sx={{
                                        minWidth: 140
                                    }}
                                >
                                    {
                                        loading
                                            ? "Verifying..."
                                            : "Verify User"
                                    }
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={handleReset}
                                    sx={{
                                        minWidth: 100
                                    }}
                                >
                                    Reset
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleCancel}
                                    sx={{
                                        minWidth: 100
                                    }}
                                >
                                    Cancel
                                </Button>

                            </Box>

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>

        </AuthLayout>

    );

}

export default ForgotPasswordPage;