import { Box, Button, Typography } from "@mui/material";

import cdacLogo from "../../assets/cdac-logo.png";
import igimsLogo from "../../assets/igims-logo.jpg";

function DashboardHeader() {

    const user = JSON.parse(sessionStorage.getItem("user"));

    return (

        <>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >

                <img
                    src={cdacLogo}
                    alt="C-DAC"
                    width="65"
                />

                <Box textalign="center">

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="primary"
                    >
                        C-DAC IGIMS
                    </Typography>

                    <Typography
                        variant="h5"
                    >
                        Correspondence Management System
                    </Typography>

                </Box>

                <img
                    src={igimsLogo}
                    alt="IGIMS"
                    width="65"
                />

            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                    mb: 4
                }}
            >

                <Typography variant="h6">

                    dashHeader, {user?.fullName}

                </Typography>

                <Button color="error">

                    Logout

                </Button>

            </Box>

        </>

    );

}

export default DashboardHeader;