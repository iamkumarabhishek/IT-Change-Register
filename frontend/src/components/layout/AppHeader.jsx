import { Box, Typography } from "@mui/material";

import cdacLogo from "../../assets/cdac-logo.png";
import igimsLogo from "../../assets/igims-logo.jpg";

function AppHeader() {
    return (
        <Box sx={{ mb: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1
                }}
            >

                {/* Left Logo */}
                <Box
                    sx={{
                        width: 90,
                        display: "flex",
                        justifyContent: "flex-start"
                    }}
                >
                    <img
                        src={cdacLogo}
                        alt="C-DAC Logo"
                        style={{
                            width: 85,
                            height: 85,
                            objectFit: "contain"
                        }}
                    />
                </Box>

                {/* Center Title */}
                <Box
                    sx={{
                        flex: 1,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            color: "#1976d2",
                            fontSize: "2.3rem",
                            lineHeight: 1.1
                        }}
                    >
                        C-DAC IGIMS
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.6rem",
                            mt: 0.5
                        }}
                    >
                        Correspondence Management System
                    </Typography>
                </Box>

                {/* Right Logo */}
                <Box
                    sx={{
                        width: 90,
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <img
                        src={igimsLogo}
                        alt="IGIMS Logo"
                        style={{
                            width: 85,
                            height: 85,
                            objectFit: "contain"
                        }}
                    />
                </Box>

            </Box>

        </Box>
    );
}

export default AppHeader;