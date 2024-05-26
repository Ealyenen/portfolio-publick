import {
    makeAutoObservable,
    toJS
} from "mobx";
import {
    client
} from "../../../_common/http/appoloClient";
import {
    PATIENT_EVENTS,
    APPOINTMENT_EVENT,
    INFO_BLOCK_EVENT,
    CALL_EVENT
} from "../_queries/patients.queries";
import {
    inject
} from "react-ioc";
import PatientStore from "./patient.store"
import PatientEventsBlockStore from "./patientEventsBlock.store";
import moment from "moment"

export default class PatientEventsStore {
    patientStore = inject(this, PatientStore)
    eventsBlockStore = inject(this, PatientEventsBlockStore)

    state = {
        events: [],
        limit: 5,
        offset: 0,
        offsetStep: 5,
        eventsQty: 0,
        isError: false,
        isLoading: false,
        topBlockHeight: [0,],
        eventsAmountScrollTypesChoose: 60,
    }

    getEventsAmountScrollTypesChoose() {
        return this.state.eventsAmountScrollTypesChoose
    }

    resetTopBlockHeight() {
        this.state.topBlockHeight = [0]
    }

    addTopBlockHeight(num) {
        this.state.topBlockHeight.push(num)
    }

    removeLastTopBlockHeight() {
        this.state.topBlockHeight.pop()
    }

    get topBlockHeight() {
        return this.state.topBlockHeight?.length>0 ? this.state.topBlockHeight?.reduce((a, b) => a + b) : 0
    }

    getEvents() {
        return toJS(this.state.events)
    }

    get lastEvents() {
        if (this.state.eventsQty <= this.state.eventsAmountScrollTypesChoose){
            return toJS(this.state.events)
        }else if (this.state.events?.length <= this.state.limit * 6){
            return toJS(this.state.events)
        }else return toJS(this.state.events.slice(this.state.topBlockHeight?.length * this.state.limit))
    }

    setEvents(arr) {
        this.state.events = arr
    }

    addEvents(arr) {
        this.state.events.push(...arr)
    }

    removeLastEvents () {
        if (this.state.events.length % this.state.limit === 0){
            if (this.state.events.length >= this.state.limit * 2){
                this.setEvents(this.state.events.slice(0, this.state.events.length - this.state.limit))
            }
        }else {
            if (this.state.events.length > this.state.limit){
                this.setEvents(this.state.events.slice(0, this.state.events.length - (this.state.events.length % this.state.limit)))
            }
        }
    }

    //limit offset eventsQty

    getLimit() {
        return this.state.limit
    }

    getOffset() {
        return this.state.offset
    }

    setOffset(num) {
        this.state.offset = num
    }

    getOffsetStep() {
        return this.state.offsetStep
    }

    setEventsQty(num) {
        this.state.eventsQty = num
    }

    getEventsQty() {
        return this.state.eventsQty
    }

    //isError isLoading

    getIsError() {
        return this.state.isError
    }

    getIsLoading() {
        return this.state.isLoading
    }

    setIsError(value) {
        this.state.isError = value
    }

    setIsLoading(value) {
        this.state.isLoading = value
    }

    //reset

    reset() {
        return new Promise((resolve) => {
            this.resetTopBlockHeight()
            this.setOffset(0)
            this.setEvents([])
            resolve(true)
        })
    }

    //count can request be send

    get canSendRequest() {
        if (!this.state.isLoading && this.patientStore.getPatientId()) {
            return true
        } else return false
    }

    //request events

    requestEvents() {
        return new Promise((resolve, reject) => {
            if (this.patientStore.getPatientId()) {
                this.setIsLoading(true)
                const filters = this.eventsBlockStore.getFilters()
                const start = (filters.useTimeLapse && filters.dateFrom) ? (filters.dateFrom?.length>=25 ? filters.dateFrom : moment(filters.dateFrom).format("YYYY-MM-DD") + "T00:00:00+00:00") : undefined
                const end = (filters.useTimeLapse && filters.dateTo) ? (filters.dateTo?.length>=25 ? filters.dateTo : moment(filters.dateTo).format("YYYY-MM-DD") + "T23:59:59+00:00") : undefined
                client.query({
                        query: PATIENT_EVENTS,
                        variables: {
                            patientId: this.patientStore.getPatientId(),
                            limit: this.state.offsetStep,
                            offset: this.state.offset,
                            isActive: true,
                            ordering: filters.searchDirection === "desc" ? "eventDatetimeStart,desc" : "eventDatetimeStart,asc",
                            eventDatetimeStart_Gte: start,
                            eventDatetimeEnd_Lte: end,
                            infoRecord_Isnull: filters.infoBlock ? undefined : true,
                            appointment_Isnull: filters.appointment ? undefined : true,
                            schedule_Isnull: filters.sheduleRecords ? undefined : true,
                            call_Isnull: filters.calls ? undefined : true,
                            smsMessage_Isnull: filters.sms ? undefined : true,
                            prepayment_Isnull: filters.prepayment ? undefined : true,
                        },
                    })
                    .catch((error) => {
                        console.log(error)
                        this.setIsError(true)
                        this.setIsLoading(false)
                        reject(error)
                    }).then((data) => {
                        resolve(data)
                        if (data.data.eventsSelectedPatient) {
                            this.setEventsQty(data.data.eventsSelectedPatient.totalCount)
                            this.setOffset(this.state.limit)
                            this.setIsError(false)
                            this.setEvents(data.data.eventsSelectedPatient.results)
                            this.setIsLoading(false)
                        } else {
                            this.setIsError(true)
                            this.setIsLoading(false)
                            reject("something went wrong. There is no data about eventsSelectedPatient. obj:", data.data.eventsSelectedPatient)
                        }
                    })

            }

        })

    }

