import React, { useEffect, useState } from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Typography, FormControlLabel, Checkbox, Box } from "@mui/material"
import EventsFiltersModalStore from '../store/eventsFiltersModal.store';
import DateFrom from './DateFrom';
import DateTo from './DateTo';

const TimeLapse = observer(() => {
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)

    const handleChangeUseTimeLapse = () => {
        eventsFiltersModalStore.setUseTimeLapse()
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">
                Диапазон поиска
            </Typography>
            <FormControlLabel control={<Checkbox onChange={handleChangeUseTimeLapse} checked={eventsFiltersModalStore.getUseTimeLapse()} />} label="Использовать диапазон" />
            {eventsFiltersModalStore.getUseTimeLapse() &&
                <>
                    <DateFrom />
                    <DateTo />
                </>

            }
        </Box>

    );
});
export default TimeLapse;