import React, { useState } from 'react';
import { Box, ButtonGroup, Typography } from "@mui/material";
import { useInstance } from "react-ioc";
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import PasswordViewStore from '../../../store/password.view.store';
import PasswordStore from '../../../store/password.store';
import OldPassword from './oldPassword';
import NewPassword from './newPassword';
import RepeatNewPassword from './repeatNewPassword';
import GeneratePassword from './generatePassword';
import { observer } from "mobx-react-lite"


const PasswordEditMode = observer(() => {
    const passwordViewStore = useInstance(PasswordViewStore)
    const passwordStore = useInstance(PasswordStore)

    const handleCancelClick = () => {
        passwordStore.resetStore()
        passwordViewStore.setEditMode(false)
        passwordViewStore.setSaveClicked(false)
    }

    const handleSaveClick = () => {
        passwordViewStore.setSaveClicked(true)
        passwordStore.saveNewPassword().catch((error) => {
            console.log("error in comp", error)
        }).then((data) => {
            if (data) {
                passwordStore.resetStore()
                passwordViewStore.setSaveClicked(false)
                passwordViewStore.setEditMode(false)
            }
        })
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 2 }}>
            <Box>
                <Box sx={{ mb: 2 }}>
                    <Typography sx={{ display: "inline", color: "primary.main", mr: 2 }} variant="h6">
                        Изменение пароля
                    </Typography>
                    {passwordStore.getRequestMsg() &&
                        <Typography sx={{ color: "primary.lightred", display: {xs: "block", sm: "inline"}, }}>
                            {passwordStore.getRequestMsg()}
                        </Typography>
                    }

                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <OldPassword />
                    <NewPassword />
                    <RepeatNewPassword />
                </Box>
                <GeneratePassword />
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                    *Пароль должен содержать не менее 6 символов. Обязательно должны быть использованы буква, символ и цифра.
                </Typography>
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

export default PasswordEditMode;