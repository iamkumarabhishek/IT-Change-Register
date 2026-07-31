import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    InputAdornment,
    Typography
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";


import { useState } from "react";



function ChangePasswordDialog({

                                  open,

                                  onClose,

                                  onSave

                              }) {

    const currentUser = JSON.parse(

        sessionStorage.getItem("user")

    );
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [formData, setFormData] = useState({

        username: currentUser.username,

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const getPasswordStrength = (password) => {

        if (password.length < 6)
            return {
                label: "Weak",
                color: "error"
            };

        const strong =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (strong.test(password))
            return {
                label: "Strong",
                color: "success"
            };

        return {
            label: "Medium",
            color: "warning"
        };

    };

    const strength =
        getPasswordStrength(formData.newPassword);

    const handleChange = (event) => {

        const { name, value } = event.target;

        const updatedForm = {

            ...formData,

            [name]: value

        };

        setFormData(updatedForm);

        if (

            updatedForm.confirmPassword &&
            updatedForm.newPassword !== updatedForm.confirmPassword

        ) {

            setPasswordError("Password and Confirm Password do not match.");

        } else {

            setPasswordError("");

        }

    };

    const handleSubmit = () => {

        onSave(formData);

        setFormData({

            username: currentUser.username,

            oldPassword: "",

            newPassword: "",

            confirmPassword: ""

        });

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Change Password

            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    margin="normal"
                    autoFocus
                    label="Current Password"
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowOldPassword(!showOldPassword)
                                        }
                                    >
                                        {
                                            showOldPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                    >
                                        {
                                            showNewPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />

                <Typography
                    variant="caption"
                    color={`${strength.color}.main`}
                >

                    Password Strength :
                    <b> {strength.label}</b>

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                >

                    Minimum 6 characters,
                    1 uppercase,
                    1 lowercase,
                    1 number.

                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {
                                            showConfirmPassword
                                                ? <VisibilityOff />
                                                : <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={() => {

                        setFormData({

                            username: currentUser.username,

                            oldPassword: "",

                            newPassword: "",

                            confirmPassword: ""

                        });

                        setPasswordError("");

                        onClose();

                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        !formData.oldPassword ||
                        !formData.newPassword ||
                        !formData.confirmPassword ||
                        Boolean(passwordError)
                    }
                >

                    Update Password
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ChangePasswordDialog;