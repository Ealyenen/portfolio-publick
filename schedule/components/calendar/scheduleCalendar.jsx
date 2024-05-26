import React, { useEffect } from "react";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, useMediaQuery, useTheme } from "@mui/material"
import ScheduleCalendarHeader from "./calendarHeader/calendarHeader";
import Calendar from "./components/Calendar";
import SheduleCalendarStore from "./store/sheduleCalendar.store";
import authStore from "../../../../_common/stores/auth.store";
import LinesBlock from "./components/lines/linesBlock";
import HoveredTime from "./components/hoveredTime/hoveredTime";

const ScheduleCalendar = (observer(() => {
    const calendarStore = useInstance(SheduleCalendarStore)

    const mainTheme = useTheme();
    const mobileBreakpointMd = useMediaQuery(mainTheme.breakpoints.down("md"));

    useEffect(() => {
        calendarStore.requestWrites()
    }, [])

    useEffect(() => {
        calendarStore.requestWrites()
    }, [authStore.medicalCenterId])

    useEffect(()=>{
        if (!mobileBreakpointMd){
            calendarStore.setWatchLine(true)
        }
    },[])

    const handleCountCalendarXY = () => {
        const boxElement = document?.getElementById("line-and-fullcalendar-wrap")
        const rect = boxElement?.getBoundingClientRect()
        const calendarXY = { x: rect?.left - boxElement.scrollLeft, y: rect?.top - boxElement.scrollTop }
        if (calendarXY?.x !== calendarStore.calendarXY?.x || calendarXY?.y !== calendarStore.calendarXY?.y) {
            calendarStore.setCalendarXY(calendarXY)
            calendarStore.setUpdateWritesForLineData(true)
        }
    }

    useEffect(() => {
        handleCountCalendarXY()
        const handleScroll = () => {
            handleCountCalendarXY()
        }
        const boxElement = document?.getElementById("line-and-fullcalendar-wrap")
        boxElement.addEventListener("scroll", handleScroll)
        return () => {
            boxElement.removeEventListener("scroll", handleScroll)
        }
    }, [calendarStore.isLoadingWrites, calendarStore.specialist, calendarStore?.watchLine, calendarStore.watchDeleted])

    useEffect(() => {
        if (!mobileBreakpointMd) {
            const handleMouseMove = (e) => {
                calendarStore.setCursorPosition(e.clientX, e.clientY)
            }

            window.addEventListener('mousemove', handleMouseMove)

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
            };
        }
    }, []);

    return (
        <Box>
            <ScheduleCalendarHeader />
            <Box
                id={"line-and-fullcalendar-wrap"}
                sx={{
                    width: "100%",
                    overflow: "scroll",
                    position: "relative",
                    height: { xs: "60vh", md: "65vh", lg: "70vh", xl: "80vh" },
                }}>
                {calendarStore?.watchLine && !calendarStore.isLoadingWrites && !calendarStore.isErrorInWritesRequest &&
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <LinesBlock />
                    </Box>
                }
                {!mobileBreakpointMd && <HoveredTime />}
                <Calendar />
            </Box>
        </Box>

    )

}));

export default ScheduleCalendar