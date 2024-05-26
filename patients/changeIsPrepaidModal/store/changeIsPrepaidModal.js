import {
    makeAutoObservable
} from "mobx";

export default class ChangeIsPrepaidModalStore {

    state = {
        openModal: false
    }

    getOpenModal() {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    constructor() {
        makeAutoObservable(this)
    }

}