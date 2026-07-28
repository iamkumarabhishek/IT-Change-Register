import {
    Box,
    Typography,
    Paper,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import {
    ArrowRight,
    InfoOutlined
} from "@mui/icons-material";

import DashboardLayout from "../../layouts/DashboardLayout";

function DashboardPage() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <DashboardLayout>

            <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
            >
                Dashboard
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
            >
                Welcome to the C-DAC IGIMS Correspondence Management System
            </Typography>

            <Paper
                elevation={1}
                sx={{
                    p: 2.5,
                    borderRadius: 2
                }}
            >

                <Grid
                    container
                    spacing={2.5}
                >

                    {/* LEFT SECTION */}

                    <Grid size={{ xs: 12, md: 7 }}>

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            Welcome, {user?.fullName}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            You have successfully logged in to the
                            Correspondence Management System.
                        </Typography>

                        <Divider sx={{ my: 1.5 }} />

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            About the System
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.55
                            }}
                        >
                            This application is developed by
                            <strong> C-DAC</strong> for
                            <strong> Indira Gandhi Institute of Medical Sciences (IGIMS)</strong>
                            to digitally register, manage and track official
                            correspondence received by various departments.

                            <br /><br />

                            The system provides centralized document registration,
                            efficient searching, status tracking and secure
                            record management across the organization.

                        </Typography>

                    </Grid>

                    {/* RIGHT SECTION */}

                    <Grid size={{ xs: 12, md: 5 }}>

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Quick Guide
                        </Typography>

                        <List dense disablePadding>

                            <ListItem sx={{ py: 0.25 }}>

                                <ListItemIcon sx={{ minWidth: 30 }}>
                                    <ArrowRight
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: 12
                                    }}
                                    primary="Add Letter"
                                    secondary="Register a new incoming letter."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.25 }}>

                                <ListItemIcon sx={{ minWidth: 30 }}>
                                    <ArrowRight
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: 12
                                    }}
                                    primary="Letter List"
                                    secondary="View, search and manage registered letters."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.25 }}>

                                <ListItemIcon sx={{ minWidth: 30 }}>
                                    <ArrowRight
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: 12
                                    }}
                                    primary="Reports"
                                    secondary="Generate reports for registered letters."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.25 }}>

                                <ListItemIcon sx={{ minWidth: 30 }}>
                                    <ArrowRight
                                        color="primary"
                                        fontSize="small"
                                    />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}
                                    secondaryTypographyProps={{
                                        fontSize: 12
                                    }}
                                    primary="Profile"
                                    secondary="Manage your account information."
                                />

                            </ListItem>

                        </List>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 1.5 }} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <InfoOutlined
                        color="primary"
                        fontSize="small"
                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Select a module from the navigation menu above to continue.
                    </Typography>

                </Box>

            </Paper>

        </DashboardLayout>

    );

}

export default DashboardPage;