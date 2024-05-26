import React from 'react';
import { Box, Typography } from "@mui/material"
import MemoryAppointmentStore from '../store/MemoryAppointmentStore.store';
import { useInstance } from "react-ioc";
import DragableModal from '../../../../_components/UI/modals/DragableModal';
import MemoryAppointmentDataStore from '../store/MemoryAppointmentDataStore.store';
import Appointment from './appointment/Appointment'
import CircularProgress from '@mui/material/CircularProgress';
import { observer } from "mobx-react-lite";
import ActionBar from './ActionBar/ActionBar';
import MenuBar from './ActionBar/components/MenuBar';

const SmallDragableModal = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)

    const handleClose = () => {
        memoryAppointmentStore.setOpenModal(false)
    }

    return (
        <>
            <DragableModal
                openModal={memoryAppointmentStore.getOpenModal()}
                handleClose={handleClose}
                headerTitle="Запомненные приемы"
                hideSave
                maxWidth="md"
                draggableId="memory-appintments-modal"
            >
                <ActionBar appointment={dataStore.appointments[memoryAppointmentStore.getAppointmentIndex()]} />
                <Box sx={{ p: 4, pt: 2 }}>
                    {dataStore.getLoading() &&
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 100 }}>
                            <CircularProgress />
                        </Box>
                    }
                    {dataStore.getError() &&
                        <Typography variant="h5" sx={{ textAlign: "center", mt: 10 }}>
                            Произошла ошибка при попытке подкгрузить приемы
                        </Typography>
                    }
                    <Box sx={{ maxHeight: 600, overflowY: "scroll" }}>
                        {!dataStore.getLoading() && !dataStore.getError() && dataStore.appointments &&
                            <>
                                {dataStore.appointments &&
                                    <>
                                        {dataStore.appointments?.length > 0 ?
                                            <Appointment appointment={dataStore.appointments[memoryAppointmentStore.getAppointmentIndex()]} />
                                            :
                                            <Typography variant="h6" sx={{textAlign: "center", mt:2}}>
                                                Нет выбранных приемов
                                            </Typography>
                                        }
                                    </>
                                }
                            </>
                        }
                    </Box>
                </Box>
                {memoryAppointmentStore.getOpenMenu() && <MenuBar />}
            </DragableModal>
        </>
    );
})

export default SmallDragableModal