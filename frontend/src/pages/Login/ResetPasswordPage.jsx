import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import authService from "../../services/authService";

function ResetPasswordPage() {

    const navigate = useNavigate();

    const location = useLocation();

    const username = location.state?.username;

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        username: username || "",

        newPassword: "",

        confirmPassword: ""

    });

    useEffect(() => {

        if (!username) {

            navigate("/forgot-password");

        }

    }, [username, navigate]);

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleResetPassword = async () => {

        if (!formData.newPassword.trim()) {

            alert("Please enter New Password.");

            return;

        }

        if (
            formData.newPassword.length < 6 ||
            formData.newPassword.length > 20
        ) {

            alert("Password must be between 6 and 20 characters.");

            return;

        }

        if (!formData.confirmPassword.trim()) {

            alert("Please enter Confirm Password.");

            return;

        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            alert("Password and Confirm Password do not match.");

            return;

        }

        try {

            setLoading(true);

            const response =
                await authService.resetPassword(formData);

            if (response.success) {

                alert(response.message);

                navigate("/");

            } else {

                alert(response.message);

            }

        }
        catch (error) {

            console.error(error);

            console.log(error.response);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("Unable to connect to server.");

            }

        }
        finally {

            setLoading(false);

        }

    };

    const handleReset = () => {

        setFormData({

            username,

            newPassword: "",

            confirmPassword: ""

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
                        Reset Password
                    </Typography>

                    <Typography
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4 }}
                    >
                        Create a new password for your account.
                    </Typography>

                    <Grid container spacing={3}>

                        <Grid size={12}>

                            <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                Username
                            </Typography>

                            <TextField
                                fullWidth
                                value={formData.username}
                                disabled
                            />

                        </Grid>

                        <Grid size={12}>

                            <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                New Password
                            </Typography>

                            <TextField
                                fullWidth
                                name="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />

                        </Grid>

                        <Grid size={12}>

                            <Typography
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                Confirm Password
                            </Typography>

                            <TextField
                                fullWidth
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() =>
                                                        setShowConfirmPassword(!showConfirmPassword)
                                                    }
                                                >
                                                    {showConfirmPassword
                                                        ? <VisibilityOff />
                                                        : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
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
                                    onClick={handleResetPassword}
                                    disabled={loading}
                                    sx={{
                                        minWidth: 140
                                    }}
                                >
                                    {
                                        loading
                                            ? "Updating..."
                                            : "Update Password"
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

export default ResetPasswordPage;