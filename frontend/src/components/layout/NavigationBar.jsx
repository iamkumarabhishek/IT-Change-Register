import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography
} from "@mui/material";

import {
    Dashboard,
    NoteAdd,
    ListAlt,
    Assessment,
    Person,
    Logout
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

function NavigationBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const menus = [
        {
            title: "Dashboard",
            icon: <Dashboard />,
            path: "/dashboard"
        },
        {
            title: "New Request",
            icon: <NoteAdd />,
            path: "/request/new"
        },
        {
            title: "Request List",
            icon: <ListAlt />,
            path: "/requests"
        },
        {
            title: "Reports",
            icon: <Assessment />,
            path: "/reports"
        },
        {
            title: "Profile",
            icon: <Person />,
            path: "/profile"
        }
    ];

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <AppBar
            position="static"
            elevation={1}
            sx={{
                bgcolor: "#1565C0"
            }}
        >

            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <Box
                    sx={{
                        display: "flex",
                        gap: 1
                    }}
                >

                    {
                        menus.map((menu) => (

                            <Button
                                key={menu.path}
                                startIcon={menu.icon}
                                onClick={() => navigate(menu.path)}
                                sx={{
                                    color: "#fff",
                                    px: 2,
                                    borderBottom:
                                        location.pathname === menu.path
                                            ? "3px solid #FFD54F"
                                            : "3px solid transparent",
                                    borderRadius: 0,
                                    fontWeight:
                                        location.pathname === menu.path
                                            ? "bold"
                                            : "normal"
                                }}
                            >
                                {menu.title}
                            </Button>

                        ))
                    }

                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Typography
                        variant="body2"
                        color="white"
                    >
                        Welcome, {user?.fullName}
                    </Typography>

                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default NavigationBar;