    requestAddEvents() {
        return new Promise((resolve, reject) => {
            if (this.patientStore.getPatientId()) {
                this.setIsLoading(true)
                const filters = this.eventsBlockStore.getFilters()
                const start = (filters.useTimeLapse && filters.dateFrom) ? (filters.dateFrom?.length>=25 ? filters.dateFrom : moment(filters.dateFrom).format("YYYY-MM-DD") + "T00:00:00+00:00") : undefined
                const end = (filters.useTimeLapse && filters.dateTo) ? (filters.dateTo?.length>=25 ? filters.dateTo : moment(filters.dateTo).format("YYYY-MM-DD") + "T23:59:59+00:00") : undefined
                client.query({
                        query: PATIENT_EVENTS,
                        variables: {
                            patientId: this.patientStore.getPatientId(),
                            limit: this.state.offsetStep,
                            offset: this.state.offset,
                            isActive: true,
                            ordering: filters.searchDirection === "desc" ? "eventDatetimeStart,desc" : "eventDatetimeStart,asc",
                            eventDatetimeStart_Gte: start,
                            eventDatetimeEnd_Lte: end,
                            infoRecord_Isnull: filters.infoBlock ? undefined : true,
                            appointment_Isnull: filters.appointment ? undefined : true,
                            schedule_Isnull: filters.sheduleRecords ? undefined : true,
                            call_Isnull: filters.calls ? undefined : true,
                            smsMessage_Isnull: filters.sms ? undefined : true,
                            prepayment_Isnull: filters.prepayment ? undefined : true,
                        },
                    })
                    .catch((error) => {
                        console.log(error)
                        this.setIsError(true)
                        this.setIsLoading(false)
                        reject(error)
                    }).then((data) => {
                        resolve(data)
                        if (data.data.eventsSelectedPatient) {
                            this.setEventsQty(data.data.eventsSelectedPatient.totalCount)
                            this.setOffset(this.state.offset + this.state.limit)
                            this.setIsError(false)
                            this.addEvents(data.data.eventsSelectedPatient.results)
                            this.setIsLoading(false)
                        } else {
                            this.setIsError(true)
                            this.setIsLoading(false)
                            reject("something went wrong. There is no data about eventsSelectedPatient. obj:", data.data.eventsSelectedPatient)
                        }
                    })

            }

        })

    }

    searchAgain () {
        this.resetTopBlockHeight()
        this.setOffset(0)
        this.setEvents([])
        this.requestEvents()
    }

    getAppointmentEvent(id){
        console.log("get appointment by id for pagination:", id)
        return new Promise((resolve, reject)=>{
            client.query({
                query: APPOINTMENT_EVENT,
                variables: {
                    id: id
                }
            }).catch(()=>{
                reject(null)
            }).then((data)=>{
                if (data?.data?.appointment?.event){
                    resolve(data?.data?.appointment?.event)
                }else reject(null)
            })
        })
    }

    updatePaginationByAppointment(appointmentId) {
        console.log("updatePaginationByAppointment, appointmentId:", appointmentId)
        const filters = this.eventsBlockStore.getFilters()
        if (appointmentId && filters.appointment){
            const foundIndex = this.state.events.findIndex(obj => obj.appointment && obj.appointment.appointmentId === appointmentId);
            if (foundIndex!==-1){
                this.getAppointmentEvent(appointmentId).then((appointmentEvent)=>{
                    if (appointmentEvent){
                        const updatedEvents = this.state.events.map((event, index) => {
                            if (index === foundIndex) {
                                return appointmentEvent
                            }
                            return event;
                        });
                        this.setEvents(updatedEvents)
                    }
                })
            }else{
                this.searchAgain()
            }
        }
    }

    getInfoBlockEvent(id){
        return new Promise((resolve, reject)=>{
            client.query({
                query: INFO_BLOCK_EVENT,
                variables: {
                    id: id
                }
            }).catch(()=>{
                reject(null)
            }).then((data)=>{
                if (data?.data?.infoRecord?.event){
                    resolve(data?.data?.infoRecord?.event)
                }else reject(null)
            })
        })
    }

