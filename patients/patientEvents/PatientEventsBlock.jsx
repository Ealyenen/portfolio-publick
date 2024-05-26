import React, { useEffect } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Badge, Fab, Typography } from "@mui/material"
import PatientEventsBlockStore from '../store/patientEventsBlock.store';
import EventsFiltersModalStore from '../eventsFiltersModal/store/eventsFiltersModal.store';
import ButtonMain from '../../../_components/UI/Buttons/ButtonMain';
import NavStore from '../../../_components/Layouts/auth-layout/stores/nav.store';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import PatientEventFiltersHint from './components/FiltersHintPopper';
import EventsBlocksWrap from './components/blocks/EventsBlocksWrap';
import PatientEventsStore from '../store/patinetEvents.store';
import DownloadPhotoModal from './components/DownloadInfoRecordImgModal/DownloadPhotoModal';
import { StoreDownLoadModal } from './components/DownloadInfoRecordImgModal/store/download.photo.store';
import StoreGalleryModal from './components/GalleryModal/store/galleryModal.store';
import GalleryModal from './components/GalleryModal/GalleryModal';
import { StorePhotoFastCommentModal } from './components/PhotoFastCommentModal/store/PhotoFastCommentModal.store';
import PhotoFastCommentModal from './components/PhotoFastCommentModal/PhotoFastCommentModal';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CallEditModalStore from './components/CallEdit/store/callEdit.store';
import CallEditModal from './components/CallEdit/CallEditModal';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SheduleEditModalStore from './components/sheduleEdit/store/sheduleEdit.store';
import SheduleEditModal from './components/sheduleEdit/SheduleEditModal';

const PatientEventsBlock = provider(StoreDownLoadModal, StoreGalleryModal, StorePhotoFastCommentModal, CallEditModalStore, SheduleEditModalStore)(observer(() => {
    const patientEventsBlockStore = useInstance(PatientEventsBlockStore)
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)
    const patientEventsStore = useInstance(PatientEventsStore)
    const storeDownLoadModal = useInstance(StoreDownLoadModal)
    const storeGalleryModal = useInstance(StoreGalleryModal)
    const storePhotoFastCommentModal = useInstance(StorePhotoFastCommentModal)
    const callEditModalStore = useInstance(CallEditModalStore)
    const sheduleEditModalStore = useInstance(SheduleEditModalStore)
    const nav = useInstance(NavStore)

    useEffect(() => {
        const viewFiltersBtnPlace = () => {
            const btnElement = document?.getElementById("filters-btn")
            const rect = btnElement?.getBoundingClientRect()
            if (rect?.top < 0) {
                patientEventsBlockStore.setIsFiltersBtnHierViewSpace(true)
            } else patientEventsBlockStore.setIsFiltersBtnHierViewSpace(false)
        }
        window.addEventListener("scroll", viewFiltersBtnPlace)
        return () => {
            window.removeEventListener("scroll", viewFiltersBtnPlace)
        }
    }, [])

    const handleOpenFilters = () => {
        eventsFiltersModalStore.setOpenFiltersModal(true)
    }

    const handleResetFilters = () => {
        patientEventsBlockStore.resetSelections()
        eventsFiltersModalStore.resetSelections()
        patientEventsBlockStore.setRequestEvents(true)
        eventsFiltersModalStore.setIsLookingForAnalize(false)
    }

    const handleMouseEnterFab = (e) => {
        patientEventsBlockStore.setPopperAnchor(e.target)
    }

    const handleMouseLeaveFab = () => {
        patientEventsBlockStore.setPopperAnchor(null)
    }

    const handleStartAgain = () => {
        patientEventsStore.searchAgain()
    }

    const handleGoTop = () => {
        patientEventsStore.searchAgain()
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }, 100)
    }

    return (
        <>
            <Fab
                onClick={handleGoTop}
                color="info"
                size="small"
                aria-label="add"
                sx={{
                    position: "fixed",
                    top: 100,
                    left: { xs: 10, md: nav.drawerWidth + 48 },
                    display: patientEventsBlockStore.getIsFiltersBtnHierViewSpace() ? "block" : "none",
                }}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <ExpandLessIcon />
                    </Box>
            </Fab>
            <Fab
                onMouseEnter={handleMouseEnterFab}
                onMouseLeave={handleMouseLeaveFab}
                onClick={handleOpenFilters}
                color="info"
                size="small"
                aria-label="add"
                sx={{
                    position: "fixed",
                    top: 150,
                    left: { xs: 10, md: nav.drawerWidth + 48 },
                    display: patientEventsBlockStore.getIsFiltersBtnHierViewSpace() ? "block" : "none",
                }}>
                <Badge badgeContent={patientEventsBlockStore.customFiltersCount} color="secondary">
                    <FilterListIcon />
                </Badge>
            </Fab>
            <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
                <Badge badgeContent={patientEventsBlockStore.customFiltersCount} color="secondary">
                    <ButtonMain
                        id={"filters-btn"}
                        title={"Фильтры"}
                        icon={<FilterListIcon />}
                        onClick={handleOpenFilters}
                    />
                </Badge>
                {patientEventsBlockStore.countAreOptionsCustomedBoolean &&
                    <ButtonMain
                        title={"Сбросить фильтры"}
                        icon={<FilterListOffIcon />}
                        onClick={handleResetFilters}
                    />
                }
                {patientEventsStore.getEvents() &&
                    <ButtonMain
                        title={"Повторить поиск"}
                        onClick={handleStartAgain}
                        icon={<RestartAltIcon />}
                    />
                }
                {patientEventsStore.getEventsQty() > 0 &&
                    <Typography variant={"h6"}>
                        Найдено элементов: {patientEventsStore.getEventsQty()}
                    </Typography>
                }
                {patientEventsStore.getEventsQty() === 0 && !patientEventsStore.getIsLoading() &&
                    <Typography variant={"h6"}>
                        По вашему запросу элементы не найдены
                    </Typography>
                }
            </Box>
            {patientEventsBlockStore.getPopperAnchor() && <PatientEventFiltersHint />}
            <EventsBlocksWrap />
            {storeDownLoadModal.modal && <DownloadPhotoModal />}
            {storeGalleryModal.openModal && <GalleryModal />}
            {storePhotoFastCommentModal.openModal && <PhotoFastCommentModal />}
            {callEditModalStore.openModal && <CallEditModal />}
            {sheduleEditModalStore.getOpenModal() && <SheduleEditModal />}
        </>
    );
}));
export default PatientEventsBlock;