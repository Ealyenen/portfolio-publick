import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import SmallDragableModal from './smallDragableModal/SmallDragableModal';
import FullScreenModal from './fullModal/FullScreeModal';
import { useInstance, provider } from "react-ioc";
import MemoryAppointmentStore from './store/MemoryAppointmentStore.store';
import { useMediaQuery, useTheme } from "@mui/material"
import MobileMemoryModal from './MobileModal.jsx/MobileMemoryModal';
import MemoryAppointmentDataStore from './store/MemoryAppointmentDataStore.store';
import StoreGalleryModal from './GalleryModal/store/galleryModal.store'
import GalleryModal from './GalleryModal/GalleryModal';

const MemoryAppointmentModal = provider(MemoryAppointmentDataStore, StoreGalleryModal)(observer(() => {
    const memoryAppointmentStore = useInstance(MemoryAppointmentStore)
    const memoryAppointmentDataStore = useInstance(MemoryAppointmentDataStore)
    const storeGalleryModal = useInstance(StoreGalleryModal)

    useEffect(() => {
        memoryAppointmentDataStore.requestAppointments()
    }, [])

    useEffect(() => {
        if (memoryAppointmentStore.getUpdateAppointments()) {
            memoryAppointmentDataStore.requestAppointments().then(() => {
                const prevAppWatchingId = memoryAppointmentStore.getAppointmentWatchingId()
                if (prevAppWatchingId) {
                    const newIndex = memoryAppointmentDataStore.appointments?.findIndex((app) => app?.appointmentId === prevAppWatchingId)
                    if (newIndex > -1) {
                        memoryAppointmentStore.setAppointmentIndex(newIndex)
                    } else memoryAppointmentStore.setAppointmentIndex(0)
                } else memoryAppointmentStore.setAppointmentIndex(0)
                memoryAppointmentStore.setUpdateAppointments(false)
            })
        }
    }, [memoryAppointmentStore.getUpdateAppointments()])

    const mainTheme = useTheme();
    const mobileBreakpointSm = useMediaQuery(mainTheme.breakpoints.down("md"));

    return (
        <>
            {mobileBreakpointSm ?
                <MobileMemoryModal />
                :
                <>
                    {memoryAppointmentStore.getMode() === "base" && <FullScreenModal />}
                    {memoryAppointmentStore.getMode() === "drag" && <SmallDragableModal />}
                </>
            }
            {storeGalleryModal.getOpenModal() && <GalleryModal />}
        </>
    );
}));

export default MemoryAppointmentModal;
