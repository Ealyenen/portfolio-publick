import React from "react";
import {
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import moment from "moment";
import StorePrepayment from "../store/PrepaymentStore";
import PrintIcon from '@mui/icons-material/Print';
import { SurnameAndInitialsString } from "../../../../../../../../_common/helpers/nameGenerationString"


const PrepaymentMobile = observer(() => {
    const storePrepayment = useInstance(StorePrepayment)

    const disablePrintBtn = !(storePrepayment.prepayment.status === "PAYED" && storePrepayment.prepayment.payed)

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography sx={{ display: "inline" }}>
                        {moment(storePrepayment.prepayment.created).format("DD.MM.YYYY")}
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {" "}{moment(storePrepayment.prepayment.created).format("HH:mm")}
                    </Typography>
                </Box>
                <IconButton disabled={disablePrintBtn} onClick={() => storePrepayment.printPrepayment()}>
                    <PrintIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Сумма предолаты:
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {' '}
                        {storePrepayment.prepayment.totalPrepayment}{'\u20BD'}
                        {storePrepayment.prepayment.percentPrepayment ? ` (${storePrepayment.prepayment.percentPrepayment.replace('.00', '')}%)` : ""}
                    </Typography>
                </Box>
                {storePrepayment.prepayment?.creator &&
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "inline" }}>
                            Предоплату назначил:
                        </Typography>
                        <Typography sx={{ display: "inline" }}>
                            {' '}
                            {SurnameAndInitialsString(storePrepayment.prepayment.creator.lastName, storePrepayment.prepayment.creator.firstName, storePrepayment.prepayment.creator.patronymic)}
                        </Typography>
                    </Box>
                }

            </Box>
        </>
    );
});

export default PrepaymentMobile;