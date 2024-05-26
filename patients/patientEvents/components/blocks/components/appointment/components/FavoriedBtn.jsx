import React, { useEffect, useState } from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import AppointmentStore from '../store/appointment.store';
import ButtonMain from "../../../../../../../../_components/UI/Buttons/ButtonMain"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import PatientStore from '../../../../../../store/patient.store';
import MemoryAppointmentStore from '../../../../../../memoryAppointment/store/MemoryAppointmentStore.store';

const FavoriedBtn = observer(() => {
    const store = useInstance(AppointmentStore)
    const patientStore = useInstance(PatientStore)
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

    const [icon, setIcon] = useState(<BookmarkAddOutlinedIcon />)

    const countIcon = () => {
        const favoried = localStorage.getItem('appointmentsList')
        if (favoried) {
            const appointmentsList = JSON.parse(favoried)
            if (appointmentsList.includes(store.getAppointment()?.appointmentId)) {
                setIcon(<BookmarkIcon />)
            } else {
                setIcon(<BookmarkAddOutlinedIcon />)
            }
        }else{
            setIcon(<BookmarkAddOutlinedIcon />)
        }
    }

    useEffect(() => {
        countIcon()
    }, [])

    useEffect(() => {
        countIcon()
    }, [patientStore.getAppointmentInMemoryQty()])

    const handleFavoriteClick = () => {
        const favoried = localStorage.getItem('appointmentsList')
        if (favoried) {
            const appointmentsList = JSON.parse(favoried)
            if (!appointmentsList.includes(store.getAppointment()?.appointmentId)) {
                if (appointmentsList?.length < patientStore.getMemoryAppointmentsLimit()) {
                    const newFavoried = [...appointmentsList, store.getAppointment()?.appointmentId]
                    localStorage.setItem('appointmentsList', JSON.stringify(newFavoried))
                    patientStore.setAppointmentInMemoryQty(newFavoried?.length || null)
                    setIcon(<BookmarkIcon />)
                } else {
                    alert("Достигнуто максимальное количество приемов в закладках.")
                    setIcon(<BookmarkAddOutlinedIcon />)
                }
            } else {
                const newFavoried = appointmentsList.filter((e) => e !== store.getAppointment()?.appointmentId)
                localStorage.setItem('appointmentsList', JSON.stringify(newFavoried))
                patientStore.setAppointmentInMemoryQty(newFavoried?.length || null)
                setIcon(<BookmarkAddOutlinedIcon />)
            }
        } else {
            localStorage.setItem('appointmentsList', JSON.stringify([store.getAppointment()?.appointmentId]))
            patientStore.setAppointmentInMemoryQty(1)
            setIcon(<BookmarkIcon />)
        }
        memoryAppointmentStore.setUpdateAppointments(true)
    }

    return (
        <ButtonMain
            icon={icon}
            onClick={handleFavoriteClick}
        />
    );
});

export default FavoriedBtn;