import React, { useEffect, useState } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Typography, FormControlLabel, FormControl, Box, Radio, RadioGroup } from "@mui/material"
import EventsFiltersModalStore from '../store/eventsFiltersModal.store';

const SearchDirection = (observer(() => {
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)

    const handleChangeDirection = (v) => {
        if (v === "desc") {
            eventsFiltersModalStore.setSearchDirectionDesc()
        } else if (v === "asc") {
            eventsFiltersModalStore.setSearchDirectionAsc()
        }
    }

    return (
        <>
            <Box sx={{ mt: 4}}>
                <Typography component="span" variant="h6">
                    Направление сортировки
                </Typography>
                <FormControl sx={{mt: 2}}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={eventsFiltersModalStore.getSearchDirection()}
                        onChange={(e, v) => handleChangeDirection(v)}
                    >
                        <FormControlLabel
                            value="desc"
                            control={<Radio />}
                            label="От последнего к первому"
                        />
                        <FormControlLabel
                            value="asc"
                            control={<Radio />}
                            label="От первого к последнему"
                        />
                    </RadioGroup>
                </FormControl>

            </Box>
        </>

    );
}));
export default SearchDirection;