import {
    makeAutoObservable
} from "mobx";

export default class ChangeBalanceModalStore {

    state = {
        openModal: false,
        balanceOperationType: "+",
        valueForBalanceChanging: ""
    }

    operationTypes = [{
            name: "Внести",
            type: "+"
        },
        {
            name: "Списать",
            type: "-"
        },
        {
            name: "Корректировка баланса",
            type: "hardWrite"
        },
    ]

    getOpenModal() {
        return this.state.openModal
    }

    setOpenModal(value) {
        this.state.openModal = value
    }

    getOperationTypes() {
        return this.operationTypes
    }

    getBalanceOperationType() {
        return this.state.balanceOperationType
    }

    setBalanceOperationType(type) {
        this.state.balanceOperationType = type
    }

    get valueForBalanceChanging() {
        return this.state.valueForBalanceChanging
    }

    setValueForBalanceChanging(num) {
        this.state.valueForBalanceChanging = num
    }

    resetStore () {
        this.setBalanceOperationType("+")
        this.setValueForBalanceChanging("")
    }

    constructor() {
        makeAutoObservable(this)
    }

}