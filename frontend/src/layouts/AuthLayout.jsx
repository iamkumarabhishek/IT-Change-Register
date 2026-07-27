import { Box, Paper } from "@mui/material";
import AppHeader from "../components/layout/AppHeader";

function AuthLayout({ children }) {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eef2f7",
                p: 2
            }}
        >

            <Paper
                elevation={6}
                sx={{
                    width: 650,
                    maxWidth: "95%",
                    borderRadius: 4,
                    p: 4
                }}
            >

                <AppHeader />

                {children}

            </Paper>

        </Box>

    );

}

export default AuthLayout;