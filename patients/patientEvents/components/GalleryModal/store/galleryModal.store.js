import { makeAutoObservable } from "mobx";

export default class StoreGalleryModal {
    openModal = false
    photos = []
    indexPhoto = 0
    loading = false
  
    constructor() {
      makeAutoObservable(this)
    }
  
    setOpenModal(data, index) {
      this.openModal = true
      this.loading = true
      this.photos = data
      this.indexPhoto = index
      this.loading = false
    }
  
    setCloseModal() {
      this.openModal = false
      this.photos = []
      this.indexPhoto = 0
    }
  }