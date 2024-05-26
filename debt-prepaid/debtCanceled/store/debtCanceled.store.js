import {
    makeAutoObservable,
    toJS,
} from "mobx";

export default class DebtCanceledModalStore {

    state = {
        openModal: false,
        payType: '',
        data: null,
        comment: '',
        payTypeError: false,
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

    getPayTypeError() {
        return this.state.payTypeError
    }

    setPayTypeError(value) {
        this.state.payTypeError = value
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

    getPayTypes () {
        return this.payTypes
    }

    reset() {
        this.setComment('')
        this.setData(null)
        this.setPayType('')
        this.setPayTypeError(false)
    }

    constructor() {
        makeAutoObservable(this)
    }
}