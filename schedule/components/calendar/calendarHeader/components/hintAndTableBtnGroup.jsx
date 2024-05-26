import React from "react";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, ButtonGroup } from "@mui/material"
import SheduleHintPopover from "./hintPopover/hintPopover";
import ButtonMain from "../../../../../../_components/UI/Buttons/ButtonMain";
import RedirectSheduleTableStore from "../../../../../../_common/stores/redirectSheduleTable.store";
import { TABLE_ROUTE } from "../../../../../../_common/router/routes"
import { useNavigate } from "react-router-dom";
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import moment from "moment";

const CalendarHeaderHintAndTableBtnGroup = (observer(({ sx }) => {
    const calendarStore = useInstance(SheduleCalendarStore)
    const redirectSheduleTableStore = useInstance(RedirectSheduleTableStore)

    const disableTableNavigate = () => {
        const disabled = calendarStore.isLoadingWrites
        return disabled
    }

    const navigate = useNavigate()

    const handleRedirectTable = () => {
        redirectSheduleTableStore.setStartDate(moment(calendarStore?.currentDate).format("YYYY-MM-DD") || new Date())
        redirectSheduleTableStore.setEndDate(moment(calendarStore?.currentDate).format("YYYY-MM-DD") || new Date())
        redirectSheduleTableStore.setRedirectedFromShedule(true)
        navigate(TABLE_ROUTE)
    }

    return (
        <Box sx={sx}>
            <ButtonGroup>
                <SheduleHintPopover />
                <ButtonMain
                    disabled={disableTableNavigate()}
                    title={"В табель"}
                    onClick={handleRedirectTable}
                />
            </ButtonGroup>
        </Box>

    )

}));

export default CalendarHeaderHintAndTableBtnGroup