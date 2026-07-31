import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    TextField,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import ChangePasswordDialog from "./ChangePasswordDialog";
import SuccessDialog from "../../components/common/SuccessDialog";

import authService from "../../services/authService";
import userService from "../../services/userService";

import { toast } from "react-toastify";

function ProfilePage() {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
    );

    const [editMode, setEditMode] = useState(false);

    const [profileData, setProfileData] = useState({

        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber

    });

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

    const handleChange = (event) => {

        setProfileData({

            ...profileData,
            [event.target.name]: event.target.value

        });

    };

    const handleUpdateProfile = async () => {

        try {

            const response = await userService.updateProfile(profileData);

            if (response.success) {

                // Update user object
                const updatedUser = {
                    ...user,
                    fullName: profileData.fullName,
                    email: profileData.email,
                    mobileNumber: profileData.mobileNumber
                };

                setUser(updatedUser);

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(updatedUser)
                );

                setEditMode(false);

                toast.success("Profile updated successfully.");

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to update profile.");

        }

    };

    const handleChangePassword = async (passwordData) => {

        try {

            const response =
                await authService.changePassword(passwordData);

            if (response.success) {

                setOpenPasswordDialog(false);

                setOpenSuccessDialog(true);

            } else {

                toast.error(response.message);

            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to change password.");

        }

    };

    const handleSuccessOk = () => {

        sessionStorage.clear();

        setOpenSuccessDialog(false);

        navigate("/");

    };

    return (<DashboardLayout>

        <Card
            sx={{
                maxWidth: 800,
                margin: "auto"
            }}
        >

            <CardContent>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    My Profile
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Box
                    display="flex"
                    justifyContent="center"
                    mb={4}
                >

                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            bgcolor: "primary.main"
                        }}
                    >

                        <PersonIcon sx={{ fontSize: 70 }} />

                    </Avatar>

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3
                    }}
                >

                    {/* Full Name */}

                    <Box>

                        <Typography fontWeight="bold">
                            Full Name
                        </Typography>

                        {
                            editMode ? (

                                <TextField
                                    fullWidth
                                    size="small"
                                    name="fullName"
                                    value={profileData.fullName}
                                    onChange={handleChange}
                                />

                            ) : (

                                <Typography>
                                    {user.fullName}
                                </Typography>

                            )
                        }

                    </Box>

                    {/* Username */}

                    <Box>

                        <Typography fontWeight="bold">
                            Username
                        </Typography>

                        <Typography>
                            {user.username}
                        </Typography>

                    </Box>

                    {/* Email */}

                    <Box>

                        <Typography fontWeight="bold">
                            Email
                        </Typography>

                        {
                            editMode ? (

                                <TextField
                                    fullWidth
                                    size="small"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                />

                            ) : (

                                <Typography>
                                    {user.email}
                                </Typography>

                            )
                        }

                    </Box>

                    {/* Mobile */}

                    <Box>

                        <Typography fontWeight="bold">
                            Mobile Number
                        </Typography>

                        {
                            editMode ? (

                                <TextField
                                    fullWidth
                                    size="small"
                                    name="mobileNumber"
                                    value={profileData.mobileNumber}
                                    onChange={handleChange}
                                />

                            ) : (

                                <Typography>
                                    {user.mobileNumber}
                                </Typography>

                            )
                        }

                    </Box>

                    {/* Role */}

                    <Box>

                        <Typography fontWeight="bold">
                            Role
                        </Typography>

                        <Typography>
                            {user.role}
                        </Typography>

                    </Box>

                    {/* Status */}

                    <Box>

                        <Typography fontWeight="bold">
                            Status
                        </Typography>

                        <Typography>
                            {user.status}
                        </Typography>

                    </Box>

                </Box>

                <Divider sx={{ my: 4 }} />

                <Box
                    display="flex"
                    justifyContent="center"
                    gap={2}
                >

                    {

                        editMode ? (

                            <>

                                <Button
                                    variant="contained"
                                    onClick={handleUpdateProfile}
                                >
                                    Save Changes
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </Button>

                            </>

                        ) : (

                            <>

                                <Button
                                    variant="contained"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Profile
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={() => setOpenPasswordDialog(true)}
                                >
                                    Change Password
                                </Button>

                            </>

                        )

                    }

                </Box>

            </CardContent>

        </Card>
            <ChangePasswordDialog
                open={openPasswordDialog}
                onClose={() => setOpenPasswordDialog(false)}
                onSave={handleChangePassword}
            />

            <SuccessDialog
                open={openSuccessDialog}
                title="Password Changed Successfully"
                message="Your password has been changed successfully. Please login again using your new password."
                onOk={handleSuccessOk}
            />

        </DashboardLayout>

    );

}

export default ProfilePage;