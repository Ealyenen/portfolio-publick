import { makeAutoObservable, toJS } from "mobx";
import moment from "moment"
import { SPECIALISTS_DAY_TABLE } from "../../../queries/schedule.queries";
import { UPDATE_SHEDULE } from "../../../mutations/schedule.mutations";
import { client } from "../../../../../_common/http/appoloClient";
import authStore from "../../../../../_common/stores/auth.store";
import { fullNameString } from "../../../../../_common/helpers/nameGenerationString";
import { countTableWrites } from "./sheduleTableWritesCount"

export default class SheduleCalendarStore {

    state = {
        calendarTimeStart: "07:00:00",
        calendarTimeEnd: "25:00:00",
        currentDate: "",
        watchDeleted: false,
        watchLine: false,
        specialistTimeAndRecords: null,
        specialistTimeAndDeletedRecords: null,
        specialist: null,
        isLoadingWrites: false,
        isErrorInWritesRequest: false,
        patientsRecords: [],
        hoveredPatientId: null,
        //ids of patients who have several records to the date
        samePatientRecordsIds: [],
        //count calendar scroll It used for line and hovered time
        calendarXY: {
            x: 0,
            y: 0,
        },
        updateWritesForLineData: false,
        specialistsTables: null,
        //hover time will be shown above cursor
        hoveredTime: null,
        cursorPosition: {
            x: null,
            y: null,
        },
        cursorWraperPosition: {
            x: null,
            y: null,
        },
        isCursorHighlightingTime: false,
    }

    get isCursorHighlightingTime() {
        return this.state.isCursorHighlightingTime
    }

    setIsCursorHighlightingTime(value) {
        this.state.isCursorHighlightingTime = value
    }

    get hoveredTime () {
        return this.state.hoveredTime
    }

    setHoveredTime(str) {
        this.state.hoveredTime = str
    }

    resetHoveredTime() {
        this.setIsCursorHighlightingTime(false)
        this.setHoveredTime(null)
    }

    get cursorPosition() {
        return this.state.cursorPosition
    }

    setCursorPosition(x, y) {
        this.state.cursorPosition = {
            x: x,
            y: y
        }
    }

    get timeCursorCountedPosition() {
        return {
            x: this.state.cursorPosition.x - this.state.calendarXY.x + 20,
            y: this.state.cursorPosition.y - this.state.calendarXY.y - 20
        }
    }


    //initial date for calendar. It takes from local storage. In case if there isnt any date then it put it there
    initCurrentDate() {
        const savedDate = localStorage.getItem('schedule_calendar_date')
        if (savedDate) {
          this.state.currentDate = moment(savedDate).format("YYYY-MM-DD")
        } else {
          this.state.currentDate = moment(new Date()).format("YYYY-MM-DD")
          localStorage.setItem('schedule_calendar_date', moment(new Date()).format("YYYY-MM-DD"))
        }
      }
    

    //show line get/set
    get watchLine() {
        return this.state.watchLine
    }

    setWatchLine(value) {
        this.state.watchLine = value
    }

    switchWatchLine() {
        this.state.watchLine = !this.state.watchLine
    }

    //base shift for lines

    get calendarXY () {
        return this.state.calendarXY
    }

    setCalendarXY (xY) {
        this.state.calendarXY = xY
    }

    //flag for count writes after change scroll

    get updateWritesForLineData () {
        return this.state.updateWritesForLineData
    }

    setUpdateWritesForLineData (value) {
        this.state.updateWritesForLineData = value
    }

    //get set array of patient writes. It is used for creating lines between same patients. Records got from calendar after render

    get samePatientRecordsIds() {
        return this.state.samePatientRecordsIds
    }

    setSamePatientRecordsIds(arr) {
        this.state.samePatientRecordsIds = arr
    }

    get patientsRecords() {
        return toJS(this.state.patientsRecords)
    }

    get sortedPatientRecords() {
        return toJS(this.state.patientsRecords).sort((a, b) => (a?.patientId > b?.patientId) ? 1 : -1)
    }

