import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

import { useState } from "react";

function ChangePasswordDialog({

                                  open,

                                  onClose,

                                  onSave

                              }) {

    const currentUser = JSON.parse(

        sessionStorage.getItem("user")

    );

    const [formData, setFormData] = useState({

        username: currentUser.username,

        oldPassword: "",

        newPassword: "",

        confirmPassword: ""

    });

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

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
                    label="Current Password"
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="New Password"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Update Password
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ChangePasswordDialog;