import React, { useEffect } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Grid, useTheme, useMediaQuery, Box, Typography } from "@mui/material"
import PatientEventsBlockStore from '../store/patientEventsBlock.store';
import EventsFiltersModalStore from './store/eventsFiltersModal.store';
import BaseModal from '../../../_components/UI/modals/BaseModal';
import Blocks from './components/Blocks';
import TimeLapse from './components/TimeLapse';
import ButtonMain from '../../../_components/UI/Buttons/ButtonMain';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import SearchDirection from './components/SearchDirection';
import PatientEventsStore from '../store/patinetEvents.store';

const EventsFiltersModal = provider()(observer(() => {
    const patientEventsBlockStore = useInstance(PatientEventsBlockStore)
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)
    const patientEventsStore = useInstance(PatientEventsStore)
    // const mainTheme = useTheme();
    // const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("md"));

    const handleSaveModal = () => {
        eventsFiltersModalStore.checkDates().then((ok) => {
            if (ok) {
                patientEventsBlockStore.setFilters(
                    eventsFiltersModalStore.getAppointmentFilter(),
                    eventsFiltersModalStore.getCallsFilter(),
                    eventsFiltersModalStore.getSmsFilter(),
                    eventsFiltersModalStore.getInfoBlockFilter(),
                    eventsFiltersModalStore.getPrepaymentFilter(),
                    eventsFiltersModalStore.getSheduleRecordsFilter(),
                    eventsFiltersModalStore.getUseTimeLapse(),
                    eventsFiltersModalStore.getDateFrom(),
                    eventsFiltersModalStore.getDateTo(),
                    eventsFiltersModalStore.getSearchDirection(),
                )
                patientEventsStore.searchAgain()
                eventsFiltersModalStore.setIsLookingForAnalize(false)
                eventsFiltersModalStore.setOpenFiltersModal(false)
            }
        })
    }

    const handleCloseModal = () => {
        const filtersReset = patientEventsBlockStore.getFilters()
        eventsFiltersModalStore.setAppointmentFilterValue(filtersReset.appointment)
        eventsFiltersModalStore.setCallsFilterValue(filtersReset.calls)
        eventsFiltersModalStore.setSmsFilterValue(filtersReset.sms)
        eventsFiltersModalStore.setInfoBlockFilterValue(filtersReset.infoBlock)
        eventsFiltersModalStore.setPrepaymentFilterValue(filtersReset.prepayment)
        eventsFiltersModalStore.setSheduleRecordsFilterValue(filtersReset.sheduleRecords)
        eventsFiltersModalStore.setSearchDirection(filtersReset.searchDirection)
        eventsFiltersModalStore.setDateFrom(filtersReset.dateFrom)
        eventsFiltersModalStore.setDateTo(filtersReset.dateTo)
        eventsFiltersModalStore.setUseTimelapseValue(filtersReset.useTimeLapse)
        eventsFiltersModalStore.setOpenFiltersModal(false)
    }

    const handleResetFilters = () => {
        eventsFiltersModalStore.resetSelections()
    }

    return (
        <BaseModal
            saveClick={handleSaveModal}
            onClose={handleCloseModal}
            onSa
            open={eventsFiltersModalStore.getOpenFiltersModal()}
            fullWidth={true}
            title={"Фильтры"}
            saveTitle='Поиск'
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        pr: 2,
                        borderRight: { xs: "none", md: "1px solid" },
                        borderColor: { xs: "none", md: "primary.light2" },
                        mb: { xs: 4, md: 0 }
                    }}>
                    <Blocks />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ pl: 2, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 4 }}
                >
                    <Box>
                        <TimeLapse />
                        <SearchDirection />
                    </Box>
                    <Box>
                        {eventsFiltersModalStore.countAreOptionsCustomedBoolean &&
                            <ButtonMain
                                title={"Сбросить фильтры"}
                                icon={<FilterListOffIcon />}
                                onClick={handleResetFilters}
                            />
                        }
                        {eventsFiltersModalStore.getIsLookingForAnalize() &&
                            <Typography variant="caption" sx={{display: "block", mt: 1}}>
                                *Был произведен поиск приема по анализу. Данный поиск не учитывает другие параметры.
                            </Typography>
                        }
                    </Box>

                </Grid>
            </Grid>
        </BaseModal>
    );
}));
export default EventsFiltersModal;