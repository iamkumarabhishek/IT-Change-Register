import axiosClient from "../api/axiosClient";


const getLetterReport = async () => {

    const response = await axiosClient.get("/reports/letters");

    return response.data;

};

const exportExcel = () => {

    window.open(
        `${window.location.origin}/api/letters/report/excel`,
        "_blank"
    );

};

const exportPdf = () => {

    window.open(
        `${window.location.origin}/api/letters/report/pdf`,
        "_blank"
    );

};



const reportService = {

    getLetterReport,

    exportExcel,

    exportPdf

};

export default reportService;