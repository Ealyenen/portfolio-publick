import React from 'react';
import { Box, Typography } from "@mui/material"
import { useInstance } from "react-ioc";
import ButtonMain from '../../../../../../_components/UI/Buttons/ButtonMain';
import MemoryAppointmentStore from '../../../store/MemoryAppointmentStore.store';

const ChangeModeBtn = () => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)

    const handleChangeMode = () => {
        memoryAppointmentStore.changeModeToBase()
    }

    return (
        <ButtonMain
            title="Поменять форму"
            onClick={handleChangeMode}
            color="inherit"
            variant='text'
            sx={{minWidth: 164}}
        />
    )

}

export default ChangeModeBtn