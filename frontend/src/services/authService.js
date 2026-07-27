import axiosClient from "../api/axiosClient";

const authService = {

    login: async (loginData) => {
        const response = await axiosClient.post("/auth/login", loginData);
        return response.data;
    },

    register: async (registerData) => {
        const response = await axiosClient.post("/auth/register", registerData);
        return response.data;
    }

};

export default authService;