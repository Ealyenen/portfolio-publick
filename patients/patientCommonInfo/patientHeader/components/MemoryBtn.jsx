import React, { useEffect } from 'react';
import { Badge } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PatientStore from '../../../store/patient.store';
import MemoryAppointmentStore from '../../../memoryAppointment/store/MemoryAppointmentStore.store';

const MemoryBtn = observer(() => {
    const patientStore = useInstance(PatientStore)
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

    useEffect(() => {
        const updateMemoryQty = () => {
            const favoried = localStorage.getItem('appointmentsList')
            if (favoried) {
                const appointmentsList = JSON.parse(favoried)
                patientStore.setAppointmentInMemoryQty(appointmentsList?.length || null)
            }else patientStore.setAppointmentInMemoryQty(null)
        }
        updateMemoryQty()
    }, [])

    const handleAppointments = () => {
        memoryAppointmentStore.setOpenModal(true)
    }

    return (
        <Badge badgeContent={patientStore.getAppointmentInMemoryQty()} color="secondary">
            <ButtonMain
                disabled={!patientStore.getAppointmentInMemoryQty()}
                title="Приемы"
                icon={<BookmarkAddIcon />}
                mobileOnlyIcon
                onClick={handleAppointments}
            />
        </Badge>
    );
});

export default MemoryBtn;