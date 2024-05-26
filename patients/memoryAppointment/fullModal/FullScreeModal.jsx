import React from 'react';
import MemoryAppointmentStore from '../store/MemoryAppointmentStore.store';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import SlideUpModal from '../../../../_components/UI/modals/SlideUpModal';
import Appointment from "./appointment/Appointment"
import MemoryAppointmentDataStore from '../store/MemoryAppointmentDataStore.store';
import { Box, Typography } from "@mui/material"
import NameBeforAppointment from './components/NameBeforAppointment';
import ActionBar from './components/ActionBar';
import { FullPageFallbackProgress } from "../../../../_components/UI/preloaders/FullPageFallbackProgress"

const FullScreenModal = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)

    const handleClose = () => {
        memoryAppointmentStore.setOpenModal(false)
    }

    const outputPatientName = (appointment, index) => {
        if (index - 1 >= 0) {
            if (appointment?.patient?.id !== dataStore.appointments[index - 1]?.patient?.id) {
                return <NameBeforAppointment patient={appointment?.patient} />
            }
        } else {
            return <NameBeforAppointment patient={appointment?.patient} />
        }
    }

    return (
        <SlideUpModal
            open={memoryAppointmentStore.getOpenModal()}
            closeClick={handleClose}
            title="Запомненные приемы"
            isBtnSave={false}
        >
            {dataStore.getLoading() &&
                <FullPageFallbackProgress />
            }
            {dataStore.getError() &&
                <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
                    Произошла ошибка при попытке подкгрузить приемы
                </Typography>
            }
            {!dataStore.getLoading() && !dataStore.getError() && dataStore.appointments &&
                <>
                    {dataStore.appointments?.length > 0 ?
                        <Box sx={{ height: "100%", overflow: "hidden", display: "flex" }}>
                            <ActionBar />
                            <Box
                                id={"memory-app-container"}
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    height: "100%",
                                    overflowY: "scroll",
                                    p: 4
                                }}
                            >
                                {dataStore.appointments?.map((appointment, index) => {
                                    return (
                                        <Box key={appointment?.appointmentId}>
                                            {outputPatientName(appointment, index)}
                                            <Box id={`memory-app-${appointment?.appointmentId}`}>
                                                <Appointment appointment={appointment} key={appointment?.appointmentId} />
                                            </Box>
                                        </Box>
                                    )
                                })}

                            </Box>
                        </Box>
                        :
                        <Typography variant="h5" sx={{ textAlign: "center", mt:10 }}>
                            Нет запомненных приемов
                        </Typography>
                    }

                </>
            }
        </SlideUpModal>
    );
})

export default FullScreenModal