    addPatientsRecords(record) {
        const recordsIds = this.state.patientsRecords?.map((record)=>record.recordId)
        if (!this.state.patientsRecords || !recordsIds.includes(record.recordId)){
            this.state.patientsRecords.push(record)
        }else if (recordsIds.includes(record.recordId)){
            const index = this.state.patientsRecords.findIndex(i => i.recordId===record.recordId)
            this.state.patientsRecords[index] = record
        }
    }

    resetPatientsRecords() {
        this.state.patientsRecords = []
    }

    //get set patient whoes write is hovered

    get hoveredPatientId() {
        return this.state.hoveredPatientId
    }

    setHoveredPatientId(id) {
        this.state.hoveredPatientId = id
    }

    resetHoveredPatientId() {
        this.state.hoveredPatientId = null
    }

    //get calendar default times

    get calendarTimeStart() {
        return this.state.calendarTimeStart
    }

    get calendarTimeEnd() {
        return this.state.calendarTimeEnd
    }

    //data process

    get isLoadingWrites() {
        return this.state.isLoadingWrites
    }

    setIsLoadingWrites(value) {
        this.state.isLoadingWrites = value
    }

    get isErrorInWritesRequest() {
        return this.state.isErrorInWritesRequest
    }

    setIsErrorInWritesRequest(value) {
        this.state.isErrorInWritesRequest = value
    }

    get specialist() {
        return toJS(this.state.specialist)
    }

    setSpecialist(specialists) {
        this.state.specialist = specialists
    }

    get specialistTimeAndRecords() {
        return toJS(this.state.specialistTimeAndRecords)
    }

    setSpecialistTimeAndRecords(specialistTimeAndRecordsNew) {
        this.state.specialistTimeAndRecords = specialistTimeAndRecordsNew
    }

    addSpecialistTimeAndRecord(record) {
        this.state.specialistTimeAndRecords.push(record)
    }

    get specialistTimeAndDeletedRecords() {
        return toJS(this.state.specialistTimeAndDeletedRecords)
    }

    setSpecialistTimeAndDeletedRecords(specialistTimeAndDeletedRecordsNew) {
        this.state.specialistTimeAndDeletedRecords = specialistTimeAndDeletedRecordsNew
    }

    addSpecialistTimeAndDeletedRecords(record) {
        this.state.specialistTimeAndDeletedRecords.push(record)
    }

    setSpecialistsTables(arr) {
        this.state.specialistsTables = arr
    }

    requestWrites() {
        this.setIsLoadingWrites(true)
        return new Promise((resolve, reject) => {
            client.query({
                query: SPECIALISTS_DAY_TABLE,
                variables: {
                    centerId: authStore.medicalCenterId,
                    date: moment(this.state.currentDate).format("YYYY-MM-DD"),
                    isActive: true,
                },
            }).catch((error) => {
                this.setIsErrorInWritesRequest(true)
                this.setIsLoadingWrites(false)
                reject(error)
            }).then((data) => {
                if (data){
                    let specialistList = [],
                        timeAndRecords = [],
                        timeAndDeletedRecords = [];
                    data?.data?.tableBySpecialist?.forEach((specialist) => {
                        specialistList.push({
                            id: specialist.id,
                            title: fullNameString(specialist.lastName, specialist.firstName, specialist.patronymic),
                        })
                        const records = countTableWrites(
                            specialist.table,
                            specialist.id,
                            this.state.currentDate,
                            this.state.calendarTimeStart,
                            this.state.calendarTimeEnd,
                        )
                        timeAndRecords.push(...records.timeAndRecords)
                        timeAndDeletedRecords.push(...records.timeAndDeletedRecords)
                    })
                    const samePatientsIds = timeAndRecords.reduce((acc, obj, index, arr) => {
                        if (arr.slice(index + 1).find(item => item?.patient?.id && item?.patient?.id === obj?.patient?.id) && !acc.includes(obj?.patient?.id)) {
                        acc.push(obj?.patient?.id);
                        }
                        return acc;
                    }, []);

                    const samePatientsDeletedIds = timeAndDeletedRecords.reduce((acc, obj, index, arr) => {
                    if (arr.slice(index + 1).find(item => item?.patient?.id && item?.patient?.id === obj?.patient?.id) && !acc.includes(obj?.patient?.id)) {
                        acc.push(obj?.patient?.id);
                    }
                    return acc;
                    }, []);
                    
                    this.setSpecialist(specialistList)
                    this.setSpecialistTimeAndRecords(timeAndRecords)
                    this.setSpecialistTimeAndDeletedRecords(timeAndDeletedRecords)
                    this.setSamePatientRecordsIds([...samePatientsIds, ...samePatientsDeletedIds])
                    this.setSpecialistsTables(data.data.tableBySpecialist)
                    this.setIsLoadingWrites(false)
                    resolve(data.data)
                }else{
                    reject("request SPECIALISTS_DAY_TABLE returned data:", data)
                }
               
            })
        })
    }

