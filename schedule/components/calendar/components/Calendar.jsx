import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import ruLocale from "@fullcalendar/core/locales/ru";
import SheduleCalendarStore from "../store/sheduleCalendar.store";
import { FullPageFallbackProgress } from "../../../../../_components/UI/preloaders/FullPageFallbackProgress"
import authStore from "../../../../../_common/stores/auth.store";
import PatientEvent from "./event/patientEvent";
import InfoEvent from "./event/infoEvent";
import { calendarStyles } from "../store/calendarView";
import CreateWriteViewStore from "../../CreateWrite/store/CreateWriteView.view.store";
import ChangeWriteViewStore from "../../ChangeWrite/store/ChangeWriteView.view.store";
import EventPopperStore from "../store/eventPopper.store";
import moment from "moment"

const Calendar = (observer(() => {
    const createWriteViewStore = useInstance(CreateWriteViewStore)
    const changeWriteViewStore = useInstance(ChangeWriteViewStore)
    const calendarStore = useInstance(SheduleCalendarStore)
    const eventPopperStore = useInstance(EventPopperStore)
    const calendarRef = useRef(null)
    const mainTheme = useTheme();
    const mobileBreakpointMd = useMediaQuery(mainTheme.breakpoints.down("md"));

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(calendarStore.currentDate);
        }
        calendarStore.resetPatientsRecords()
    }, [calendarStore.currentDate, calendarRef.current, calendarStore.specialist, authStore.medicalCenterId])

    useEffect(() => {
        calendarStore.resetPatientsRecords()
    }, [calendarStore.watchDeleted])

    const renderEvent = (event) => {
        const eventData = event.event.extendedProps
        if (eventData.isScheduleRecord) {
            event.backgroundColor = "transparent"
            if (!eventData?.isInfo) {
                return (
                    <PatientEvent eventData={eventData} />
                )
            } else {
                return (
                    <InfoEvent eventData={eventData} />
                )
            }
        }
    }

    //open modal for creating write and put data for it
    const selectTime = (selectData) => {
        calendarStore.resetHoveredTime()
        createWriteViewStore.setOpenModalGetInfo({ info: selectData, center: authStore.medicalCenterId })
    }

    const eventClick = (eventData) => {
        //if will click 1 time then they will see a hint about write. If will click 2 times then they will see modal
        if (eventData.jsEvent.type === 'click') {
            if (eventData.jsEvent.detail === 1) {
                eventPopperStore.openPopper(
                    eventData.el,
                    `${eventData.event._def.extendedProps.timeStart.slice(0, 5)} - ${eventData.event._def.extendedProps.timeEnd.slice(0, 5)}`,
                    eventData.event._def.extendedProps.description,
                    eventData.event._def.extendedProps.isInfo,
                    eventData.event._def.extendedProps.patient,
                    eventData.event._def.extendedProps.isNewPatient,
                )
            } else if (eventData.jsEvent.detail === 2) {
                changeWriteViewStore.setOpenModalGetInfo(eventData.event._def.extendedProps.recordId)
            }
        } else {
            changeWriteViewStore.setOpenModalGetInfo(eventData.event._def.extendedProps.recordId)
        }
    }

    const handleEventMouseLeave = () => {
        eventPopperStore.resetStore()
        eventPopperStore.setAnchorEl(null)
    }

    const handleMooveMouse = (e) => {
        if (!mobileBreakpointMd) {
            if (!calendarStore.isCursorHighlightingTime && e?.target?.dataset?.time && e?.target?.dataset?.time?.length > 0) {
                calendarStore.setHoveredTime(e?.target?.dataset?.time.slice(0, 5))
            } else if (!calendarStore.isCursorHighlightingTime) {
                calendarStore.setHoveredTime(null)
            }
        }
    }

    const handleSelectingProcess = (selectInfo) => {
        if (!mobileBreakpointMd) {
            calendarStore.setIsCursorHighlightingTime(true)
            calendarStore.setHoveredTime(moment(selectInfo.startStr).format("HH:mm") + " - " + moment(selectInfo.endStr).format("HH:mm"))
        }
    }

    const handleMouseLeaveCalendar = () => {
        calendarStore.resetHoveredTime()
    }

    //draging and streching events
    const handleEventChange = (event) => {
        calendarStore.changeWrite(
            event.event._def.extendedProps.recordId,
            event.event._def.resourceIds[0],
            event.event.start,
            event.event.end,
            event.event._def.extendedProps.status.id
        ).catch(() => {
            if (calendarRef?.current) {
                const events = !calendarStore.watchDeleted ? calendarStore.specialistTimeAndRecords : calendarStore.specialistTimeAndDeletedRecords
                calendarRef.current.getApi().getEvents().forEach(event => event.remove())
                calendarRef.current.getApi().addEventSource(events)
            }
        })
    }

    if (calendarStore.isLoadingWrites) {
        return (
            <FullPageFallbackProgress />
        )
    }

    if (calendarStore.isErrorInWritesRequest) {
        return (
            <Typography sx={{ mt: 10, textAlign: "center" }} variant="h5">
                Возникла ошибка при попытке загрузить данные
            </Typography>
        )

    }

    if (!calendarStore.specialist || calendarStore.specialist?.length === 0) {
        return (
            <Typography sx={{ mt: 10, textAlign: "center" }} variant="h5">
                Нет специалистов на текущую дату
            </Typography>
        )
    }

    return (
        // function set styles for calendar wrap. It needs to count minWidth, so need length
        <Box
            sx={{ ...calendarStyles(calendarStore.specialist?.length) }}
            onMouseMove={handleMooveMouse}
            onMouseLeave={handleMouseLeaveCalendar}
        >
            <FullCalendar
                ref={calendarRef}
                //base settings for visual and calendar type
                plugins={[resourceTimeGridPlugin, resourceTimelinePlugin, interactionPlugin]}
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                locale={ruLocale}
                allDaySlot={false}
                headerToolbar={false}
                initialView="resourceTimeGridDay"
                eventMinWidth={100}
                resourceAreaWidth={'200px'}
                dayMinWidth={"200px"}
                eventMinHeight={10}
                height={"auto"}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }}
                slotDuration='00:05'
                slotLabelInterval="01:00"
                //set time from and to
                slotMinTime={calendarStore.calendarTimeStart}
                slotMaxTime={calendarStore.calendarTimeEnd}
                //header settings
                resourceAreaHeaderContent='Специалисты'
                resources={calendarStore.specialist}
                //events
                events={!calendarStore.watchDeleted ? calendarStore.specialistTimeAndRecords : calendarStore.specialistTimeAndDeletedRecords}
                eventContent={renderEvent}
                //for creating/changing writes. Needed for clicking in calendar
                selectable={true}
                select={selectTime}
                //needed for mobile click
                eventLongPressDelay={300}
                //changing events (draging, streching them)
                editable={true}
                eventClick={eventClick}
                eventChange={handleEventChange}
                eventMouseLeave={handleEventMouseLeave}
                //is used for watching time what is covered when you want to create write
                selectAllow={(selectInfo) => {
                    if (!mobileBreakpointMd) {
                        handleSelectingProcess(selectInfo)
                    }
                    return true
                }}

            />
        </Box>
    )

}));

export default Calendar