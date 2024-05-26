export function calendarStyles(specialistsAmount) {
    return {
        width: "100%",
        minWidth: `${specialistsAmount * 220}px`,
        ".fc-timegrid-event-harness.fc-timegrid-event-harness-inset": {
            insetInline: "0% !important",
        },
        "& .fc-event": {
            background: "none",
            border: "none"
        },
        "& td": {
            height: "1.5px",
            fontSize: "1.5px",
        },
        "& .fc-timegrid-slot-label-cushion.fc-scrollgrid-shrink-cushion": {
            height: "10px",
            fontSize: "10px",
            position: "absolute",
            left: "-2px"
        },
    }
}