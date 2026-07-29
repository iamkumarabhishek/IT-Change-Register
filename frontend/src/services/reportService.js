import axiosClient from "../api/axiosClient";

const getLetterReport = async () => {

    const response = await axiosClient.get(
        "/reports/letters"
    );

    return response.data;

};

export default {

    getLetterReport

};