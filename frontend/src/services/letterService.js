import axiosClient from "../api/axiosClient";

const saveLetter = async (formData) => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    const response = await axiosClient.post(

        "/letters",

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

const letterService = {

    saveLetter

};

export default letterService;