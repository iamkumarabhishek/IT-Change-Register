import axiosClient from "../api/axiosClient";

const getLetterReport = async () => {

    const response = await axiosClient.get("/reports/letters");

    return response.data;

};

const exportExcel = () => {

    window.open(

        "http://localhost:8080/api/letters/report/excel",

        "_blank"

    );

};

const exportPdf = () => {

    window.open(
        "http://localhost:8080/api/letters/report/pdf",
        "_blank"
    );

};

const reportService = {

    getLetterReport,

    exportExcel,

    exportPdf

};

export default reportService;