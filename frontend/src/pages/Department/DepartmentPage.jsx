import {
    Box,
    Button,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Typography,
    Divider
} from "@mui/material";

import { useState } from "react";
import departmentService from "../../services/departmentService";
import { toast } from "react-toastify";
import DashboardLayout from "../../layouts/DashboardLayout";

function DepartmentPage() {

    const [departmentName, setDepartmentName] = useState("");

    const [status, setStatus] = useState("ACTIVE");

    const handleSave = async () => {

        if (!departmentName.trim()) {

            toast.error("Department Name is required.");

            return;

        }

        try {

            const response =
                await departmentService.saveDepartment({

                    departmentName,

                    status

                });

            if (response.success) {

                toast.success(response.message);

                handleReset();

            }

            else {

                toast.error(response.message);

            }

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to save department.");

        }

    };

    const handleReset = () => {

        setDepartmentName("");

        setStatus("ACTIVE");

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

                    <Typography
                        fontWeight="bold"
                        mt={3}
                        mb={1}
                    >

                        Status

                    </Typography>

                    <RadioGroup

                        row

                        value={status}

                        onChange={(event) =>

                            setStatus(event.target.value)

                        }

                    >

                        <FormControlLabel

                            value="ACTIVE"

                            control={<Radio />}

                            label="Active"

                        />

                        <FormControlLabel

                            value="INACTIVE"

                            control={<Radio />}

                            label="Inactive"

                        />

                    </RadioGroup>

                    <Box

                        display="flex"

                        justifyContent="center"

                        gap={2}

                        mt={4}

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

                    </Box>

                </CardContent>

            </Card>

        </DashboardLayout>

    );

}

export default DepartmentPage;