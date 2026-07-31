import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function SuccessDialog({

                           open,

                           title = "Success",

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

                <CheckCircleIcon
                    color="success"
                    sx={{
                        fontSize: 60,
                        mb: 1
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight="bold"
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
                    color="success"
                    onClick={onOk}
                >
                    OK
                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default SuccessDialog;