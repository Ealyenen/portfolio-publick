import { makeAutoObservable } from "mobx";

export default class SheduleSmsTemplatesStore {

    state = {
        openModal: false,
        writeType: null,
        smsBlockIndex: null,
        textIndex: null,
        writeData: null
    }

    get openModal() {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    setOpenModalFromSmsInWrite(writeType, smsBlockIndex, textIndex, writeData) {
        this.setOpenModal(true)
        this.state.writeType = writeType
        this.state.smsBlockIndex = smsBlockIndex
        this.state.textIndex = textIndex
        this.state.writeData = writeData
    }

    get writeType() {
        return this.state.writeType
    }
    
    get smsBlockIndex() {
        return this.state.smsBlockIndex
    }

    get textIndex() {
        return this.state.textIndex
    }

    get writeData() {
        return this.state.writeData
    }


    constructor() {
        makeAutoObservable(this)
    }

}