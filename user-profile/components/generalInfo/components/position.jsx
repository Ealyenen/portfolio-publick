import React from 'react';
import { Typography, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../store/generalnfo.store';
import { observer } from "mobx-react-lite"


const Position = observer(() => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const isSpecialist = storeGeneralInfo.getIsSpecialist(),
        isAdministrator = storeGeneralInfo.getIsAdministrator(),
        isStudent = storeGeneralInfo.getIsStudent(),
        position = storeGeneralInfo.getPosition()?.name;

    const generatePositionString = () => {
        let str = ""
        if (isSpecialist) {
            str += " Специалист"
            if (isAdministrator) {
                str += ", Администратор"
                if (isStudent) {
                    str += ", Студент"
                }
            } else if (isStudent) {
                str += ", Студент"
            }
        } else if (isAdministrator) {
            str += " Администратор"
            if (isStudent) {
                str += ", Студент"
            }
        } else if (isStudent) {
            str += " Студент"
        }
        if (position){
            str += str.length>0 ? `, ${position}` : ` ${position}`
        }else if (str.length===0){
            str = " отсутствует"
        }
        return str
    }

    return (
        <Box sx={{
            mt: 3,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}>
            <Typography sx={{ display: "inline", color: "primary.main" }} variant="h6">
                Должность:
            </Typography>
            <Typography sx={{ display: "inline" }}>
                {generatePositionString()}
                {}
            </Typography>
        </Box>
    );
});

export default Position;