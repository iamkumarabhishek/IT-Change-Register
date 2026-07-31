import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";

function ErrorDialog({

                         open,

                         title = "Error",

                         message,

                         onOk

                     }) {

    return (

        <Dialog
            open={open}
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle
                textAlign="center"
            >

                <ErrorIcon
                    color="error"
                    sx={{
                        fontSize: 60,
                        mb: 1
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="error"
                >
                    {title}
                </Typography>

            </DialogTitle>

            <DialogContent>

                <Typography
                    textAlign="center"
                >
                    {message}
                </Typography>

            </DialogContent>

            <DialogActions
                sx={{
                    justifyContent: "center",
                    pb: 3
                }}
            >

                <Button
                    variant="contained"
                    color="error"
                    onClick={onOk}
                >
                    OK
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ErrorDialog;