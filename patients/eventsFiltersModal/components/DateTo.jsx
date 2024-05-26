import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { TextField, Box, IconButton, Typography } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import EventsFiltersModalStore from '../store/eventsFiltersModal.store';
import CloseIcon from '@mui/icons-material/Close';

const DateTo = observer(() => {
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)

    const handleSetDateTo = (value) => {
        eventsFiltersModalStore.setDateTo(value)
    }

    const handleResetDateTo = () => {
        eventsFiltersModalStore.setDateTo(null)
    }

    const countHintOutput = () => {
        return (!eventsFiltersModalStore?.getDateTo() && eventsFiltersModalStore?.getDateFrom()) ? true : false
    }

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <MobileDatePicker
                    label="до"
                    inputFormat="DD.MM.yyyy"
                    views={['year', 'month', 'day']}
                    value={eventsFiltersModalStore?.getDateTo() || null}
                    onChange={(newValue) => handleSetDateTo(newValue)}
                    closeOnSelect={true}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            size="small"
                            focused
                            fullWidth
                        />}
                />
                {eventsFiltersModalStore?.getDateTo() &&
                    <IconButton onClick={handleResetDateTo} color="primary">
                        <CloseIcon />
                    </IconButton>
                }
            </Box>
            {countHintOutput() &&
                <Typography variant="caption">
                    *поиск будет осуществлен до последнего события
                </Typography>
            }
        </Box>
    );
});
export default DateTo;