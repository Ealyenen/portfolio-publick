import React from "react";
import {
    Typography,
    Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import moment from 'moment';
import StorePrepayment from "../store/PrepaymentStore";
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const PrepaymentMobileHeader = observer(() => {
    const storePrepayment = useInstance(StorePrepayment)

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
                        {moment(storePrepayment.prepayment.created).format("HH:mm")}
                    </Typography>
                    <Typography variant="body" sx={{ bgcolor: storePrepayment.switchPrepaymentStatus(storePrepayment.prepayment.status).color, p: 0.5, borderRadius: 1, color: "primary.main", lineHeight: 1.5 }}>
                        {storePrepayment.switchPrepaymentStatus(storePrepayment.prepayment.status).status}
                    </Typography>
                </Box>
            </Box>
    );
});

export default PrepaymentMobileHeader;