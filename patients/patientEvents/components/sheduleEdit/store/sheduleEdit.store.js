import { makeAutoObservable } from "mobx";

export default class SheduleEditModalStore {

  state = {
    openModal: false,
    data: null,
    comment: ''
  }

  getOpenModal() {
    return this.state.openModal
  }

  setOpenModal(value) { 
    return this.state.openModal = value
  }

  getData() {
    return this.state.data
  }

  setData(shedule) {
    this.state.data = shedule
    if (shedule){
        this.state.comment = this.state.data.description
    }
  }

  getComment() {
    return this.state.comment
  }

  setComment(str) {
    this.state.comment = str
  }

  get isCommentChanged() {
    return this.state.comment!==this.state.data.description
  }

  resetCommentToDataComment() {
    this.state.comment = this.state.data.description
  }

  reset() {
    this.setComment('')
    this.setData(null)
  }

  constructor() {
    makeAutoObservable(this)
  }


}