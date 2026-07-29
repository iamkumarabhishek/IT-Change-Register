import { useState } from "react";
import letterService from "../../services/letterService";

import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";

import {
    Description,
    CloudUpload
} from "@mui/icons-material";

function LetterForm() {

    const [formData, setFormData] = useState({

        letterNumber: "",
        letterDate: "",
        department: "",
        subject: "",
        description: "",
        remarks: ""

    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const departments = [

        "Administration",
        "Accounts",
        "IT Cell",
        "Biochemistry",
        "Pathology",
        "Radiology"

    ];

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {

            alert("File size should not exceed 5 MB.");

            return;

        }

        setSelectedFile(file);

    };

    const handleReset = () => {

        setFormData({

            letterNumber: "",
            letterDate: "",
            department: "",
            subject: "",
            description: "",
            remarks: ""

        });

        setSelectedFile(null);

        setLoading(false);

    };

    const handleSave = async () => {

        if (

            !formData.letterNumber ||
            !formData.letterDate ||
            !formData.department ||
            !formData.subject ||
            !formData.description ||
            !formData.remarks ||
            !selectedFile

        ) {

            alert("Please fill all required fields.");

            return;

        }

        try {

            setLoading(true);

            const data = new FormData();

            data.append(
                "letterNumber",
                formData.letterNumber
            );

            data.append(
                "letterDate",
                formData.letterDate
            );

            data.append(
                "departmentName",
                formData.department
            );

            data.append(
                "subject",
                formData.subject
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "remarks",
                formData.remarks
            );

            data.append(
                "attachment",
                selectedFile
            );

            const response = await letterService.saveLetter(data);

            if (response.success) {

                alert(response.message);

                handleReset();

            } else {

                alert(response.message);

            }

        } catch (error) {

            console.error(error);

            alert("Unable to save letter.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Paper
            elevation={2}
            sx={{
                p: 4,
                borderRadius: 3
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 4
                }}
            >

                <Description
                    color="primary"
                    fontSize="large"
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    Add Letter
                </Typography>

            </Box>

            <Grid
                container
                spacing={3}
            >

                <Grid size={{ xs: 12, md: 4 }}>

                    <TextField
                        fullWidth
                        required
                        label="Letter Number"
                        name="letterNumber"
                        value={formData.letterNumber}
                        onChange={handleChange}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <TextField
                        fullWidth
                        required
                        type="date"
                        name="letterDate"
                        value={formData.letterDate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <FormControl fullWidth required>

                        <InputLabel>
                            Department
                        </InputLabel>

                        <Select
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                        >

                            <MenuItem value="">
                                <em>Select Department</em>
                            </MenuItem>

                            {
                                departments.map((department) => (

                                    <MenuItem
                                        key={department}
                                        value={department}
                                    >
                                        {department}
                                    </MenuItem>

                                ))
                            }

                        </Select>

                    </FormControl>

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        required
                        label="Subject"
                        placeholder="Enter Letter Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        required
                        label="Description"
                        placeholder="Enter detailed description..."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                </Grid>
                {/* Upload Letter */}

                <Grid size={{ xs: 12, md: 4 }}>

                    <Typography
                        fontWeight="bold"
                        sx={{ mb: 1 }}
                    >
                        Upload Letter *
                    </Typography>

                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUpload />}
                        fullWidth
                        sx={{
                            height: 56,
                            textTransform: "none"
                        }}
                    >
                        Browse File

                        <input
                            hidden
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />

                    </Button>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1,
                            wordBreak: "break-word"
                        }}
                    >
                        {
                            selectedFile
                                ? `${selectedFile.name} (${(
                                    selectedFile.size /
                                    (1024 * 1024)
                                ).toFixed(2)} MB)`
                                : "No file selected"
                        }
                    </Typography>

                </Grid>

                {/* Remarks */}

                <Grid size={{ xs: 12, md: 8 }}>

                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={4}
                        label="Remarks"
                        name="remarks"
                        placeholder="Enter remarks..."
                        value={formData.remarks}
                        onChange={handleChange}
                    />

                </Grid>

                {/* Buttons */}

                <Grid size={{ xs: 12 }}>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mt: 2
                        }}
                    >

                        <Button
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                minWidth: 150,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                            onClick={handleSave}
                        >
                            {loading ? "Saving Letter..." : "Save"}
                        </Button>

                        <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{
                                minWidth: 150,
                                textTransform: "none",
                                fontWeight: 600
                            }}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                    </Box>

                </Grid>

            </Grid>

        </Paper>

    );

}

export default LetterForm;