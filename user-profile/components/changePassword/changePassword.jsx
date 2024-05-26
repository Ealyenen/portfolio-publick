import React from 'react';
import { Typography, Box } from "@mui/material";
import { provider } from "react-ioc";
import Email from './components/email';
import Password from './components/password/password';
import PasswordViewStore from './store/password.view.store';
import PasswordStore from './store/password.store';

const PasswordChange = provider(PasswordViewStore, PasswordStore)(() => {

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h5">
                Безопасность
            </Typography>
            <Email/>
            <Password/>
        </Box>
    );
});

export default PasswordChange;