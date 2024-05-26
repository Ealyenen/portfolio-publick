import React from 'react';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import moment from "moment"


const Registration = observer(() => {
    const patientStore = useInstance(PatientStore)

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ display: "inline-block" }}>
                Дата регистрации:
            </Typography>

            {patientStore.getCreated() ?
                < Typography sx={{ display: "inline-block" }}>
                    {"\u00A0"}{moment(patientStore.getCreated()).format("DD.MM.YYYY")}
                </Typography >
                :
                ""}
        </Box>
    );
});

export default Registration;