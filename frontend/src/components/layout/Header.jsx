import { AppBar, Toolbar, Box, Typography } from "@mui/material";

import cdacLogo from "../../assets/cdac-logo.png";
import igimsLogo from "../../assets/igims-logo.jpg";

function Header() {

    return (

        <AppBar
            position="static"
            elevation={2}
            sx={{
                backgroundColor: "#ffffff",
                color: "#1a237e",
                borderRadius: "8px 8px 0 0"
            }}
        >

            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1
                }}
            >

                <Box
                    component="img"
                    src={cdacLogo}
                    alt="C-DAC"
                    sx={{
                        height: 65
                    }}
                />

                <Box textalign="center">

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        C-DAC IGIMS
                    </Typography>

                    <Typography
                        variant="h6"
                        color="text.secondary"
                    >
                        Correspondence Management System
                    </Typography>

                </Box>

                <Box
                    component="img"
                    src={igimsLogo}
                    alt="IGIMS"
                    sx={{
                        height: 65
                    }}
                />

            </Toolbar>

        </AppBar>

    );

}

export default Header;