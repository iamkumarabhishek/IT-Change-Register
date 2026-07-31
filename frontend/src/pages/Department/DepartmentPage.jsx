import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Divider,
    Chip
} from "@mui/material";

import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
    const [departments, setDepartments] = useState([]);
    const columns = [

        {
            field: "id",
            headerName: "Sl.",
            width: 80
        },

        {
            field: "departmentName",
            headerName: "Department Name",
            flex: 1
        },

        {
            field: "status",
            headerName: "Status",
            width: 140,

            renderCell: (params) => (

                <Chip
                    label={
                        params.value === "ACTIVE"
                            ? "Active"
                            : "Inactive"
                    }

                    color={
                        params.value === "ACTIVE"
                            ? "success"
                            : "error"
                    }

                    size="small"

                    sx={{
                        fontWeight: "bold",
                        minWidth: 90
                    }}
                />

            )

        }

    ];

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

    };

    const handleErrorOk = () => {

        setOpenErrorDialog(false);

    };
    const handleSuccessOk = () => {

        setOpenSuccessDialog(false);

        handleReset();
        loadDepartments();

    };



    const loadDepartments = async () => {

        try {

            const response =
                await departmentService.getAllDepartments();
            console.log(response.data);
            if (response.success) {

                setDepartments(response.data);
                console.log(response);

            }

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadDepartments();

    }, []);

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

            <Card
                sx={{
                    mt: 3
                }}
            >

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        gutterBottom
                    >

                        Department List

                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <DataGrid

                        rows={departments}

                        columns={columns}

                        initialState={{
                            pagination: {
                                paginationModel: {
                                    page: 0,
                                    pageSize: 10
                                }
                            }
                        }}

                        pageSizeOptions={[10, 25, 50, 100]}

                        disableRowSelectionOnClick

                        autoHeight

                    />

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