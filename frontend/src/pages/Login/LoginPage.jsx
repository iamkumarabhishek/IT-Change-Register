import {
    Typography,
    TextField,
    Button,
    Box,
    Divider,
    Stack,
    IconButton,
    InputAdornment
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/authService";
import AuthLayout from "../../layouts/AuthLayout";
import {toast} from "react-toastify";

function LoginPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = async () => {

        if (!formData.username.trim()) {
            toast.error("Please enter Username.");
            return;
        }

        if (!formData.password.trim()) {
            toast.error("Please enter Password.");
            return;
        }

        try {

            setLoading(true);

            const response = await authService.login(formData);



            if (response.success) {

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );

                navigate("/dashboard");

            } else {

                alert(response.message);

            }

        } catch (error) {

            console.error(error);
            toast.error("Unable to connect to server.");

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = (event) => {

        event.preventDefault();

        handleLogin();

    };

    return (

        <AuthLayout>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >

                <Typography
                    variant="h5"
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Sign in to continue
                </Typography>

                <TextField
                    fullWidth
                    name="username"
                    label="Username"
                    margin="dense"
                    value={formData.username}
                    onChange={handleChange}
                    autoFocus
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="dense"
                    value={formData.password}
                    onChange={handleChange}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword
                                            ? <VisibilityOff />
                                            : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={loading}
                    sx={{
                        mt: 3,
                        py: 1.3,
                        borderRadius: 2,
                        fontWeight: "bold",
                        fontSize: "1rem"
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

            </Box>

            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 2 }}
            >

                <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate("/forgot-password")}
                    sx={{ textTransform: "none" }}
                >
                    Forgot Password?
                </Button>

                <Typography color="text.secondary">
                    |
                </Typography>

                <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate("/users/add")}
                    sx={{ textTransform: "none" }}
                >
                    Register
                </Button>

            </Stack>

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center">

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Version 1.0.0
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    © 2026 C-DAC | Indira Gandhi Institute of Medical Sciences
                </Typography>

            </Box>

        </AuthLayout>

    );

}

export default LoginPage;