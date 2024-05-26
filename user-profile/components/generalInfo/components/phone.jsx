import React from 'react';
import { observer } from "mobx-react-lite"
import { Typography, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../store/generalnfo.store';
import { phoneMask } from "../../../../../_common/helpValues/inputParametrs"


const Phone = observer(() => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const phoneData = storeGeneralInfo?.getPhone() ? storeGeneralInfo?.getPhone() : ""
    const phone = phoneData ? phoneMask.reduce((accum, sign, index)=> {
        if (sign.source==="\\d"){
            if ([3, 4, 5].includes(index)) return accum + (phoneData[index-2] ? phoneData[index-2] : "X")
            if ([8, 9, 10].includes(index)) return accum + (phoneData[index-4] ? phoneData[index-4] : "X")
            if ([12, 13].includes(index)) return accum + (phoneData[index-5] ? phoneData[index-5] : "X")
            if ([15, 16].includes(index)) return accum + (phoneData[index-6] ? phoneData[index-6] : "X")
        }
        return accum + sign
    }) : "отсутствует"
    
    return (
        <Box sx={{
            mt: 3,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}
        >
            <Typography sx={{ display: "inline", color: "primary.main" }} variant="h6">
                Телефон:
            </Typography>
            <Typography sx={{ display: "inline" }}>
                {" "}{phone}
            </Typography>
        </Box>
    );
});

export default Phone;