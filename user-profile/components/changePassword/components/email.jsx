import React from 'react';
import { Typography, Box } from "@mui/material";
import authStore from '../../../../../_common/stores/auth.store';

const Email = () => {
    return (
        <Box sx={{
            mt: 3,
            borderBottom: "1px solid",
            pb: 1,
            borderColor: "primary.light4"
        }}>
            <Typography sx={{ display: "inline", color: "primary.main" }} variant="h6">
                Электронная почта:
            </Typography>
            <Typography sx={{ display: "inline" }}>
                {" "}{authStore.user.email}
            </Typography>
        </Box>
    );
};

export default Email;