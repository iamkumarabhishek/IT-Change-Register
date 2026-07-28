import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

function DashboardCard({ title, onClick }) {

    return (

        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8
                }
            }}
        >

            <CardActionArea
                onClick={onClick}
                sx={{
                    height: 170
                }}
            >

                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%"
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        align="center"
                    >
                        {title}
                    </Typography>

                </CardContent>

            </CardActionArea>

        </Card>

    );

}

export default DashboardCard;