import React from 'react';
import MemoryAppointmentStore from '../../store/MemoryAppointmentStore.store';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import MemoryAppointmentDataStore from '../../store/MemoryAppointmentDataStore.store';
import { Paper, ButtonGroup, Divider, Box } from "@mui/material"
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';
import CloseIcon from '@mui/icons-material/Close';
import { SurnameAndInitialsString } from '../../../../../_common/helpers/nameGenerationString';
import moment from "moment"

const ActionBar = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)

    const handleChangeMode = () => {
        memoryAppointmentStore.changeModeToDrag()
    }

    const generateAppointmentTitle = (appointment) => {
        if (appointment?.patient) {
            const name = SurnameAndInitialsString(appointment?.patient?.lastName, appointment?.patient?.firstName, appointment?.patient?.patronymic)
            const appointmentDate = appointment.date ? " " + moment(appointment.date).format("DD.MM.YYYY") : ""
            const appointmentTime = appointment.timeStart ? " в " + appointment?.timeStart?.slice(0, 5) : ""
            return name + appointmentDate + appointmentTime
        }
    }

    const handleRemoveAppointment = (id) => {
        dataStore.removeAppointmentById(id)
    }

    const handleScrollToAppointment = (id) => {
        const appBlock = document.getElementById(`memory-app-${id}`)
        const appContainer = document.getElementById("memory-app-container")
        if (appBlock && appContainer) {
            appContainer.scrollTop = appBlock.offsetTop - 100
        }
    }

    const handleRemovaAllApp = () => {
        dataStore.removeAllAppointments()
        memoryAppointmentStore.setOpenModal(false)
    }

    return (
        <Paper sx={{ width: 400, p: 3, display: "flex", flexDirection: "column", gap: 2, height: "100%", overflowY: "scroll" }}>
            <ButtonMain
                title="Поменять форму"
                fullWidth
                onClick={handleChangeMode}
            />
            <Divider />
            {
                dataStore.appointments?.map((appointment, index) => {
                    return (
                        <Box key={appointment?.appointmentId}>
                            {(index - 1 !== -1 && appointment?.patient?.id !== dataStore.appointments[index - 1]?.patient?.id) &&
                                <Divider sx={{ mb: 2 }} />
                            }
                            <ButtonGroup sx={{ width: "100%" }}>
                                <ButtonMain
                                    title={generateAppointmentTitle(appointment)}
                                    fullWidth
                                    onClick={() => handleScrollToAppointment(appointment?.appointmentId)}
                                />
                                <ButtonMain
                                    onClick={() => handleRemoveAppointment(appointment?.appointmentId)}
                                    icon={<CloseIcon />}
                                />
                            </ButtonGroup>
                        </Box>

                    )
                })
            }
            <Divider />
            {dataStore.appointments?.length > 0 &&
                <ButtonMain
                    title={"Забыть все приемы"}
                    fullWidth
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={handleRemovaAllApp}
                />
            }
        </Paper>
    );
})

export default ActionBar