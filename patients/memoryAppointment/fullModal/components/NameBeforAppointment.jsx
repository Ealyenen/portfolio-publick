import React from 'react';
import { Box, Typography } from "@mui/material"
import { fullNameString } from '../../../../../_common/helpers/nameGenerationString';
import moment from "moment"
import PersonIcon from '@mui/icons-material/Person';

const NameBeforAppointment = ({ patient }) => {

    return (
        <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <PersonIcon />
            <Box>
                <Typography sx={{ display: "inline" }} variant="h6">
                    {fullNameString(patient?.lastName, patient?.firstName, patient?.patronymic)}{" "}
                </Typography>
                <Typography sx={{ display: "inline" }} variant="subtitle1">
                    {patient?.age ? patient.age + " " : ""}({patient?.birthday ? moment(patient.birthday).format("DD.MM.YYYY") : ""})
                </Typography>
            </Box>
        </Box>
    );
}

export default NameBeforAppointment