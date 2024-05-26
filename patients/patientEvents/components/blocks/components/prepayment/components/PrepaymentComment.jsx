import React from "react";
import { useInstance } from "react-ioc";
import {
    Typography,
    Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import StorePrepayment from "../store/PrepaymentStore";

const PrepaymentComment = observer(() => {
    const storePrepayment = useInstance(StorePrepayment)

    return (
        <>
            <Box sx={{mt: 2, width: "100%"}}>
                <Typography variant="subtitle1">
                    Комментарий предолаты:
                </Typography>
                <Typography sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "primary.light2", bgcolor: "primary.white"}}>
                    {storePrepayment.prepayment.comment}
                </Typography>
            </Box>
        </>
    );
});

export default PrepaymentComment;