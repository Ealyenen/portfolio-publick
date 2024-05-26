import {
    makeAutoObservable,
    toJS
} from "mobx";

export default class AppointmentStore {

    state = {
        isMobile: null,
        tabValue: 0
    }

    appointment = null

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
    
    getTabValue() {
        return this.state.tabValue
    }

    setTabValue(value){
        this.state.tabValue = value
    }

    constructor() {
        makeAutoObservable(this)
    }

}