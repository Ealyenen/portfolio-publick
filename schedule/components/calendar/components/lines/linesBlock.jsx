import React from "react";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material"
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import Line from "./line"

const LinesBlock = (observer(() => {
    const calendarStore = useInstance(SheduleCalendarStore)

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                zIndex: 2,
            }}
            id={"fullcalendar-line-id"}
        >
            {calendarStore.sortedPatientRecords?.map((record, index) => {
                const sortedRecords = calendarStore.sortedPatientRecords
                if (index + 1 < sortedRecords?.length && record.patientId === sortedRecords[index + 1].patientId) {
                    return (
                        <Line
                            x1={record.x - calendarStore.calendarXY.x}
                            x2={sortedRecords[index + 1].x - calendarStore.calendarXY.x}
                            y1={record.y - calendarStore.calendarXY.y}
                            y2={sortedRecords[index + 1].y - calendarStore.calendarXY.y}
                            patientId={record.patientId}
                            key={`line-${record.recordId}`}
                        />
                    )
                }
            })}
        </Box>
    )

}));

export default LinesBlock