    updatePaginationByInfoBlock(infoBlockId) {
        const filters = this.eventsBlockStore.getFilters()
        if (infoBlockId && filters.infoBlock){
            const foundIndex = this.state.events.findIndex(obj => obj.infoRecord && obj.infoRecord.id === infoBlockId);
            if (foundIndex!==-1){
                this.getInfoBlockEvent(infoBlockId).then((infoRecordEvent)=>{
                    if (infoRecordEvent){
                        const updatedEvents = this.state.events.map((event, index) => {
                            if (index === foundIndex) {
                                return infoRecordEvent
                            }
                            return event;
                        });
                        this.setEvents(updatedEvents)
                    }
                })
            }else{
                this.searchAgain()
            }
        }
    }

    updateCallEvent(callId){
        const filters = this.eventsBlockStore.getFilters()
        if (callId && filters.calls){
            const foundIndex = this.state.events.findIndex(obj => obj.call && obj.call.id === callId);
            if (foundIndex!==-1){
                client.query({
                    query: CALL_EVENT,
                    variables: {
                        callId: callId
                    }
                }).then((data)=>{
                    console.log("new event", data?.data?.call?.event)
                    if (data?.data?.call?.event){
                        const updatedEvents = this.state.events.map((event, index) => {
                            if (index === foundIndex) {
                                return data?.data?.call?.event
                            }
                            return event;
                        });
                        this.setEvents(updatedEvents)
                    }
                })
            }
        }
    }

    deleteAppointment(appointmentId) {
        const filters = this.eventsBlockStore.getFilters()
        if (appointmentId && filters.appointment){
            const updatedEvents = this.state.events.filter((item) => {
            if (item.appointment) {
                return item.appointment.appointmentId !== appointmentId;
                } else {
                return true
                }
            })
            this.setEvents(updatedEvents)
            this.setOffset(this.state.offset-1)
            this.setEventsQty(this.state.eventsQty-1)
        }
    }

    deleteInfoBlock(infoBlockId){
        const filters = this.eventsBlockStore.getFilters()
        if (infoBlockId && filters.infoBlock){
            const updatedEvents = this.state.events.filter((item) => {
                if (item.infoRecord) {
                    return item.infoRecord.id !== infoBlockId;
                } else {
                    return true
                }
            })
            this.setEvents(updatedEvents)
            this.setOffset(this.state.offset-1)
            this.setEventsQty(this.state.eventsQty-1)
        }
    }

    callBySubscription(callId){
        const foundIndex = this.state.events.findIndex(obj => obj.call && obj.call.id === callId)
        if (foundIndex!==-1){
            client.query({
                query: CALL_EVENT,
                variables: {
                    callId: callId
                }
            }).then((data)=>{
                if (data?.data?.call?.event){
                    const updatedEvents = this.state.events.map((event, index) => {
                        if (index === foundIndex) {
                            return data?.data?.call?.event
                        }
                        return event;
                    });
                    this.setEvents(updatedEvents)
                }
            })
        }else{
            client.query({
                query: CALL_EVENT,
                variables: {
                    callId: callId
                }
            }).then((data)=>{
                if (data?.data?.call?.event){
                    const filters = this.eventsBlockStore.getFilters()
                    if (filters.searchDirection==="desc"){
                        const sortedEvents = [ data?.data?.call?.event, ...this.state.events ].sort((a, b) => {
                            if (a.eventDatetimeStart < b.eventDatetimeStart) {
                              return 1
                            }
                            if (a.eventDatetimeStart > b.eventDatetimeStart) {
                              return -1
                            }
                            return 0
                          });
                        this.setEvents(sortedEvents)
                        this.setEventsQty(this.state.eventsQty+1)
                        this.setOffset(this.state.offset+1)
                    }else{
                        if (this.state.eventsQty > this.state.events?.length){
                            const sortedEvents = [ data?.data?.call?.event, ...this.state.events ].sort((a, b) => {
                                if (a.eventDatetimeStart > b.eventDatetimeStart) {
                                return 1
                                }
                                if (a.eventDatetimeStart < b.eventDatetimeStart) {
                                return -1
                                }
                                return 0
                            });
                            this.setEvents(sortedEvents)
                            this.setEventsQty(this.state.eventsQty+1)
                            this.setOffset(this.state.offset+1)
                        }
                    }
                }
            })
        }
    }

    callBySubscriptionRemoveCurrentCall(){
        const call = this.state.events.find((obj => obj.call && ["ACCEPTED"].includes(obj.call.status)))
        if (call?.call?.id){
            this.callBySubscription(call.call.id)
        }
    }

    callBySubscriptionRemovedCall(){
        const call = this.state.events.find((obj => obj.call && ["NOT_ACCEPTED", "TALKING_END", "ENDED", "MISSED"].includes(obj.call.status)))
        if (call?.call?.id){
            this.callBySubscription(call.call.id)
        }
    }

    updateSheduleEventByEvent(event){
        const filters = this.eventsBlockStore.getFilters()
        if (event && filters.sheduleRecords){
            const foundIndex = this.state.events.findIndex(obj => obj.id === event.id);
            if (foundIndex!==-1){
                const updatedEvents = this.state.events.map((item, index) => {
                    if (index === foundIndex) {
                        return event
                    }
                    return item;
                });
                this.setEvents(updatedEvents)
            }
        }
    }

    constructor() {
        makeAutoObservable(this)
        this.requestEvents()
    }

}