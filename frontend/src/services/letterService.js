import axiosClient from "../api/axiosClient";

const saveLetter = async (formData) => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    const response = await axiosClient.post(

        "/letters/save",

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data",
                username: user.username
            }
        }

    );

    return response.data;

};

const getAllLetters = async () => {

    const response = await axiosClient.get("/letters");

    return response.data;

};

const letterService = {

    saveLetter,
    getAllLetters

};

export default letterService;