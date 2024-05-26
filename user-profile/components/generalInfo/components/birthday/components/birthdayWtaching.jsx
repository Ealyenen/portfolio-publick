import React from 'react';
import { observer } from "mobx-react-lite"
import { Typography, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../../../store/generalnfo.store';
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import moment from "moment"
import GeneralViewStore from '../../../store/generalInfo.view.store';


const BirthdayWatching = observer(() => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const generalViewStore = useInstance(GeneralViewStore)

    const date = storeGeneralInfo?.getBirthday()

    const handleEditClick = () => {
        generalViewStore.setBirthdayEditMode(true)
    }

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box>
                <Typography sx={{ display: "inline", color: "primary.main" }} variant="h6">
                    Дата рождения:
                </Typography>
                <Typography sx={{ display: "inline" }}>
                    {date && ` ${moment(date).format("DD.MM.YYYY")}`}
                </Typography>
            </Box>
            <ButtonMain
                title={"Изменить"}
                onClick={handleEditClick}
            />
        </Box>

    );
});

export default BirthdayWatching;