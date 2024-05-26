import {
    theme
} from "../../../../../_common/theme/theme";
import moment from "moment"

const color = theme.palette.primary.violetGrey2

function findSpecialistTimeRecords(
    timeTable,
    specialistId,
    dateTimeStart,
    dateTimeEnd
) {
    const timeTableLength = timeTable.length
    if (timeTableLength === 1) {
        return [{
                resourceId: specialistId,
                backgroundColor: color,
                display: "background",
                medicalCenter: "1",
                start: dateTimeStart,
                end: timeTable[0].dateTimeStart,
                isScheduleRecord: false,
            },
            {
                resourceId: specialistId,
                backgroundColor: color,
                display: "background",
                medicalCenter: "1",
                start: timeTable[0].dateTimeEnd,
                end: dateTimeEnd,
                isScheduleRecord: false,
            }
        ]
    } else {
        const records = []
        timeTable.forEach((gap, index) => {
            if (index === 0) {
                records.push({
                    resourceId: specialistId,
                    backgroundColor: color,
                    display: "background",
                    medicalCenter: "1",
                    start: dateTimeStart,
                    end: gap.dateTimeStart,
                    isScheduleRecord: false,
                })
                records.push({
                    resourceId: specialistId,
                    backgroundColor: color,
                    display: "background",
                    medicalCenter: "1",
                    start: gap.dateTimeEnd,
                    end: timeTable[index + 1].dateTimeStart,
                    isScheduleRecord: false,
                })
            } else if (index + 1 === timeTableLength) {
                records.push({
                    resourceId: specialistId,
                    backgroundColor: color,
                    display: "background",
                    medicalCenter: "1",
                    start: gap.dateTimeEnd,
                    end: dateTimeEnd,
                    isScheduleRecord: false,
                })
            } else {
                records.push({
                    resourceId: specialistId,
                    backgroundColor: color,
                    display: "background",
                    medicalCenter: "1",
                    start: gap.dateTimeEnd,
                    end: timeTable[index + 1].dateTimeStart,
                    isScheduleRecord: false,
                })
            }
        })
        return records
    }
}

function findTimeRecordsDeletedRecords(tables, specialistId, dateTimeStart, dateTimeEnd) {
    let timeTable = [],
        timeAndRecords = [],
        timeAndDeletedRecords = [];
    tables.forEach((tableItem) => {
        timeTable.push({
            dateTimeStart: tableItem.dateTimeStart,
            dateTimeEnd: tableItem.dateTimeEnd
        })
        tableItem.scheduleEntries.forEach((scheduleWrite) => {
            const record = {
                resourceId: specialistId,
                recordId: scheduleWrite.id,
                start:scheduleWrite.dateTimeStart,
                end:scheduleWrite.dateTimeEnd,
                isInfo: scheduleWrite.isInfo,
                isStudent: scheduleWrite.isStudent,
                isNewPatient: scheduleWrite.isNewPatient,
                status: scheduleWrite.status,
                patient: scheduleWrite.patient,
                isScheduleRecord: true,
                timeStart: scheduleWrite.timeStart,
                timeEnd: scheduleWrite.timeEnd,
                description: scheduleWrite.description
            }
            if (scheduleWrite.isActive){
                timeAndRecords.push(record)
            }else{
                timeAndDeletedRecords.push(record)
            }
        })
    })
    timeTable = timeTable.sort((a, b) => a.dateTimeStart < b.dateTimeStart ? -1 : 1)
    const timeRecords = findSpecialistTimeRecords(
        timeTable,
        specialistId,
        dateTimeStart,
        dateTimeEnd
    )

    timeAndRecords.push(...timeRecords)
    timeAndDeletedRecords.push(...timeRecords)
    return {
        timeAndRecords: timeAndRecords,
        timeAndDeletedRecords: timeAndDeletedRecords
    }
}




export function countTableWrites(table, specialistId, currentDate, timeStart, timeEnd) {
    const dateTimeStart = moment(currentDate).format("YYYY-MM-DD") + "T" + timeStart,
        dateTimeEnd = moment(currentDate).format("YYYY-MM-DD") + "T" + timeEnd;
    const records = findTimeRecordsDeletedRecords(table, specialistId, dateTimeStart, dateTimeEnd)
    let timeAndRecords = records.timeAndRecords,
        timeAndDeletedRecords = records.timeAndDeletedRecords;
    return {
        timeAndRecords: timeAndRecords,
        timeAndDeletedRecords: timeAndDeletedRecords
    }
}