    //date
    get currentDate() {
        return moment(this.state.currentDate).format("YYYY-MM-DD")
    }

    setCurrentDate(date) {
        new Promise((resolve) => {
            const newDate = moment(date).format("YYYY-MM-DD")
            localStorage.setItem("schedule_calendar_date", newDate)
            this.state.currentDate = newDate
            resolve(true)
        }).then(() => {
            this.requestWrites()
        })
    }

    setPreviousDate() {
        this.setCurrentDate(moment(this.state.currentDate).subtract(1, 'day'))
    }

    setNextDate() {
        this.setCurrentDate(moment(this.state.currentDate).add(1, 'day'))
    }

    //deleted writes
    get watchDeleted() {
        return this.state.watchDeleted
    }

    switchWatchDeleted() {
        this.state.watchDeleted = !this.state.watchDeleted
    }

    //functions for updating data after update/create/delete/recover write

    updateSamePatientRecords () {
        const samePatientsIds = this.state.specialistTimeAndRecords.reduce((acc, obj, index, arr) => {
            if (arr.slice(index + 1).find(item => item?.patient?.id && item?.patient?.id === obj?.patient?.id) && !acc.includes(obj?.patient?.id)) {
              acc.push(obj?.patient?.id);
            }
            return acc;
        }, []);
        const samePatientsDeletedIds = this.state.specialistTimeAndDeletedRecords.reduce((acc, obj, index, arr) => {
            if (arr.slice(index + 1).find(item => item?.patient?.id && item?.patient?.id === obj?.patient?.id) && !acc.includes(obj?.patient?.id)) {
              acc.push(obj?.patient?.id);
            }
            return acc;
        }, [])
        this.setSamePatientRecordsIds([...samePatientsIds, ...samePatientsDeletedIds])
    }

    updateAfterCreateWrite(writeData) {
        if (writeData){
            const record = {
                resourceId: writeData.specialist.id,
                recordId: writeData.id,
                start: writeData.dateTimeStart,
                end: writeData.dateTimeEnd,
                isInfo: writeData.isInfo,
                isStudent: writeData.isStudent,
                isNewPatient: writeData.isNewPatient,
                status: writeData.status,
                patient: writeData.patient,
                isScheduleRecord: true,
                timeStart: writeData.timeStart,
                timeEnd: writeData.timeEnd,
                description: writeData.description
            }
            this.addSpecialistTimeAndRecord(record)
            this.updateSamePatientRecords()
            this.setUpdateWritesForLineData(true)
        }
    }

    updateAfterUpdateWrite(writeData) {
        if (writeData){
            const record = {
                resourceId: writeData.specialist.id,
                recordId: writeData.id,
                start: writeData.dateTimeStart,
                end: writeData.dateTimeEnd,
                isInfo: writeData.isInfo,
                isStudent: writeData.isStudent,
                isNewPatient: writeData.isNewPatient,
                status: writeData.status,
                patient: writeData.patient,
                isScheduleRecord: true,
                timeStart: writeData.timeStart,
                timeEnd: writeData.timeEnd,
                description: writeData.description
            }
            const index = this.state.specialistTimeAndRecords.findIndex(i => i.recordId===record.recordId)
            if (index!==-1){
                this.state.specialistTimeAndRecords[index] = record
            }else {
                const indexInDeleted = this.state.specialistTimeAndDeletedRecords.findIndex(i => i.recordId===record.recordId)
                if (indexInDeleted!==-1){
                    this.state.specialistTimeAndDeletedRecords[indexInDeleted] = record
                }
            }
            this.updateSamePatientRecords()
            this.setUpdateWritesForLineData(true)
        }
    }

