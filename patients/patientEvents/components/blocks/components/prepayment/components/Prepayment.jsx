import React from "react";
import {
    Typography,
    Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import StorePrepayment from "../store/PrepaymentStore";
import { SurnameAndInitialsString } from "../../../../../../../../_common/helpers/nameGenerationString"

const Prepayment = observer(() => {
    const storePrepayment = useInstance(StorePrepayment)

    return (
        <>
            <Box>
                <Typography variant="subtitle1" sx={{ display: "inline" }}>
                    Общая сумма предолаты:
                </Typography>
                <Typography sx={{ display: "inline" }}>
                    {' '}
                    {storePrepayment.prepayment.totalPrepayment}{'\u20BD'}
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
        </>
    );
});

export default Prepayment;