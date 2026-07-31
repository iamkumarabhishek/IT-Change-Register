import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Box,
    Button,
    Typography
} from "@mui/material";
import {
    Menu,
    MenuItem
} from "@mui/material";

import {
    Settings,
    Apartment
} from "@mui/icons-material";
import { useState } from "react";

import {
    Dashboard,
    Description,
    ListAlt,
    Assessment,
    Person,
    Logout,
    Group
} from "@mui/icons-material";



import { useLocation, useNavigate } from "react-router-dom";

function NavigationBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));
    const [setupAnchor, setSetupAnchor] = useState(null);

    const menus = [
        {
            label: "Dashboard",
            icon: <Dashboard />,
            path: "/dashboard"
        },
        {
            label: "Add Letter",
            icon: <Description />,
            path: "/letters/add"
        },
        {
            label: "Letter List",
            icon: <ListAlt />,
            path: "/letters"
        },
        {
            label: "Reports",
            icon: <Assessment />,
            path: "/reports"
        },
        {
            label: "Setup",
            icon: <Settings />,
            path: "/setup"
        },

        {
            label: "Profile",
            icon: <Person />,
            path: "/profile"
        }
    ];

    const currentTab = menus.findIndex(
        (menu) =>
            menu.path === location.pathname &&
            menu.path !== "/setup"
    );


    const handleLogout = () => {

        sessionStorage.clear();

        navigate("/", { replace: true });

    };

    return (

        <AppBar
            position="static"
            elevation={2}
            sx={{
                backgroundColor: "#1565C0",
                borderRadius: "0 0 8px 8px"
            }}
        >

            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: 58
                }}
            >

                <Tabs
                    value={currentTab === -1 ? false : currentTab}
                    textColor="inherit"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#FFD54F",
                            height: 3,
                            borderRadius: "3px 3px 0 0"
                        },

                        "& .MuiTab-root": {
                            color: "#FFFFFF",
                            opacity: 1,
                            textTransform: "none",
                            minHeight: 58,
                            minWidth: 120,
                            fontWeight: 500,
                            fontSize: "0.95rem"
                        },

                        "& .Mui-selected": {
                            color: "#FFFFFF",
                            fontWeight: 700
                        }
                    }}
                >

                    {
                        menus.map((menu) => (

                            <Tab
                                key={menu.path}
                                icon={menu.icon}
                                iconPosition="start"
                                label={menu.label}
                                disableRipple
                                onClick={(event) => {

                                    if (menu.label === "Setup") {

                                        setSetupAnchor(event.currentTarget);

                                    } else {

                                        navigate(menu.path);

                                    }

                                }}
                            />

                        ))
                    }

                </Tabs>

                <Menu
                    anchorEl={setupAnchor}
                    open={Boolean(setupAnchor)}
                    onClose={() => setSetupAnchor(null)}
                >

                    <MenuItem
                        onClick={() => {

                            navigate("/departments");

                            setSetupAnchor(null);

                        }}
                    >

                        <Apartment sx={{ mr: 1 }} />

                        Department Master

                    </MenuItem>

                </Menu>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Typography
                        sx={{
                            color: "#FFFFFF",
                            fontWeight: 500
                        }}
                    >
                        {user?.fullName}
                    </Typography>

                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 2
                        }}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default NavigationBar;