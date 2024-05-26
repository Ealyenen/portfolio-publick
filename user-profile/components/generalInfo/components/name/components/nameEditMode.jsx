import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormHelperText, FormControl } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreGeneralInfo from '../../../store/generalnfo.store';
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import GeneralViewStore from '../../../store/generalInfo.view.store';


const NameEditMode = (() => {
    const storeGeneralInfo = useInstance(StoreGeneralInfo)
    const generalViewStore = useInstance(GeneralViewStore)
    const [lastName, setLastName] = useState(storeGeneralInfo.getLastName())
    const [firstName, setFirstName] = useState(storeGeneralInfo.getFirstName())
    const [patronymic, setPatronymic] = useState(storeGeneralInfo.getPatronymic())
    const [lastNameError, setLastNameError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameSpace, setLastNameSpace] = useState(false)
    const [firstNameSpace, setFirstNameSpace] = useState(false)
    const [patronymicSpace, setPatronymicSpace] = useState(false)

    const handleChangeLastName = (str) => {
        if (str.length === 0) {
            setLastNameError(true)
        } else {
            setLastNameError(false)
        }
        if (!str.includes(" ")) {
            setLastName(str)
            setLastNameSpace(false)
        } else {
            setLastNameSpace(true)
        }
    }

    const handleChangeFirstName = (str) => {
        if (str.length === 0) {
            setFirstNameError(true)
        } else {
            setFirstNameError(false)
        }
        if (!str.includes(" ")) {
            setFirstName(str)
            setFirstNameSpace(false)
        } else {
            setFirstNameSpace(true)
        }
    }

    const handleChangePatronymic = (str) => {
        if (!str.includes(" ")) {
            setPatronymic(str)
            setPatronymicSpace(false)
        } else {
            setPatronymicSpace(true)
        }
    }

    const handleCancelClick = () => {
        generalViewStore.setNameEditMode(false)
    }

    const handleSaveClick = () => {
        setLastNameError(false)
        setFirstNameError(false)
        if (lastName?.length > 0 && firstName?.length > 0) {
            storeGeneralInfo.setNewName(lastName, firstName, patronymic)
            generalViewStore.setNameEditMode(false)
        }
        if (!lastName || lastName?.length === 0) {
            setLastNameError(true)
        }
        if (!firstName || firstName?.length === 0) {
            setFirstNameError(true)
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControl sx={{minWidth: 260}}>
                    <TextField
                        error={lastNameError}
                        label={"Фамилия*"}
                        value={lastName}
                        size="small"
                        onChange={(e) => handleChangeLastName(e.target.value)}
                    />
                    {lastNameSpace && <FormHelperText>Фамилия не должна содержать пробелов</FormHelperText>}
                </FormControl>
                <FormControl sx={{minWidth: 260}}>
                    <TextField
                        error={firstNameError}
                        label={"Имя*"}
                        value={firstName || ""}
                        size="small"
                        onChange={(e) => handleChangeFirstName(e.target.value)}
                    />
                    {firstNameSpace && <FormHelperText>Имя не должно содержать пробелов</FormHelperText>}
                </FormControl>
                <FormControl sx={{minWidth: 260}}>
                    <TextField
                        label={"Отчество"}
                        value={patronymic || ""}
                        size="small"
                        onChange={(e) => handleChangePatronymic(e.target.value)}
                    />
                    {patronymicSpace && <FormHelperText>Отчество не должно содержать пробелов</FormHelperText>}
                </FormControl>
            </Box>
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
});

export default NameEditMode;