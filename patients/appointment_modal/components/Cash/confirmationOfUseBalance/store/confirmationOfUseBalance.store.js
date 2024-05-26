import {makeAutoObservable} from "mobx";

export default class StoreConfirmationOfUseBalanceForCheque {
  
  state={
    openModal: false,
    confirmed: false,
    summ: 0,
    cheque: "",
  }

  constructor() {
    makeAutoObservable(this)
  }

  get summ () {
    return this.state.summ
  }

  setSumm (summ) {
    this.state.summ = summ
  }

  get cheque () {
    return this.state.cheque
  }

  setCheque (id) {
    this.state.cheque = id
  }

  get openModal () {
    return this.state.openModal
  }

  setOpenModal(value) {
    this.state.openModal = value
  }

  setReset() {
    this.state.openModal = false
    this.state.confirmed = false
    this.state.summ = 0
    this.state.cheque = ""
  }

  get confirmed() {
    return this.state.confirmed
  }

  setConfirmed(value) {
    this.state.confirmed = value
  }

}