import {makeAutoObservable} from "mobx";

export default class StoreAppointmentModal {
  
  state={
    infoExpand: true,
    openModal: false,
    tabValue: 0,
    deleteAppointmentModalOpen: false,
    actionWait: false,
    deletePhotoModalOpen: false,
    deletePhotosModalText: "",
  }

  constructor() {
    makeAutoObservable(this)
  }

  get actionWait() {
    return this.state.actionWait
  }

  get deleteAppointmentModalOpen() {
    return this.state.deleteAppointmentModalOpen
  }

  get deletePhotoModalOpen() {
    return this.state.deletePhotoModalOpen
  }

  get deletePhotosModalText() {
    return this.state.deletePhotosModalText
  }

  get infoExpand() {
    return this.state.infoExpand
  }

  get openModal() {
    return this.state.openModal
  }

  get tabValue() {
    return this.state.tabValue
  }

  setActionWait(value) {
    this.state.actionWait = value
  }

  setInfoExpandToggle() {
    this.state.infoExpand = !this.state.infoExpand
  }

  setInfoExpand(isExpand) {
    this.state.infoExpand = isExpand
  }

  setOpenModal(openModal, patient) {
    this.state.openModal = openModal
  }

  setTabValue(value) {
    this.state.tabValue = value
  }

  setDeleteAppointmentModalOpen(value) {
    this.state.deleteAppointmentModalOpen = value
  }

  setDeletePhotosModalText (text) {
    this.state.deletePhotosModalText = text
  }

  setDeletePhotoModalOpen(value) {
    this.state.deletePhotoModalOpen = value
    if (!value) {
      this.setDeletePhotosModalText()
    }
  }
}