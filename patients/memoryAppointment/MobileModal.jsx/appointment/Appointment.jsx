import React, { useEffect } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material"
import AppointmentStore from './store/appointment.store';
import Header from './components/Header';
import AppointmentBody from './components/AppointmentBody';

const Appointment = provider(AppointmentStore)(observer(({ appointment }) => {
    const store = useInstance(AppointmentStore)
    
    useEffect(() => {
        store.setAppointment(appointment)
    }, [appointment])

    return (
        <Box sx={{ bgcolor: "primary.light3" }} id={appointment?.appointmentId}>
            <Header />
            <AppointmentBody />
        </Box>
    );
}));

export default Appointment;