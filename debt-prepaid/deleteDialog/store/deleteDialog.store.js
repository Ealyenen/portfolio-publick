import {
    makeAutoObservable,
    toJS
} from "mobx";

export default class DeleteDialogStore {

    state = {
        openModal: false,
        id: null,
        created: null,
        type: null
    }

    getOpenModal () {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    getId() {
        return this.state.id
    }

    setId(id) {
        this.state.id = id
    }

    getCreated() {
        return this.state.created
    }

    setCreated(date) {
        this.state.created = date
    }

    getType() {
        return this.state.type
    }

    setType(type) {
        this.state.type = type
    }

    resetAndClose() {
        this.setCreated(null)
        this.setId(null)
        this.setType(null)
        this.setOpenModal(false)
    }

    handleOpenModal(id, date, type){
        this.setCreated(date)
        this.setId(id)
        this.setType(type)
        this.setOpenModal(true)
    }

    constructor() {
        makeAutoObservable(this)
    }
}