import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { TextField, IconButton, Box, Typography } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import EventsFiltersModalStore from '../store/eventsFiltersModal.store';
import CloseIcon from '@mui/icons-material/Close';

const DateFrom = observer(() => {
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)

    const handleSetDateFrom = (value) => {
        eventsFiltersModalStore.setDateFrom(value)
    }

    const handleResetDateFrom = () => {
        eventsFiltersModalStore.setDateFrom(null)
    }

    const countHintOutput = () => {
        return (!eventsFiltersModalStore?.getDateFrom() && eventsFiltersModalStore?.getDateTo()) ? true : false
    }

    return (
        <Box>
            <Box sx={{ display: "flex" }}>
                <MobileDatePicker
                    id="to-date"
                    label="от"
                    inputFormat="DD.MM.yyyy"
                    views={['year', 'month', 'day']}
                    value={eventsFiltersModalStore?.getDateFrom() || null}
                    onChange={(newValue) => handleSetDateFrom(newValue)}
                    closeOnSelect={true}
                    renderInput={(params) =>
                        <TextField
                            id="to-date-text"
                            {...params}
                            size="small"
                            focused
                            fullWidth
                        />}
                />
                {eventsFiltersModalStore?.getDateFrom() &&
                    <IconButton onClick={handleResetDateFrom} color="primary">
                        <CloseIcon />
                    </IconButton>
                }
            </Box>
            {countHintOutput() &&
                <Typography variant="caption">
                    *поиск будет осуществлен от первого события
                </Typography>
            }
        </Box>


    );
});
export default DateFrom;