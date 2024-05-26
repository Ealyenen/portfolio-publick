import React from 'react';
import { Typography, Box } from "@mui/material";
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import { useInstance } from "react-ioc";
import PasswordViewStore from '../../../store/password.view.store';
import PasswordStore from '../../../store/password.store';
import { observer } from "mobx-react-lite"


const PasswordClosed = observer(() => {
    const passwordStore = useInstance(PasswordStore)
    const passwordViewStore = useInstance(PasswordViewStore)

    const handleEditClick = () => {
        passwordViewStore.setEditMode(true)
        passwordStore.resetMutationAnswer()
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box>
                <Typography sx={{ display: "inline", color: "primary.main", mr: 1 }} variant="h6">
                    Пароль
                </Typography>
                <Typography sx={{ display: "inline", color: passwordStore.getSuccess() ? "primary.deepGreen2" : "primary.lightred" }}>
                    {" "}{passwordStore.getRequestMsg()}
                </Typography>
            </Box>
            <ButtonMain
                title={"Изменить"}
                onClick={handleEditClick}
            />
        </Box>
    );
});

export default PasswordClosed;