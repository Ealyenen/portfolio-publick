import {
    makeAutoObservable,
    toJS,
} from "mobx";

export default class EditModalStore {

    state = {
        openModal: false,
        payType: '',
        data: null,
        notRepaid: false,
        comment: '',
        openConfirmation: false
    }

    payTypes = [{
            type: "CASH",
            name: "Наличный расчет"
        },
        {
            type: "NON_CASH",
            name: "Безналичный расчет"
        },
    ]

    getOpenConfirmation() {
        return this.state.openConfirmation
    }

    setOpenConfirmation(value) {
        this.state.openConfirmation = value
    }

    getOpenModal() {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    getPayType() {
        return this.state.payType
    }

    setPayType(type) {
        this.state.payType = type
    } 

    getComment() {
        return this.state.comment
    }

    isCommentChanged() {
        return this.state.comment!==this.state.data.comment
    }

    resetCommentToDataComment() {
        this.state.comment = this.state.data.comment
    }

    setComment(str) {
        this.state.comment = str
    }

    getData() {
        return this.state.data
    }

    setData(data) {
        this.state.data = data
        if (data){
            this.setComment(data.comment)
        }
    }

    getNotRepaid() {
        return this.state.notRepaid
    }

    setNotRepaid(value) {
        this.state.notRepaid = value
    }

    switchNotRepaid() {
        const prev = this.state.notRepaid
        this.setNotRepaid(!prev)
        if (!prev===true){
            this.setPayType('')
        }
    }

    getPayTypes () {
        return this.payTypes
    }

    get status () {
        if (this.state.data?.operationType==="DUTY"){
            if(this.state.notRepaid){
                return "DEBT_NOT_REPAYED"
            }else if (this.state.payType){
                return "DEBT_CANCELED"
            }
        }else if (this.state.payType){
            return "ADVANCE_CANCELED"
        }
        return undefined
    }

    reset() {
        this.setComment('')
        this.setData(null)
        this.setNotRepaid(false)
        this.setOpenConfirmation(false)
        this.setPayType('')
    }

    constructor() {
        makeAutoObservable(this)
    }
}