    updateAfterDeleteWrite(writeId) {
        const index = this.state.specialistTimeAndRecords.findIndex(i => i.recordId===writeId)
        if (index!==-1){
            const deletedWrite = this.state.specialistTimeAndRecords[index]
            this.addSpecialistTimeAndDeletedRecords(deletedWrite)
            this.state.specialistTimeAndRecords?.splice(index, 1)
            const indexOfWriteForLine = this.state.patientsRecords.findIndex(i => i.recordId===writeId)
            this.resetPatientsRecords().then(()=>{
                this.state.patientsRecords?.splice(indexOfWriteForLine, 1)
                this.updateSamePatientRecords()
                this.setUpdateWritesForLineData(true)
            })
        }
    }

    updateAfterRecoverWrite(writeId) {
        const index = this.state.specialistTimeAndDeletedRecords.findIndex(i => i.recordId===writeId)
        if (index!==-1){
            const deletedWrite = this.state.specialistTimeAndDeletedRecords[index]
            this.addSpecialistTimeAndRecord(deletedWrite)
            this.state.specialistTimeAndDeletedRecords?.splice(index, 1)
            const indexOfWriteForLine = this.state.patientsRecords.findIndex(i => i.recordId===writeId)
            this.resetPatientsRecords().then(()=>{
                this.state.patientsRecords?.splice(indexOfWriteForLine, 1)
                this.updateSamePatientRecords()
                this.setUpdateWritesForLineData(true)
            })
        }
    }

    //changing write by dropping and strech in calendar

    countDayTableId (id, start, end) {
        //id - id of specialist
        //start, end - time in format HH:MM
        const specialistDayTable = this.state.specialistsTables.find(i => i.id === id)
        let dayTableID = null
        if (specialistDayTable.table?.length===1){
            dayTableID = specialistDayTable.table[0]?.id
        }else {
            specialistDayTable.table.forEach((table)=>{
                if (table.dateTimeStart.slice(11, 16) <= start && end <= table.dateTimeEnd.slice(11, 16)){
                    dayTableID = table.id
                }
            })
        }
        if (!dayTableID) dayTableID = specialistDayTable.table[0]?.id
        return dayTableID
    }

    updateWriteRequest (writeId, specialistId, dateTimeStart, dateTimeEnd, writeStatusId) {
        const start = moment(dateTimeStart).format("HH:mm")
        const end = moment(dateTimeEnd).format("HH:mm")
        const dayTableId = this.countDayTableId(specialistId, start, end)
        return new Promise((resolve, reject)=>{
            client.mutate({
                mutation: UPDATE_SHEDULE,
                variables: {
                    "input": {
                    scheduleEntryId: writeId,
                    dayTableId: dayTableId,
                    statusId: writeStatusId,
                    date: moment(this.state.currentDate).format("YYYY-MM-DD"),
                    timeStart: start,
                    timeEnd: end,
                    }
                }
            }).catch((errors) => {
                if (errors) alert("Возникла ошибка при попытке изменить запись")
                reject(errors)
            }).then((data)=>{
                if (data?.data?.updateSchedule?.ok){
                    resolve(data.data.updateSchedule.schedule)
                }else reject(data)
            })
        })
    }

    changeWrite(writeId, specialistId, dateTimeStart, dateTimeEnd, writeStatusId) {
        this.resetHoveredPatientId()
        return new Promise((resolve, reject)=>{
            this.updateWriteRequest(writeId, specialistId, dateTimeStart, dateTimeEnd, writeStatusId).catch(()=>{
                reject(false)
            }).then((data)=>{
            if (data){
                this.updateAfterUpdateWrite(data)
                resolve(true)
            }else reject(false)
        })
        })
    }

    constructor() {
        makeAutoObservable(this)
        this.initCurrentDate();
    }

}