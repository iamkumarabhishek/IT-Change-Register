import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Divider
} from "@mui/material";
import SuccessDialog from "../../components/common/SuccessDialog";
import { useState } from "react";
import ErrorDialog from "../../components/common/ErrorDialog";
import { useNavigate } from "react-router-dom";
import departmentService from "../../services/departmentService";
import DashboardLayout from "../../layouts/DashboardLayout";

function DepartmentPage() {

    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate();
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSave = async () => {

        try {

            const response =
                await departmentService.saveDepartment({

                    departmentName: departmentName

                });
            console.log(response);
            if (response.success) {

                setOpenSuccessDialog(true);

            }
            else {

                setErrorMessage(response.message);

                setOpenErrorDialog(true);

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleReset = () => {

        setDepartmentName("");

        setStatus("ACTIVE");

    };

    const handleErrorOk = () => {

        setOpenErrorDialog(false);

    };
    const handleSuccessOk = () => {

        setOpenSuccessDialog(false);

        handleReset();

    };

    return (

        <DashboardLayout>

            <Card
                sx={{
                    maxWidth: 700,
                    mx: "auto"
                }}
            >

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Department Master

                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    <Typography
                        fontWeight="bold"
                        mb={1}
                    >

                        Department Name *

                    </Typography>

                    <TextField

                        fullWidth

                        value={departmentName}

                        onChange={(event) =>

                            setDepartmentName(event.target.value)

                        }

                    />

                    <typography mb={1}> .</typography>


                    <Box

                        display="flex"

                        justifyContent="center"

                        gap={5}

                        mt={6}

                    >

                        <Button

                            variant="contained"

                            onClick={handleSave}

                        >

                            Save

                        </Button>

                        <Button

                            variant="outlined"

                            color="error"

                            onClick={handleReset}

                        >

                            Reset

                        </Button>

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => navigate("/setup")}
                        >
                            Cancel
                        </Button>

                    </Box>

                </CardContent>

            </Card>
            <SuccessDialog
                open={openSuccessDialog}
                title="Department Added"
                message="Department has been added successfully."
                onOk={handleSuccessOk}
            />
            <ErrorDialog
                open={openErrorDialog}
                title="Duplicate Department"
                message={errorMessage}
                onOk={handleErrorOk}
            />
        </DashboardLayout>

    );

}

export default DepartmentPage;