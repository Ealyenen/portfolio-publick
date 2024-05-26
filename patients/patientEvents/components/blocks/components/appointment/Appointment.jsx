import React, { useEffect } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, useTheme, useMediaQuery } from "@mui/material"
import AppointmentStore from './store/appointment.store';
import Header from './components/Header';
import AppointmentBody from './components/AppointmentBody';
import AppointmentMobileBody from "./components/AppointmentBodyMobile"

const Appointment = provider(AppointmentStore)(observer(({ appointment }) => {
    const store = useInstance(AppointmentStore)
    const mainTheme = useTheme();
    const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("md"));

    useEffect(() => {
        store.setAppointment(appointment)
    }, [appointment])

    useEffect(() => {
        store.setIsMobile(mobileBreakpoint)
    }, [mobileBreakpoint])

    return (
        <Box sx={{ bgcolor: "primary.light3" }} id={appointment?.appointmentId}>
            {store.getAppointment()?.appointmentId &&
                <>
                    <Header />
                    {mobileBreakpoint ?
                        <AppointmentMobileBody />
                        :
                        <AppointmentBody />
                    }
                </>
            }
        </Box>
    );
}));

export default Appointment;