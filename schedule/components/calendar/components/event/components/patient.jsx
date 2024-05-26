import React from "react";
import { Typography, Box } from "@mui/material"
import { fullNameString } from "../../../../../../../_common/helpers/nameGenerationString";

const Patient = (({ patient }) => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "end", alignItems: "center" }}>
            <Typography variant="subtitle2" sx={{ fontSize: 12, diaplay: "inline", textAlign: "right" }}>
                {fullNameString(patient?.lastName, patient?.firstName, patient?.patronymic)}
            </Typography>
            {patient?.age &&
                <Typography variant="body" sx={{ diaplay: "inline", textAlign: "right", fontSize: 10 }}>
                    &nbsp;{patient.age}
                </Typography>
            }
        </Box>
    )
});

export default Patient