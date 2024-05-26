import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import AppointmentStore from '../store/appointment.store';
import PersonIcon from '@mui/icons-material/Person';
import HeaderActions from './HeaderActions';
import moment from "moment"

const Header = observer(() => {
    const store = useInstance(AppointmentStore)

    return (
        <Box
            sx={{
                pl: 2,
                pr: 2,
                pt: 1,
                pb: 1,
                bgcolor: store.getAppointment()?.isDone ? "primary.halfGreen" : "primary.light2",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1
            }}
        >
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                <PersonIcon />
                {store.getAppointment()?.isDone ?
                    <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                        Завершенный прием
                    </Typography>
                    :
                    <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                        Прием
                    </Typography>
                }

                <Typography>
                    {store.getAppointment()?.date ? moment(store.getAppointment()?.date).format("DD.MM.YYYY") : ""}{" "}{store.getAppointment()?.timeStart?.slice(0, 5)} {store.getAppointment()?.isDone && <>- {store.getAppointment()?.timeEnd?.slice(0, 5)}</>}
                </Typography>
            </Box>
            <HeaderActions />
        </Box>
    );
});

export default Header;