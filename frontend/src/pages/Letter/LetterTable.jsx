import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    IconButton,
    Paper,
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

import {
    Add,
    Refresh,
    Download
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import letterService from "../../services/letterService";

function LetterTable() {

    const navigate = useNavigate();

    const [letters, setLetters] = useState([]);

    const [filteredLetters, setFilteredLetters] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {

        loadLetters();

    }, []);

    async function loadLetters() {

        try {

            setLoading(true);

            const response =
                await letterService.getAllLetters();

            if (response.success) {

                setLetters(response.data);

                setFilteredLetters(response.data);

            }
            else {

                alert(response.message);

            }

        }
        catch (error) {

            console.error(error);

            alert("Unable to load letters.");

        }
        finally {

            setLoading(false);

        }

    };

    const handleSearch = (event) => {

        const value = event.target.value.toLowerCase();

        setSearch(event.target.value);

        const filtered = letters.filter((letter) =>

            letter.letterNumber?.toLowerCase().includes(value) ||

            letter.departmentName?.toLowerCase().includes(value) ||

            letter.subject?.toLowerCase().includes(value) ||

            letter.description?.toLowerCase().includes(value) ||

            letter.remarks?.toLowerCase().includes(value) ||

            letter.uploadedBy?.toLowerCase().includes(value) ||

            letter.letterDate?.toString().includes(value)

        );

        setFilteredLetters(filtered);

        setPage(0);

    };

    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleRowsPerPageChange = (event) => {

        setRowsPerPage(
            parseInt(event.target.value, 10)
        );

        setPage(0);

    };

    const handleDownload = (fileName) => {
        console.log("Downloading:", fileName);
        window.open(
            `http://localhost:8080/api/letters/download/${encodeURIComponent(fileName)}`,
            "_blank"
        );

    };

    return (

        <Card>

            <CardContent>

                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems="center"

                    mb={3}

                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >

                        Letter List

                    </Typography>

                    <Box>

                        <Button

                            startIcon={<Refresh />}

                            variant="outlined"

                            onClick={loadLetters}

                            sx={{ mr: 2 }}

                        >

                            Refresh

                        </Button>

                        <Button

                            startIcon={<Add />}

                            variant="contained"

                            onClick={() =>
                                navigate("/letters/add")
                            }

                        >

                            Add Letter

                        </Button>

                    </Box>

                </Box>

                <TextField

                    fullWidth

                    placeholder="Search by Letter No., Date, Department, Subject, Description, Remarks or Uploaded By"

                    value={search}

                    onChange={handleSearch}

                    sx={{ mb: 3 }}

                />

                {
                    loading ?

                        <Box
                            textalign="center"
                            py={5}
                        >

                            <CircularProgress />

                        </Box>

                        :

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

                                        <TableCell align="center">
                                            <b>Attachment</b>
                                        </TableCell>

                                    </TableRow>

                                </TableHead>

                                <TableBody>

                                    {

                                        filteredLetters.length === 0 ?

                                            <TableRow>

                                                <TableCell
                                                    colSpan={7}
                                                    align="center"
                                                >

                                                    No Records Found

                                                </TableCell>

                                            </TableRow>

                                            :

                                            filteredLetters
                                                .slice(

                                                    page * rowsPerPage,

                                                    page * rowsPerPage + rowsPerPage

                                                )
                                                .map((letter, index) => (

                                                    <TableRow
                                                        key={letter.id}
                                                        hover
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

                                                        <TableCell
                                                            sx={{
                                                                maxWidth: 250,
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            }}
                                                        >
                                                            {letter.description}
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            {
                                                                letter.attachment ?
                                                                    <IconButton
                                                                        color="primary"
                                                                        onClick={() =>
                                                                            handleDownload(letter.attachment)
                                                                        }
                                                                        title="Download Attachment"
                                                                    >
                                                                        <Download />
                                                                    </IconButton>
                                                                    :
                                                                    "-"
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))

                                    }

                                </TableBody>

                            </Table>

                            <TablePagination

                                component="div"

                                count={filteredLetters.length}

                                page={page}

                                onPageChange={handleChangePage}

                                rowsPerPage={rowsPerPage}

                                onRowsPerPageChange={
                                    handleRowsPerPageChange
                                }

                                rowsPerPageOptions={[5, 10, 20, 50]}

                            />

                        </TableContainer>

                }

            </CardContent>

        </Card>

    );

}

export default LetterTable;