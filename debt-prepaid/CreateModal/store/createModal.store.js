import {
    makeAutoObservable,
    toJS,
} from "mobx";

export default class CreteModalStore {

    state = {
        openModal: false,
        amountError: false,
        patientError: false,
        typeError: false
    }

    amount = ''
    patient = null
    type = ''
    comment = ''

    types = [{
        type: "DUTY",
        name: "Долг"
    },
    {
        type: "ADVANCE",
        name: "Аванс"
    },
]

    getOpenModal() {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    getAmountError() {
        return this.state.amountError
    }

    setAmountError(value) {
        this.state.amountError = value
    }

    getPatientError() {
        return this.state.patientError
    }

    setPatientError(value) {
        this.state.patientError = value
    }

    getTypeError() {
        return this.state.typeError
    }

    setTypeError(value) {
        this.state.typeError = value
    }

    getAmount() {
        return this.amount
    }

    setAmount(newAmount) {
        this.amount = newAmount
        if (newAmount){
            this.setAmountError(false)
        }
    }

    getPatient() {
        return this.patient
    }

    setPatient(patient) {
        this.patient = patient
        if (patient){
            this.setPatientError(false)
        }
    }

    getType() {
        return this.type
    }

    setType(id) {
        this.type = id
        if (id){
            this.setTypeError(false)
        }
    }

    getTypes() {
        return this.types
    }

    getComment() {
        return this.comment
    }

    setComment(str) {
        this.comment = str
    }

    checkData() {
        return new Promise((resolve, reject)=>{
            let errors = false
            if (!this.amount?.length>0){
                this.setAmountError(true)
                errors = true
            }
            if (!this.type?.length>0){
                this.setTypeError(true)
                errors = true
            }
            if (!this.patient){
                this.setPatientError(true)
                errors = true
            }
            if (errors){
                alert("Заполните недостающие данные")
                reject(false)
            }else resolve(true)
        })
        
    }

    resetStore() {
        this.setAmount('')
        this.setAmountError(false)
        this.setPatient(null)
        this.setPatientError(false)
        this.setType('')
        this.setTypeError(false)
        this.setComment('')
    }

    constructor() {
        makeAutoObservable(this)
    }
}