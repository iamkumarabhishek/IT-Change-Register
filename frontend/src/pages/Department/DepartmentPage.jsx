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

import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function DepartmentPage() {

    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate();
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [departments, setDepartments] = useState([]);
    const [searchText, setSearchText] = useState("");
    const columns = [

        {
            field: "slNo",
            headerName: "Sl.",
            width: 80,
            sortable: false,
            filterable: false,

            renderCell: (params) => {

                return filteredDepartments.findIndex(
                    (department) => department.id === params.row.id
                ) + 1;

            }

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

        },

        {
            field: "action",

            headerName: "Action",

            width: 150,

            renderCell: (params) => (

                <Tooltip
                    title={
                        params.row.status === "ACTIVE"
                            ? "Deactivate"
                            : "Activate"
                    }
                >

                    <Button
                        size="small"
                        variant="outlined"
                        color={
                            params.row.status === "ACTIVE"
                                ? "error"
                                : "success"
                        }
                        onClick={() =>
                            handleStatusChange(params.row)
                        }
                    >
                        {params.row.status === "ACTIVE"
                            ? "Deactivate"
                            : "Activate"}
                    </Button>

                </Tooltip>

            )

        }


    ];

    const filteredDepartments = departments
        .filter((department) =>
            department.departmentName
                .toLowerCase()
                .includes(searchText.toLowerCase())
        )
        .sort((a, b) =>
            a.departmentName.localeCompare(b.departmentName)
        );

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

    const handleStatusChange = async (department) => {

        const newStatus =
            department.status === "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE";

        try {

            const response =
                await departmentService.updateDepartmentStatus(
                    department.id,
                    newStatus
                );

            if (response.success) {

                loadDepartments();

            }

        } catch (error) {

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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mb: 2
                        }}
                    >

                        <TextField
                            size="small"
                            label="Search Department"
                            placeholder="Type department name..."
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            sx={{
                                width: 300
                            }}
                        />

                    </Box>
                    <DataGrid

                        rows={filteredDepartments}

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