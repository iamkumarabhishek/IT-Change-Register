import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";

function ForgotPasswordForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        userId: "",
        email: ""
    });

    const [errors, setErrors] = useState({
        userId: "",
        email: ""
    });

    const emailRegex =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        let error = "";

        if (name === "userId") {

            if (!value.trim()) {
                error = "Username is required.";
            }

        }

        if (name === "email") {

            if (!value.trim()) {
                error = "Email Address is required.";
            }
            else if (!emailRegex.test(value)) {
                error = "Enter a valid Email Address.";
            }

        }

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

    };

    const validateForm = () => {

        let newErrors = {};

        if (!formData.userId.trim()) {
            newErrors.userId = "Username is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email Address is required.";
        }
        else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid Email Address.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = () => {

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Backend API will be integrated here
        // authService.forgotPassword(formData)

        setTimeout(() => {

            setLoading(false);

            alert("OTP has been sent to your registered Email Address.");

            navigate("/verify-otp", {
                state: {
                    userId: formData.userId,
                    email: formData.email
                }
            });

        }, 1200);

    };

    const handleReset = () => {

        setFormData({
            userId: "",
            email: ""
        });

        setErrors({
            userId: "",
            email: ""
        });

    };

    const isFormValid =
        formData.userId.trim() !== "" &&
        formData.email.trim() !== "" &&
        emailRegex.test(formData.email);

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f7fb",
                p: 2
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: 450,
                    borderRadius: 3
                }}
            >

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mb={3}
                >

                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 56,
                            height: 56,
                            mb: 1
                        }}
                    >
                        <LockResetIcon />
                    </Avatar>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        Forgot Password
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        mt={1}
                    >
                        Enter your Username and registered Email Address.
                        An OTP will be sent to your email for password reset.
                    </Typography>

                </Box>

                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>

                        <Typography
                            variant="subtitle2"
                            mb={0.5}
                        >
                            Username <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            error={Boolean(errors.userId)}
                            helperText={errors.userId}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <Typography
                            variant="subtitle2"
                            mb={0.5}
                        >
                            Email Address <span style={{ color: "red" }}>*</span>
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />

                    </Grid>
                    <Grid size={{ xs: 12 }}>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 2,
                                mt: 2
                            }}
                        >

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={loading || !isFormValid}
                                onClick={handleSubmit}
                                sx={{
                                    minWidth: 120,
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                {
                                    loading
                                        ? "Sending OTP..."
                                        : "Submit"
                                }
                            </Button>

                            <Button
                                variant="outlined"
                                color="warning"
                                size="large"
                                onClick={handleReset}
                                sx={{
                                    minWidth: 120,
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                Reset
                            </Button>

                            <Button
                                variant="outlined"
                                color="inherit"
                                size="large"
                                onClick={() => navigate("/")}
                                sx={{
                                    minWidth: 120,
                                    textTransform: "none",
                                    fontWeight: 600
                                }}
                            >
                                Cancel
                            </Button>

                        </Box>

                    </Grid>

                </Grid>

            </Paper>

        </Box>

    );

}

export default ForgotPasswordForm;