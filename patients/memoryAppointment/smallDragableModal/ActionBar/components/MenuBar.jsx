import React from 'react';
import { Box, Divider, ButtonGroup, Menu } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import moment from "moment"
import MemoryAppointmentStore from '../../../store/MemoryAppointmentStore.store';
import MemoryAppointmentDataStore from '../../../store/MemoryAppointmentDataStore.store';
import ButtonMain from '../../../../../../_components/UI/Buttons/ButtonMain';
import CloseIcon from '@mui/icons-material/Close';
import { SurnameAndInitialsString } from '../../../../../../_common/helpers/nameGenerationString';

const MenuBar = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)

    const handleClose = () => {
        memoryAppointmentStore.setOpenMenu(null)
    }

    const handleRemove = (id, index) => {
        dataStore.removeAppointmentById(id)
        if (dataStore.appointments[index - 1]?.appointmentId) {
            memoryAppointmentStore.setAppointmentWatchingId(dataStore.appointments[index - 1]?.appointmentId)
        }
        const newIndex = index - 1 > 0 ? (index+1<dataStore.appointments?.length ? index : dataStore.appointments?.length-1) : 0
        memoryAppointmentStore.setAppointmentIndex(newIndex)
        handleClose()
    }

    const handleChange = (id, index) => {
        memoryAppointmentStore.setAppointmentIndex(index)
        memoryAppointmentStore.setAppointmentWatchingId(id)
        handleClose()
    }

    const generateAppointmentTitle = (appointment) => {
        if (appointment?.patient) {
            const name = SurnameAndInitialsString(appointment?.patient?.lastName, appointment?.patient?.firstName, appointment?.patient?.patronymic)
            const appointmentDate = appointment.date ? " " + moment(appointment.date).format("DD.MM.YYYY") : ""
            const appointmentTime = appointment.timeStart ? " в " + appointment?.timeStart?.slice(0, 5) : ""
            return name + appointmentDate + appointmentTime
        }
    }

    const handleRemovaAllApp = () => {
        dataStore.removeAllAppointments()
        handleClose()
        memoryAppointmentStore.setOpenModal(false)
    }

    return (
        <Menu
            id="basic-menu"
            anchorEl={memoryAppointmentStore.getOpenMenu()}
            open={memoryAppointmentStore.getOpenMenu() ? true : false}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{ zIndex: 9999, maxHeight: 600 }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                {
                    dataStore.appointments?.map((appointment, index) => {
                        return (
                            <Box key={appointment?.appointmentId}>
                                {(index - 1 !== -1 && appointment?.patient?.id !== dataStore.appointments[index - 1]?.patient?.id) &&
                                    <Divider sx={{mb: 2}}/>
                                }
                                <ButtonGroup sx={{ width: "100%" }}>
                                    <ButtonMain
                                        title={generateAppointmentTitle(appointment)}
                                        fullWidth
                                        onClick={() => handleChange(appointment?.appointmentId, index)}
                                    />
                                    <ButtonMain
                                        onClick={() => handleRemove(appointment?.appointmentId, index)}
                                        icon={<CloseIcon />}
                                    />
                                </ButtonGroup>
                            </Box>
                        )
                    })}
                <Divider />
                {dataStore.appointments?.length > 0 &&
                    <Box>
                        <ButtonMain
                            title={"Забыть все приемы"}
                            fullWidth
                            color="error"
                            onClick={handleRemovaAllApp}
                        />
                    </Box>
                }
            </Box>

        </Menu>
    )
})

export default MenuBar