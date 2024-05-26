import {makeAutoObservable} from "mobx";

export default class StoreOtherCommunicationsModal {
  openModal = false
  displayEditor = 'block'
  displayMessages = 'none'

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(open) {
    this.openModal = open
    this.displayEditor = 'block'
    this.displayMessages = 'none'
    this.editorValue = ''
  }

  setOpenMessages(open) {
    if (open) {
      this.displayEditor = 'none'
      this.displayMessages = 'flex'
    } else {
      this.displayEditor = 'block'
      this.displayMessages = 'none'
    }
  }
}