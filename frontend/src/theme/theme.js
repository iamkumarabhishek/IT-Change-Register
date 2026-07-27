import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976D2",
        },
        secondary: {
            main: "#455A64",
        },
        background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
        },
        success: {
            main: "#2E7D32",
        },
        warning: {
            main: "#ED6C02",
        },
        error: {
            main: "#D32F2F",
        },
    },

    typography: {
        fontFamily: "Roboto, Arial, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 10,
    },
});

export default theme;