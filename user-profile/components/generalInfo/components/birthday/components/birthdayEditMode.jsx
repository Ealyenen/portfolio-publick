import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormControl } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../../../store/generalnfo.store';
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import GeneralViewStore from '../../../store/generalInfo.view.store';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";


const BirthdayEditMode = () => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const generalViewStore = useInstance(GeneralViewStore)
    const [date, setDate] = useState(storeGeneralInfo?.getBirthday())

    const handleCancelClick = () => {
        generalViewStore.setBirthdayEditMode(false)
    }

    const handleSaveClick = () => {
        storeGeneralInfo.setNewBirthday(date)
        generalViewStore.setBirthdayEditMode(false)
    }

    const handleChangeDate = (date) => {
        setDate(date)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <FormControl sx={{ minWidth: 260 }} size="small" focused>
                <MobileDatePicker
                    label="Дата рождения"
                    inputFormat="DD.MM.yyyy"
                    views={['year', 'month', 'day']}
                    value={date && date}
                    onChange={(newValue) => handleChangeDate(newValue)}
                    renderInput={(params) => <TextField {...params} size="small" focused />}
                />
            </FormControl>

            <ButtonGroup>
                <ButtonMain
                    title={"Отмена"}
                    onClick={handleCancelClick}
                />
                <ButtonMain
                    title={"Сохранить"}
                    onClick={handleSaveClick}
                />
            </ButtonGroup>
        </Box>

    );
};

export default BirthdayEditMode;