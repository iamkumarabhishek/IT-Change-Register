import {
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

import ApartmentIcon from "@mui/icons-material/Apartment";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

function SetupPage() {

    const navigate = useNavigate();

    return (

        <DashboardLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Setup
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                mb={4}
            >
                Configure application masters.
            </Typography>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>

                    <Card
                        sx={{
                            cursor: "pointer",
                            transition: "0.3s",
                            "&:hover": {
                                boxShadow: 6,
                                transform: "translateY(-4px)"
                            }
                        }}
                        onClick={() => navigate("/departments")}
                    >

                        <CardContent
                            sx={{
                                textAlign: "center",
                                py: 5
                            }}
                        >

                            <ApartmentIcon
                                color="primary"
                                sx={{
                                    fontSize: 60
                                }}
                            />

                            <Typography
                                variant="h6"
                                mt={2}
                                fontWeight="bold"
                            >
                                Department Master
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Add, edit and deactivate departments.
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </DashboardLayout>

    );

}

export default SetupPage;