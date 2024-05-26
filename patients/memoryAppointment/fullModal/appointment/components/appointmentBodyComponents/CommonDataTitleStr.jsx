import React from 'react';
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import AppointmentStore from '../../store/appointment.store';
import { useInstance } from "react-ioc";


const CommonDataTitleAndStr = observer(({ title = "", str = "" }) => {
    const store = useInstance(AppointmentStore)

    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "primary.light2",
                p: store.getIsMobile() ? 1 : 2,
                ml: 1,
                mr: 1
            }}
        >
            <Typography sx={{ display: "inline" }} variant="subtitle1">
                {title && title}:{" "}
            </Typography>
            <Typography sx={{ display: "inline" }}>
                {str && str}
            </Typography>
        </Box>
    );
});

export default CommonDataTitleAndStr;