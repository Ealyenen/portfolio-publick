import {
    makeAutoObservable
} from "mobx";

export default class MemoryAppointmentStore {

    //openModal is used for can user see modal or no
    //mode is used for choosing modal mode - values: base/drag
    //mode drag is need for watching modal in a small window, what you can drag throw page
    //this mode is used only on desctop as on mobile is no space for it
    modalState = {
        openModal: false,
        mode: "base",
        appointmentIndex: 0,
        appointmentWatchingId: null,
        openMenu: null, //anhor el for menu
        openMobileMenu: false,
        updateAppointments: false, //flag for request
    }

    getAppointmentWatchingId() {
        return this.modalState.appointmentWatchingId
    }

    setAppointmentWatchingId(id) {
        this.modalState.appointmentWatchingId = id
    }

    getAppointmentIndex() {
        return this.modalState.appointmentIndex
    }

    setAppointmentIndex(index) {
        this.modalState.appointmentIndex = index
    }

    //get/set open modal

    getOpenModal() {
        return this.modalState.openModal
    }

    setOpenModal(value) {
        if (value === false) {
            this.modalState.mode = "base"
            this.setAppointmentIndex(0)
            this.setAppointmentWatchingId(null)
        }
        this.modalState.openModal = value
    }

    // get/ setters of mode
    changeModeToDrag() {
        this.modalState.mode = "drag"
    }

    changeModeToBase() {
        this.modalState.mode = "base"
    }

    switchMode() {
        switch (this.modalState.mode) {
            case "base":
                this.changeModeToDrag()
                break
            case "drag":
                this.changeModeToBase()
                break
            default:
                this.changeModeToDrag()
                break
        }
    }

    getMode() {
        return this.modalState.mode
    }

    getOpenMenu() {
        return this.modalState.openMenu
    }

    setOpenMenu(value) {
        this.modalState.openMenu = value
    }

    getUpdateAppointments() {
        return this.modalState.updateAppointments
    }

    setUpdateAppointments(value) {
        this.modalState.updateAppointments = value
    }

    getOpenMobileMenu() {
        return this.modalState.openMobileMenu
    }

    setOpenMobileMenu(value) {
        this.modalState.openMobileMenu = value
    }

    switchOpenMobileMenu() {
        this.modalState.openMobileMenu = !this.modalState.openMobileMenu
    }

    constructor() {
        makeAutoObservable(this)
    }

}