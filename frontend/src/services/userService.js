import axiosClient from "../api/axiosClient";

const userService = {

    createUser: async (userData) => {

        const response = await axiosClient.post(
            "/users/register",
            userData
        );

        return response.data;

    },

    updateProfile: async (userData) => {

        const response = await axiosClient.put(
            "/users/profile",
            userData
        );

        return response.data;

    }

};

export default userService;