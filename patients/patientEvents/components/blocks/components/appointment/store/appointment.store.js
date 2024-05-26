import {
    makeAutoObservable,
    toJS
} from "mobx";

export default class AppointmentStore {

    state = {
        watchDetailed: false,
        isMobile: null
    }

    appointment = null

    getWatchDetailed() {
        return this.state.watchDetailed
    }

    setWatchDetailed(value) {
        this.state.watchDetailed = value
    }

    getIsMobile() {
        return this.state.isMobile
    }

    setIsMobile(value) {
        this.state.isMobile = value
    }

    getAppointment() {
        return toJS(this.appointment)
    }

    setAppointment(data) {
        this.appointment = data
    }

    get sortedPhotos(){
        let images = this.appointment?.appointmentImages.slice()
        images?.sort((a,b) => {
            if (a.order > b.order) return 1
            else if (a.order < b.order) return -1
            else return 0
        })
        return images || null
    }
    

    constructor() {
        makeAutoObservable(this)
    }

}