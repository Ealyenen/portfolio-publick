import React from 'react';
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import MemoryAppointmentStore from '../store/MemoryAppointmentStore.store';
import { useInstance } from "react-ioc";
import SlideUpModal from '../../../../_components/UI/modals/SlideUpModal';
import Appointment from './appointment/Appointment'
import CircularProgress from '@mui/material/CircularProgress';
import ActionBar from './ActionBar/ActionBar';
import MemoryAppointmentDataStore from '../store/MemoryAppointmentDataStore.store';
import MenuBar from './ActionBar/components/Menu';

const MobileMemoryModal = observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const dataStore = useInstance(MemoryAppointmentDataStore)


    const handleClose = () => {
        memoryAppointmentStore.setOpenModal(false)
    }

    return (
        <SlideUpModal
            open={memoryAppointmentStore.getOpenModal()}
            closeClick={handleClose}
            title="Запомненные приемы"
            isBtnSave={false}
        >
            <ActionBar />
            {memoryAppointmentStore.getOpenMobileMenu() ?
                <MenuBar />
                :
                <Box>
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
                    <Box sx={{ overflowY: "scroll" }}>
                        {!dataStore.getLoading() && !dataStore.getError() && dataStore.appointments &&
                            <>
                                {dataStore.appointments &&
                                    <>
                                        {dataStore.appointments?.length > 0 ?
                                            <Appointment appointment={dataStore.appointments[memoryAppointmentStore.getAppointmentIndex()]} />
                                            :
                                            <Typography variant="h6" sx={{textAlign: "center", mt: 4}}>
                                                Нет запомненных пориемов
                                            </Typography>
                                        }
                                    </>
                                }
                            </>
                        }
                    </Box>
                </Box>
            }
        </SlideUpModal>
    );
})

export default MobileMemoryModal