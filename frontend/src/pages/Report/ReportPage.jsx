import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import {
    Download,
    Search,
    Refresh
} from "@mui/icons-material";

import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import reportService from "../../services/reportService";

function ReportPage() {

    const [reports, setReports] = useState([]);

    const [filteredReports, setFilteredReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searched, setSearched] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const [department, setDepartment] = useState("All");

    const [uploadedBy, setUploadedBy] = useState("All");

    const [letterNumber, setLetterNumber] = useState("");

    const [departments, setDepartments] = useState([]);

    const [users, setUsers] = useState([]);

    const loadReports = async () => {

        try {

            setLoading(true);

            const response =
                await reportService.getLetterReport();

            if (response.success) {

                setReports(response.data);

                setFilteredReports([]);

                const uniqueDepartments = [

                    ...new Set(

                        response.data.map(
                            item => item.departmentName
                        )

                    )

                ].filter(Boolean).sort();

                setDepartments(["All", ...uniqueDepartments]);

                const uniqueUsers = [

                    "All",

                    ...new Set(

                        response.data.map(
                            item => item.uploadedBy
                        )

                    )

                ].filter(Boolean).sort();

                setUsers(uniqueUsers);

            }

            else {

                alert(response.message);

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to load report.");

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadReports();

    }, []);

    const handleFilter = () => {

        let filtered = [...reports];

        if (letterNumber) {

            filtered = filtered.filter(letter =>

                letter.letterNumber
                    ?.toLowerCase()
                    .includes(letterNumber.toLowerCase())

            );

        }

        if (department && department !== "All") {

            filtered = filtered.filter(letter =>

                letter.departmentName === department

            );

        }

        if (uploadedBy && uploadedBy !== "All") {

            filtered = filtered.filter(letter =>

                letter.uploadedBy === uploadedBy

            );

        }

        if (fromDate) {

            filtered = filtered.filter(letter =>

                letter.letterDate >= fromDate

            );

        }

        if (toDate) {

            filtered = filtered.filter(letter =>

                letter.letterDate <= toDate

            );

        }

        setFilteredReports(filtered);

        setSearched(true);

        setPage(0);

    };

    const handleReset = () => {

        setFromDate("");

        setToDate("");

        setDepartment("All");

        setUploadedBy("All");

        setLetterNumber("");

        setFilteredReports([]);

        setSearched(false);

        setPage(0);

    };

    const handleExportExcel = () => {

        reportService.exportExcel();

    };

    const handleExportPdf = () => {

        reportService.exportPdf();

    };

    const handleView = (fileName) => {

        const url =
            `${window.location.origin}/api/letters/view/${encodeURIComponent(fileName)}`;

        window.open(url, "_blank");

    };

    const handleDownload = (fileName) => {

        window.open(
            `${window.location.origin}/api/letters/download/${encodeURIComponent(fileName)}`,
            "_blank"
        );

    };

    return (

        <DashboardLayout>

            <Card>

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        mb={4}
                    >

                        Letter Register Report

                    </Typography>

                    <Box
                        sx={{
                            maxWidth: 600,
                            mx: "auto",
                            mb: 4
                        }}
                    >

                        <Typography
                            fontWeight="bold"
                            mb={1}
                        >
                            From Date
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DatePicker

                                format="DD/MM/YYYY"
                                value={fromDate ? dayjs(fromDate) : null}
                                onChange={(newValue) =>
                                    setFromDate(
                                        newValue
                                            ? newValue.format("YYYY-MM-DD")
                                            : ""
                                    )
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true
                                    }
                                }}
                            />

                        </LocalizationProvider>

                        <Typography
                            fontWeight="bold"
                            mb={1}
                        >
                            To Date
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DatePicker
                                format="DD/MM/YYYY"
                                value={toDate ? dayjs(toDate) : null}
                                onChange={(newValue) =>
                                    setToDate(
                                        newValue
                                            ? newValue.format("YYYY-MM-DD")
                                            : ""
                                    )
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true
                                    }
                                }}
                            />

                        </LocalizationProvider>

                        <Typography
                            fontWeight="bold"
                            mb={1}
                        >
                            Department
                        </Typography>

                        <Autocomplete

                            options={departments}

                            value={department}

                            onChange={(event, value) =>

                                setDepartment(value || "")

                            }

                            renderInput={(params) =>

                                <TextField
                                    {...params}
                                    fullWidth
                                />

                            }

                            sx={{ mb: 3 }}

                        />

                        <Typography
                            fontWeight="bold"
                            mb={1}
                        >
                            Uploaded By
                        </Typography>

                        <Autocomplete

                            options={users}

                            value={uploadedBy}

                            onChange={(event, value) =>

                                setUploadedBy(value || "All")

                            }

                            renderInput={(params) =>

                                <TextField
                                    {...params}
                                    fullWidth
                                />

                            }

                            sx={{ mb: 3 }}

                        />

                        <Typography
                            fontWeight="bold"
                            mb={1}
                        >
                            Letter Number
                        </Typography>

                        <TextField

                            value={letterNumber}

                            onChange={(e) =>

                                setLetterNumber(e.target.value)

                            }

                            fullWidth

                            sx={{ mb: 4 }}

                        />
                        <Box
                            sx={{
                                display:"flex",
                                justifyContent: "center"

                            }}
                        >


                            <Button

                                variant="contained"

                                startIcon={<Search />}

                                onClick={handleFilter}

                            >

                                Search

                            </Button>

                            <Button

                                variant="outlined"

                                startIcon={<Refresh />}

                                onClick={handleReset}

                            >

                                Reset

                            </Button>

                        </Box>

                    </Box>
                    {
                        loading ? (

                            <Box sx={{
                                textAlign: "center"
                            }} py={5}>
                                <CircularProgress />
                            </Box>

                        ) : !searched ? (

                            <Alert severity="info">

                                Select the required filters and click <strong>Search</strong> to generate the report.

                            </Alert>

                        ) : (

                            <>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ mb: 2 }}
                                >

                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >

                                        Total Records : {filteredReports.length}

                                    </Typography>

                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >

                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={handleExportExcel}
                                        >
                                            Export Excel
                                        </Button>

                                        <Button
                                            variant="contained"
                                            onClick={handleExportPdf}
                                        >
                                            Export PDF
                                        </Button>

                                    </Stack>

                                </Stack>

                                <TableContainer component={Paper}>

                                    <Table>

                                        <TableHead>

                                            <TableRow>

                                                <TableCell><b>S.No.</b></TableCell>

                                                <TableCell><b>Letter No.</b></TableCell>

                                                <TableCell><b>Date</b></TableCell>

                                                <TableCell><b>Department</b></TableCell>

                                                <TableCell><b>Subject</b></TableCell>

                                                <TableCell><b>Description</b></TableCell>

                                                <TableCell><b>Uploaded By</b></TableCell>

                                                <TableCell align="center">

                                                    <b>Attachment</b>

                                                </TableCell>

                                            </TableRow>

                                        </TableHead>

                                        <TableBody>

                                            {

                                                filteredReports.length === 0 ?

                                                    <TableRow>

                                                        <TableCell
                                                            colSpan={8}
                                                            align="center"
                                                        >

                                                            No Records Found

                                                        </TableCell>

                                                    </TableRow>

                                                    :

                                                    filteredReports

                                                        .slice(

                                                            page * rowsPerPage,

                                                            page * rowsPerPage + rowsPerPage

                                                        )

                                                        .map((letter, index) => (

                                                            <TableRow
                                                                hover
                                                                key={letter.id}
                                                            >

                                                                <TableCell>

                                                                    {page * rowsPerPage + index + 1}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.letterNumber}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.letterDate}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.departmentName}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.subject}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.description}

                                                                </TableCell>

                                                                <TableCell>

                                                                    {letter.uploadedBy}

                                                                </TableCell>

                                                                <TableCell align="center">

                                                                    {

                                                                        letter.attachment ? (

                                                                            <>

                                                                                <IconButton
                                                                                    color="info"
                                                                                    title="View Attachment"
                                                                                    onClick={() =>
                                                                                        handleView(letter.attachment)
                                                                                    }
                                                                                >
                                                                                    <VisibilityIcon />
                                                                                </IconButton>

                                                                                <IconButton
                                                                                    color="primary"
                                                                                    title="Download Attachment"
                                                                                    onClick={() =>
                                                                                        handleDownload(letter.attachment)
                                                                                    }
                                                                                >
                                                                                    <Download />
                                                                                </IconButton>

                                                                            </>

                                                                        ) : (

                                                                            "-"

                                                                        )

                                                                    }

                                                                </TableCell>

                                                            </TableRow>

                                                        ))

                                            }

                                        </TableBody>

                                    </Table>

                                    <TablePagination

                                        component="div"

                                        count={filteredReports.length}

                                        page={page}

                                        rowsPerPage={rowsPerPage}

                                        rowsPerPageOptions={[5, 10, 20, 50]}

                                        onPageChange={(event, newPage) =>

                                            setPage(newPage)

                                        }

                                        onRowsPerPageChange={(event) => {

                                            setRowsPerPage(

                                                parseInt(

                                                    event.target.value,

                                                    10

                                                )

                                            );

                                            setPage(0);

                                        }}

                                    />

                                </TableContainer>

                            </>

                        )

                    }

                </CardContent>

            </Card>

        </DashboardLayout>

    );

}

export default ReportPage;