import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material"
import Time from "./components/time";
import Comment from "./components/comment";
import Patient from "./components/patient";
import { getBgColorForEvent } from "../../store/schedulePatientRecordColor";
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { theme } from "../../../../../../_common/theme/theme"
import PatientIsNewAndBalanceSign from "./components/patientIsNewAndBalanceSign";

const PatientEvent = (observer(({ eventData }) => {
    const sheduleCalendarStore = useInstance(SheduleCalendarStore)
    const boxElementRef = useRef(null);

    const isHighLighted = sheduleCalendarStore.hoveredPatientId === eventData.patient.id
    const bgColor = isHighLighted ? theme.palette.primary.violetDeep2 : getBgColorForEvent(eventData.status?.name, eventData.isStudent)
    const color = isHighLighted ? "primary.white" : "primary.dark2"

    //variables for line draw. Get position
    const setRecordPosition = () => {
        if (boxElementRef.current) {
            const rect = boxElementRef.current.getBoundingClientRect();

            const positionX = rect?.left,
                possitionY = rect?.top,
                width = rect?.width || 0,
                height = rect?.height || 0;
            const patientEvent = {
                recordId: eventData.recordId,
                patientId: eventData.patient.id,
                x: positionX + (width / 2),
                y: possitionY + (height / 2),
            }
            sheduleCalendarStore.addPatientsRecords(patientEvent)
        }
        sheduleCalendarStore.setUpdateWritesForLineData(false)
    }

    const mouseEnterEvent = () => {
        sheduleCalendarStore.setHoveredPatientId(eventData.patient.id)
    }
    const mouseLeaveEvent = () => {
        sheduleCalendarStore.resetHoveredPatientId()
    }

    useEffect(() => {
        if (sheduleCalendarStore?.watchLine) {
            //here is used function and settimeout. This is done for preventing bugs if calendar and write puts wrong values. Also preventing other bugs with "flying" line
            setRecordPosition()
            setTimeout(() => {
                setRecordPosition()
            }, 300)
        }
    }, [
        boxElementRef.current,
        sheduleCalendarStore?.watchLine,
        sheduleCalendarStore.updateWritesForLineData,
        sheduleCalendarStore.watchDeleted,
        sheduleCalendarStore.samePatientRecordsIds?.includes(eventData.patient.id)
    ])

    return (
        <Box
            ref={boxElementRef}
            sx={{
                width: "100%",
                height: "100%",
                background: bgColor,
                borderRadius: 0.2,
                color: color,
                pl: 0.5,
                pr: 0.5,
                pt: 0.3,
                pb: 0,
            }}
            onMouseEnter={mouseEnterEvent}
            onMouseLeave={mouseLeaveEvent}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{display: "flex", flexWrap: "nowrap", alignItems: "start"}}>
                    <Time timeStart={eventData.timeStart} timeEnd={eventData.timeEnd} />
                    <PatientIsNewAndBalanceSign patient={eventData.patient} isNewPatient={eventData.isNewPatient} />
                </Box>
                <Patient patient={eventData.patient} />
            </Box>
            <Comment comment={eventData.description} />
        </Box>

    )

}));

export default PatientEvent