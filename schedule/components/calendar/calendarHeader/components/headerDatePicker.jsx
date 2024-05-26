import React, { useState } from "react";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography, TextField, useMediaQuery, useTheme } from "@mui/material"
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment"
import 'moment/locale/ru'
import SheduleCalendarStore from "../../store/sheduleCalendar.store";

const CalendarHeaderDatePicker = (observer(({ sx }) => {
    const calendarStore = useInstance(SheduleCalendarStore)
    const [open, setOpen] = useState(false)

    const mainTheme = useTheme();
    const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("sm"));

    const disableDateChange = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const chooseDate = (newDate) => {
        calendarStore.setCurrentDate(newDate)
    }

    const openDataPicker = () => {
        if (!disableDateChange()) {
            setOpen(true)
        }
    }


    return (
        <Box sx={sx}>
            <MobileDatePicker
                label="дата"
                value={calendarStore?.currentDate || ""}
                open={open}
                onClose={() => setOpen(false)}
                onChange={(newValue) => chooseDate(newValue)}
                closeOnSelect={true}
                views={['year', 'month', 'day']}
                renderInput={(params) => <TextField sx={{ display: "none" }} {...params} />}
            />
            <Typography
                onClick={openDataPicker}
                variant="h5"
                sx={{
                    color: disableDateChange() && "primary.halfGrey",
                    cursor: "pointer",
                    ':hover': { color: disableDateChange() ? "primary.halfGrey" : 'primary.light' }
                }}
            >
                {mobileBreakpoint ?
                    moment(calendarStore?.currentDate).format("DD.MM.YYYY dddd")
                    :
                    moment(calendarStore?.currentDate).format("DD MMMM YYYY dddd")
                }
            </Typography>
        </Box>

    )

}));

export default CalendarHeaderDatePicker