import axiosClient from "../api/axiosClient";

const departmentService = {

    getDepartments: async () => {

        const response = await axiosClient.get("/departments");

        return response.data;

    },

    getActiveDepartments: async () => {

        const response = await axiosClient.get("/departments/active");

        return response.data;

    },

    saveDepartment: async (department) => {

        const response = await axiosClient.post(
            "/departments",
            department
        );

        return response.data;

    }

};

export default departmentService;