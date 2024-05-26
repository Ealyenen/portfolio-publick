import React, { useEffect } from 'react';
import { Badge, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PatientStore from '../../store/patient.store';
import MemoryAppointmentStore from '../../memoryAppointment/store/MemoryAppointmentStore.store';

const MemoryAppointmentsBtn = observer(() => {
    const patientStore = useInstance(PatientStore)
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

    const handleAppointments = (e) => {
        e.stopPropagation()
        memoryAppointmentStore.changeModeToDrag()
        memoryAppointmentStore.setOpenModal(true)
    }

    return (
        <IconButton
            disabled={!patientStore.getAppointmentInMemoryQty()}
            onClick={handleAppointments}
        >
            <BookmarkAddIcon />
        </IconButton>
    );
});

export default MemoryAppointmentsBtn;