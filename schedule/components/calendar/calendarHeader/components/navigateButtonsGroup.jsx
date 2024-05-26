import React from "react";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, ButtonGroup, FormControl, Switch, Typography } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonMain from "../../../../../../_components/UI/Buttons/ButtonMain";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const CalendarHeaderNavigateBtnGroup = (observer(({ sx }) => {
    const calendarStore = useInstance(SheduleCalendarStore)

    const disableBackBtn = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const disableTodayBtn = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const disableNextBtn = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const disableDeletedWatch = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const disableConnectionsWatch = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const handlePrevClick = () => {
        calendarStore.setPreviousDate()
    }

    const handleTodayClick = () => {
        calendarStore.setCurrentDate(new Date())
    }

    const handleNextClick = () => {
        calendarStore.setNextDate()
    }

    const handleChangeWatchDeleted = () => {
        calendarStore.switchWatchDeleted()
    }

    const handleWatchLine = () => {
        calendarStore.switchWatchLine()
    }

    // calendarStore.isLoadingWrites

    return (
        <Box sx={{ ...sx, display: "flex", flexWrap: "nowrap", gap: 1, alignItems: "center" }}>
            <ButtonGroup>
                <ButtonMain
                    disabled={disableBackBtn()}
                    icon={
                        <ArrowBackIosIcon />
                    }
                    onClick={handlePrevClick}
                />
                <ButtonMain
                    disabled={disableTodayBtn()}
                    title={"Сегодня"}
                    onClick={handleTodayClick}
                />
                <ButtonMain
                    disabled={disableNextBtn()}
                    icon={
                        <ArrowForwardIosIcon />
                    }
                    onClick={handleNextClick}
                />
            </ButtonGroup>
            <FormControl fullWidth focused sx={{ height: "100%", display: { xs: "none", md: "block" } }}>
                <label htmlFor="student-write-switch">
                    <Switch disabled={disableDeletedWatch()} checked={calendarStore.watchDeleted || false} id="student-write-switch" onChange={handleChangeWatchDeleted} />
                    <Typography sx={{ display: { xs: "none", md: "inline" } }}>Удаленные</Typography>
                </label>
            </FormControl>
            <FormControlLabel
                sx={{ ml: 1, display: { xs: "flex", md: "none" } }}
                control={
                    <Checkbox
                        onClick={handleChangeWatchDeleted}
                        checked={calendarStore.watchDeleted || false}
                        disabled={disableDeletedWatch()}
                        icon={<DeleteOutlineIcon />}
                        checkedIcon={<DeleteIcon />}
                    />}
            />
            <FormControlLabel sx={{ display: { xs: "none", md: "flex" } }} control={<Checkbox onClick={handleWatchLine} checked={calendarStore.watchLine} disabled={disableConnectionsWatch()} />} label="Связи" />
        </Box>

    )

}));

export default CalendarHeaderNavigateBtnGroup