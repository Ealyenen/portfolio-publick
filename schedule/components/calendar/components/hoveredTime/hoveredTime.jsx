import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material"
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { theme } from "../../../../../../_common/theme/theme"

const HoveredTime = observer(() => {
    const sheduleCalendarStore = useInstance(SheduleCalendarStore)

    return (
        <Box
            id={"cursor-hover-time"}
            sx={{
                position: "absolute",
                top: 0,
                zIndex: 3,
                bgcolor: "red",
            }}
        >
            <Typography
                id={"cursor-satellite-time-block"}
                sx={{
                    position: "absolute",
                    left: sheduleCalendarStore.timeCursorCountedPosition.x + "px",
                    top: sheduleCalendarStore.timeCursorCountedPosition.y + "px",
                    display: "block",
                    zIndex: 5,
                    whiteSpace: "nowrap",
                    color: "primary.dark2",
                    display: {xs: "none", md: "block"}
                }}
                variant="subtitle2"
            >
                {sheduleCalendarStore.hoveredTime}
            </Typography>
        </Box>
    )

});

export default HoveredTime