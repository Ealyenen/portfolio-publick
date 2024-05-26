import React from "react";
import {
    Typography,
    Box,
    Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import moment from 'moment';
import StorePrepayment from "../store/PrepaymentStore";
import PrintIcon from '@mui/icons-material/Print';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const PrepaymentHeader = observer(() => {
    const storePrepayment = useInstance(StorePrepayment)

    const disablePrintBtn = !(storePrepayment.prepayment.status === "PAYED" && storePrepayment.prepayment.payed)

    const handlePrintClick = (event) => {
        event.stopPropagation()
        storePrepayment.printPrepayment()
    }

    return (
        <Box
            sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                m: 0,
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CreditScoreIcon/>
                <Typography>
                    Предоплата
                </Typography>
                <Typography>
                    {moment(storePrepayment.prepayment.created).format("HH:mm")}
                </Typography>
                <Typography variant="button" sx={{ bgcolor: storePrepayment.switchPrepaymentStatus(storePrepayment.prepayment.status).color, p: [1, 0.5], borderRadius: 1, color: "primary.main" }}>
                    {storePrepayment.switchPrepaymentStatus(storePrepayment.prepayment.status).status}
                </Typography>
            </Box>
            <Box>
                <Button disabled={disablePrintBtn} size="small" variant="outlined" onClick={handlePrintClick}>
                    <Typography variant="button" sx={{display: {xs: "none", md: "block"}}}>
                        Распечатать
                    </Typography>
                    <PrintIcon />
                </Button>
            </Box>
        </Box>
    );
});

export default PrepaymentHeader;