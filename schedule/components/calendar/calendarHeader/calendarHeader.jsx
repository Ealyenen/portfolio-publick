import * as React from "react";
import { Box } from "@mui/material"
import CalendarHeaderNavigateBtnGroup from "./components/navigateButtonsGroup";
import CalendarHeaderDatePicker from "./components/headerDatePicker";
import CalendarHeaderHintAndTableBtnGroup from "./components/hintAndTableBtnGroup";

const ScheduleCalendarHeader = (() => {

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
            }}
        >
            {/* use props for putting flex orders to blocks. Better use them here 
            as flex order puts in file where are other flex settings (from my point of view)
            */}
            <CalendarHeaderNavigateBtnGroup sx={{ order: { xs: 1, lg: 0 } }} />
            <CalendarHeaderDatePicker sx={{ order: { xs: 0, lg: 1 } }} />
            <CalendarHeaderHintAndTableBtnGroup sx={{ order: 2 }} />
        </Box>

    )

});

export default ScheduleCalendarHeader