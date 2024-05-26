import React from "react";
import { theme } from "../../../../../../_common/theme/theme"
import SheduleCalendarStore from "../../store/sheduleCalendar.store";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";

const Line = observer(({ x1, x2, y1, y2, patientId }) => {
    const sheduleCalendarStore = useInstance(SheduleCalendarStore)
    const getAngle = () => {
        const angle = Math.atan2((y2-y1), (x2-x1)) * (180 / Math.PI)
        return (angle < 0) ? 360 + angle : angle
    }

    const lineLength = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

    const style = {
        position: 'absolute',
        top: y1 + 'px',
        left: x1 + 'px',
        transform: `rotate(${getAngle()}deg)`,
        transformOrigin: '0 0',
        width: lineLength,
        height: 1,
        borderBottom: patientId === sheduleCalendarStore.hoveredPatientId ? '1px solid' :'1px dashed',
        borderColor: patientId === sheduleCalendarStore.hoveredPatientId ? theme.palette.primary.deepRed3 : theme.palette.primary.main,
        borderRadius: "20px",
    };

    return (
        <div style={style} />
    )

});

export default Line