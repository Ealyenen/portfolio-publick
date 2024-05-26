import {
    makeAutoObservable,
    toJS
} from "mobx";

export default class WatchModalStore {

    state = {
        openModal: false,
        data: null
    }

    getOpenModal () {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    getData() {
        return this.state.data
    }

    setData(data) {
        this.state.data = data
    }

    constructor() {
        makeAutoObservable(this)
    }
}