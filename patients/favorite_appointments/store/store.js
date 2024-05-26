import {makeAutoObservable} from "mobx";

export default class StoreFavoriteAppointmentsModal {
  openModal = false

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(open) {
    this.openModal = open
  }
}

export class StoreFavoriteAppointmentsGalleryModal {
  openModal = false
  photos = []
  indexPhoto = 0

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(data, index) {
    this.openModal = true
    this.photos = data
    this.indexPhoto = index
  }

  setCloseModal() {
    this.openModal = false
    this.photos = []
    this.indexPhoto = 0
  }

}