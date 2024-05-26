import React from 'react';
import { Typography, Box } from "@mui/material";
import { observer } from "mobx-react-lite"
import { useInstance } from "react-ioc";
import PasswordClosed from './components/passwordClosed';
import PasswordEditMode from './components/passwordEditMode';
import PasswordViewStore from "../../store/password.view.store"

const Password = observer(() => {
    const passwordViewStore = useInstance(PasswordViewStore)

    return (
        <Box sx={{
            mt: 2,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}
        >
            {passwordViewStore.getEditMode() ?
                <PasswordEditMode />
                :
                <PasswordClosed />
            }


        </Box>
    );
});

export default Password;