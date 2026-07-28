import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Stack,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment
} from "@mui/material";

import {
    PersonAdd,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

function UserForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        userId: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        email: "",
        designation: ""
    });

    const isFormValid =
        formData.fullName.trim() !== "" &&
        formData.userId.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.mobile.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.designation.trim() !== "";

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };

    const handleReset = () => {

        setFormData({
            fullName: "",
            userId: "",
            password: "",
            confirmPassword: "",
            mobile: "",
            email: "",
            designation: ""
        });

        setLoading(false);

    };

    const handleSave = async () => {

        if (
            !formData.fullName ||
            !formData.userId ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.mobile ||
            !formData.email ||
            !formData.designation
        ) {

            alert("Please fill all required fields.");
            return;

        }

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailPattern.test(formData.email.trim())) {

            alert("Please enter a valid email address.");

            return;

        }

        if (formData.password.length < 6 || formData.password.length > 20) {

            alert("Password must be between 6 and 20 characters.");
            return;

        }

        if (formData.password !== formData.confirmPassword) {

            alert("Password and Confirm Password do not match.");
            return;

        }

        if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {

            alert("Please enter a valid 10-digit mobile number.");

            return;

        }

        setLoading(true);

        console.log({
            ...formData,
            status: "ACTIVE"
        });

        setTimeout(() => {

            setLoading(false);

            alert("User created successfully.");

            navigate("/login");   // Change this if your login route is different

        }, 1000);

    };

    return (

        <Paper
            elevation={2}
            sx={{
                p: 4,
                borderRadius: 3
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1
                }}
            >

                <PersonAdd
                    color="primary"
                    fontSize="large"
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    Create New User
                </Typography>

            </Box>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Enter the details below to register a new user.
            </Typography>

            <Box
                sx={{
                    maxWidth: 500,
                    mx: "auto"
                }}
            >

                <Stack spacing={3}>

                    {/* Full Name */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Full Name *
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Enter Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                    </Box>

                    {/* User ID */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            User ID *
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Enter User ID"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                        />

                    </Box>

                    {/* Password */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Password *
                        </Typography>

                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 20
                            }}
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
                                                    : <Visibility />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                    </Box>

                    {/* Confirm Password */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Confirm Password *
                        </Typography>

                        <TextField
                            fullWidth
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 20
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() =>
                                                    setShowConfirmPassword((prev) => !prev)
                                                }
                                            >
                                                {showConfirmPassword
                                                    ? <VisibilityOff />
                                                    : <Visibility />
                                                }
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />

                    </Box>
                    {/* Mobile Number */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Mobile Number *
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Enter Mobile Number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={(event) => {

                                const value = event.target.value.replace(/\D/g, "");

                                if (value.length > 10) {
                                    return;
                                }

                                // Allow first digit only 6-9
                                if (value.length === 1 && !/^[6-9]$/.test(value)) {
                                    alert("Mobile number must start with 6, 7, 8 or 9.");
                                    return;
                                }

                                setFormData({
                                    ...formData,
                                    mobile: value
                                });

                            }}
                        />

                    </Box>

                    {/* Email Address */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Email Address *
                        </Typography>

                        <TextField
                            fullWidth
                            type="email"
                            placeholder="Enter Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </Box>

                    {/* Designation */}

                    <Box>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600
                            }}
                        >
                            Designation *
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Enter Designation"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                        />

                    </Box>

                    {/* Buttons */}

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
                            onClick={handleSave}
                            sx={{
                                minWidth: 120,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                        >
                            {loading ? "Saving..." : "Save"}
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

                </Stack>

            </Box>

        </Paper>

    );

}

export default UserForm;