import React from 'react';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from '../../../store/patient.store';
import { fullNameString } from '../../../../../_common/helpers/nameGenerationString';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import moment from "moment"


const PatientName = observer(() => {
    const patientStore = useInstance(PatientStore)

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "end", gap: 2, flexWrap: "wrap" }}>
                    <Typography variant="h5">
                        {fullNameString(patientStore.getLastName(), patientStore.getFirstName(), patientStore.getPatronymic()) || "Нет имени"}
                    </Typography>
                    <Typography>
                        {patientStore.getBirthday() ?
                            <>
                                {moment(patientStore.getBirthday()).format("DD.MM.YYYY")}
                                {patientStore.getAge() ? ` (${patientStore.getAge()})` : ""}
                            </>
                            :
                            ""}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {patientStore.getIsPatient() ?
                            <CheckBoxIcon sx={{ color: "primary.main" }} />
                            :
                            <CheckBoxOutlineBlankIcon />
                        }
                        <Typography variant="subtitle1">
                            Пациент
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {patientStore.getIsPrepaidService() ?
                            <CheckBoxIcon sx={{ color: "primary.main" }} />
                            :
                            <CheckBoxOutlineBlankIcon />
                        }
                        <Typography variant="subtitle1">
                            По предоплате
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h6" sx={{ display: "inline" }}>
                    Баланс:{" "}
                </Typography>
                <Typography sx={{ display: "inline" }}>
                    {patientStore.getBalanceId() && patientStore.getBalanceValue() ? patientStore.getBalanceValue() : "0.00"}
                </Typography>
            </Box>
        </>

    );
});

export default PatientName;