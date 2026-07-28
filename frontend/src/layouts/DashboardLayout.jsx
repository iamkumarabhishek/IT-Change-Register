import { Box, Container } from "@mui/material";

import Header from "../components/layout/Header";
import NavigationBar from "../components/layout/NavigationBar";

function DashboardLayout({ children }) {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#F4F7FC",
                py: 2
            }}
        >

            <Container maxWidth="xl">

                <Header />

                <NavigationBar />

                <Box
                    sx={{
                        backgroundColor: "#ffffff",
                        mt: 2,
                        borderRadius: 2,
                        p: 5,
                        minHeight: "72vh",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >

                    {children}

                </Box>

            </Container>

        </Box>

    );

}

export default DashboardLayout;