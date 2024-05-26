import React from "react";
import { Box, Typography } from "@mui/material"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HintList = (() => {

    const HintItems = (text, icon) => {
        return (
            <Box sx={{ p: 1.6, display: "flex", gap: 2 }}>
                <Typography sx={{ color: "primary.main" }}>
                    {icon}
                </Typography>
                <Typography>
                    - {text}
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ p: 1 }}>
            {HintItems("Отправлено", <LocalShippingIcon />)}
            {HintItems("Ожидается", <HourglassEmptyIcon />)}
            {HintItems("Получено частично", <StarHalfIcon />)}
            {HintItems("Ответ получен", <CheckCircleIcon sx={{color: "primary.aquamarine"}}/>)}
            {HintItems("Нет ответа", <ErrorOutlineIcon sx={{color: "primary.lightred"}} />)}
        </Box>
    )

});

export default HintList