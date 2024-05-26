import React from "react";
import { Typography, Box } from "@mui/material"
import { getNewPatientIconColor } from "../../../store/schedulePatientRecordColor";

const PatientIsNewAndBalanceSign = (({ patient, isNewPatient }) => {

    const isBalance = (patient?.balance?.value && patient?.balance?.value !== "0.00") ? true : false
    
    return (
        <Box sx={{ display: "flex", flexWrap: "nowrap", justifyContent: "end", alignItems: "center" }}>
            {isNewPatient &&
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        color: "primary.white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: getNewPatientIconColor(patient.source?.name),
                        ml: 0.5,
                        border: "1px solid",
                        borderColor: "primary.white"
                    }}
                >
                    <Typography variant="button" sx={{ fontSize: 12 }}>
                        Н
                    </Typography>
                </Box>
            }
            {isBalance &&
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        color: "primary.white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "primary.deepRed3",
                        ml: 0.5,
                        border: "1px solid",
                        borderColor: "primary.white"
                    }}
                >
                    <Typography variant="button" sx={{ fontSize: 12 }}>
                        !
                    </Typography>
                </Box>
            }
            {patient?.isPrepaidService &&
                <Box
                    sx={{
                        width: 16,
                        height: 16,
                        color: "primary.white",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "primary.lightred",
                        ml: 0.5,
                        border: "1px solid",
                        borderColor: "primary.white"
                    }}
                >
                    <Typography variant="button" sx={{ fontSize: 12 }}>
                    {'\u20BD'}
                    </Typography>
                </Box>
            }
        </Box>

    )

});

export default PatientIsNewAndBalanceSign