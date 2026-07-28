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
                sx={{ mb: 2 }}
            >
                Welcome to the C-DAC IGIMS Correspondence Management System
            </Typography>

            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    borderRadius: 2
                }}
            >

                <Grid
                    container
                    spacing={3}
                >

                    {/* LEFT SIDE */}

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
                            sx={{ mt: 1 }}
                        >
                            You have successfully logged in to the
                            Correspondence Management System.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

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
                                lineHeight: 1.6
                            }}
                        >
                            This application is developed by
                            <strong> C-DAC</strong> for
                            <strong> Indira Gandhi Institute of Medical Sciences (IGIMS)</strong>
                            to digitally register, manage and track all official
                            correspondence received by various departments.

                            <br /><br />

                            The system provides centralized document registration,
                            efficient searching, status tracking and secure
                            record management across the organization.

                        </Typography>

                    </Grid>

                    {/* RIGHT SIDE */}

                    <Grid size={{ xs: 12, md: 5 }}>

                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Quick Guide
                        </Typography>

                        <List
                            dense
                            disablePadding
                        >

                            <ListItem sx={{ py: 0.5 }}>

                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <ArrowRight color="primary" fontSize="small" />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{ fontSize: 14 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                    primary="New Request"
                                    secondary="Register new correspondence."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.5 }}>

                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <ArrowRight color="primary" fontSize="small" />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{ fontSize: 14 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                    primary="Request List"
                                    secondary="Search and manage correspondence."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.5 }}>

                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <ArrowRight color="primary" fontSize="small" />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{ fontSize: 14 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                    primary="Reports"
                                    secondary="Generate correspondence reports."
                                />

                            </ListItem>

                            <ListItem sx={{ py: 0.5 }}>

                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <ArrowRight color="primary" fontSize="small" />
                                </ListItemIcon>

                                <ListItemText
                                    primaryTypographyProps={{ fontSize: 14 }}
                                    secondaryTypographyProps={{ fontSize: 12 }}
                                    primary="Profile"
                                    secondary="Manage your profile and account."
                                />

                            </ListItem>

                        </List>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 2 }} />

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