import { makeAutoObservable, toJS } from "mobx";
import { client } from "../../../../_common/http/appoloClient";
import { CREATE_ADDITION, DELETE_ADDITION, UPDATE_ADDITION } from "../../_mutations/patients.mutations";
import { GET_ADDITION_BY_ID } from "../../_queries/patients.queries";

export default class AdditionStore {
  state = {
    openModal: false,
    id: null,
    isAlreadyExist: false,
    text: '',
    photos: [],
    patientId: null,
    deleteImages: [],
    preloader: false,
    openDeleteDialog: false,
    incorrectPhotos: [],
    dropingPhoto: null
  }

  getId() {
    return this.state.id
  }

  setAddIncorrectPhoto(obj) {
    this.state.incorrectPhotos.push(obj)
  }

  setResetIncorectPhotos() {
    this.state.incorrectPhotos = []
  }

  setResetStore() {
    this.state.id = null
    this.state.isAlreadyExist = false
    this.state.text = ''
    this.state.photos = []
    this.state.deleteImages = []
    this.state.preloader = false
    this.state.incorrectPhotos = []
  }

  setOpenedDeleteDialog() {
    this.state.openDeleteDialog = true
  }

  setCloseDeleteDialog() {
    this.state.openDeleteDialog = false
  }

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(open) {
    this.state.openModal = open
    if (open === false) {
      this.setResetStore()
    }
  }

  setPatientId(id) {
    this.state.patientId = id
  }

  setId(id) {
    this.state.id = id
  }

  setText(text) {
    this.state.text = text
  }

  setPhotos(photosArray) {
    this.state.photos = photosArray
  }

  setDropingPhoto(data) {
    this.state.dropingPhoto = data
  }

  setPhotosOrder() {

    this.state.photos.map((photo, index) => {
      return photo.order = index + 1
    })
  }

  setSortPhotos() {

    this.state.photos.sort((a, b) => {
      // ((a.order > b.order ? 1 : b.order > a.order) ? -1 : 0)
      if (a.order > b.order) return 1
      else if (a.order < b.order) return -1
      else return 0
    })
    // this.setPhotosOrder()
  }

  async setAddPhotos(photo) {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    const waitEvent = (condition) => {
      if (condition) {
        return true
      }
    }
    for (let i = 0; i < photo.length; i++) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(photo[i]);
      this.state.photos.push({
        url: fileReader.result,
        photo: photo[i],
        existed: false,
        id: `new${this.state.photos.length + 1}`,
        order: this.state.photos.length + 1
      })
      fileReader.onload = () => {
      }
      fileReader.onloadend = () => {
        this.state.photos[this.state.photos.length - 1].url = fileReader.result
      }
      while (waitEvent(this.state.photos[this.state.photos.length - 1].url) !== true) {
        await timer(200)
      }
    }
    await this.setSortPhotos()
  }

  setResetPhotos() {

    this.state.photos.forEach((item) => {
      if (item.existed === true) {
        this.state.deleteImages.push(item.id)
      }
    })
    this.state.photos = []
  }

  setResetPhotosByIndex(index) {
    if (this.state.photos[index].existed === true) {
      this.state.deleteImages.push(this.state.photos[index].id)
    }
    this.state.photos.splice(index, 1)
  }

  createAddition() {
    return new Promise((resolve, reject) => {
      const images = this.state.photos.map((item) => {
        return {image: item.photo, order: item.order}
      })
      client.mutate({
        mutation: CREATE_ADDITION,
        variables: {
          input: {
            patientId: this.state.patientId,
            text: this.state.text,
            images: images,
          },
        },
      }).then((data) => {
        if (data){
          resolve(data?.data?.createInfoRecord?.infoRecord?.id)
        }else{
          reject(null)
        }
      })
    })
    
  }

  updateAddition() {
    return new Promise((resolve) => {
      const images = []
      this.state.photos.forEach((item) => {
        if (!item.existed) {
          images.push({image: item.photo, order: item.order})
        }
        if (item.existed) {
          images.push({imageId: item.id, order: item.order})
        }
      })
      this.state.deleteImages.forEach((item) => {
        images.push({imageId: item, isDelete: true})
      })
      client.mutate({
        mutation: UPDATE_ADDITION,
        variables: {
          input: {
            infoRecordId: this.state.id,
            patientId: this.state.patientId,
            text: this.state.text,
            images: images,
          },
        },
      }).then(() => {
        resolve(true)
      })
    })
    
  }

  setDeleteAddition() {
    return new Promise((resolve)=>{
        client.mutate({
        mutation: DELETE_ADDITION,
        variables: {
          infoRecordId: this.state.id
        }
      }).then(() => {
        this.state.openDeleteDialog = false
        this.state.openModal = false
        this.setResetStore()
        resolve(true)
      })
    })
    
  }

  setSave() {
    this.state.preloader = true
    return new Promise((resolve, reject) => {
      if (this.state.isAlreadyExist === true) {
        this.updateAddition().then(()=>{
          resolve(this.state.id)
        })
      } else {
        this.createAddition().then((infoBlockId)=>{
          if (infoBlockId){
            resolve(infoBlockId)
          }else reject(null)
        })
      }
    })
  }


  async setOpenRedactionAddition(id) {
    this.state.preloader = true
    this.state.id = id
    this.state.isAlreadyExist = true
    this.setOpenModal(true)

    await client.query({
      query: GET_ADDITION_BY_ID,
      variables: {
        id: id
      },
    }).then((data) => {
      this.state.text = data.data.infoRecord.text

      data.data.infoRecord.images.forEach((item) => {
        this.state.photos.push({
          url: item.image300Link,
          existedUrl: item?.imageLink,
          photo: item.file,
          fileName: item.imageName,
          existed: true,
          id: item.id,
          order: item.order
        })
      })
      this.state.preloader = false
      this.setSortPhotos()
    })
  }

  async setDownloadFiles() {
    // this.state.photos.map((photoItem) => {
    //   fetch(photoItem.url)
    //   .then(res => res.blob())
    //   .then((blob) => {
    //     const file = new File([blob], "imageName", {type: blob.type})
    //     const downLoadUrl = window.URL.createObjectURL(blob)
    //     const link = document.createElement('a')
    //     link.href = downLoadUrl
    //     link.download = file.name
    //     document.body.appendChild(link)
    //     link.click()
    //     link.remove()
    //   })
    // })
    this.state.preloader = true

    var downloadArray = "["

    this.state.photos.map((photoItem) => {
      return downloadArray += `"${photoItem.url}", `
    })

    downloadArray = downloadArray.slice(0, -2)
    downloadArray += "]"

    var data = new FormData();
    data.append("json", JSON.stringify([
      "https://651815.selcdn.ru/test/patient_files/patient_22703/inforecord_61/0d18ab31535de4bde856f6705c13d49a.jpg",
      "https://651815.selcdn.ru/test/patient_files/patient_22703/inforecord_61/5bfb98b609d211674ecc8718.jpg"
    ]));

    await fetch(`${process.env.REACT_APP_API_ENDPOINT}_images/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:
      data
    })
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], "arhiveName", {type: blob.type})
        const downLoadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downLoadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.state.preloader = false
      })

  }

  setRemoveSuperposePhotoCard() {

    this.state.photos.forEach((item, index) => {
      if (item?.superpose === true) {
        this.state.photos.splice(index, 1)
      }
    })
  }

  setVoidPhoto(photoCard) {

    for (var i = 0; i < this.state.photos.length; i++) {
      if (this.state.photos[i].id === photoCard.id) {
        this.setRemoveSuperposePhotoCard()
        if (!this.state.photos[i]?.id) {
          this.state.photos.push({
            superpose: true,
            id: "superpose",
            order: this.state.photos[this.state.photos.length - 1].order
          })
        } else {
          this.state.photos.splice(i, 0, {superpose: true, id: "superpose", order: this.state.photos[i].order})
        }

        this.state.photos.forEach((item, index) => {
          if (item.id === this.state.dropingPhoto.id) {
            this.state.photos.splice(index, 1)
          }
        })
        break
      }
    }
  }

  setDropCard(photoCard) {
    for (var i = 0; i < this.state.photos.length; i++) {
      if (this.state.photos[i]?.superpose) {
        this.state.photos[i] = this.state.dropingPhoto
        break
      }
    }
    this.setPhotosOrder()
  }

  setResetDroppingPhotoCard() {
    let isDraged = false

    this.state.photos.map((item) => {
      if (item.id === this.state.dropingPhoto.id) {
        return isDraged = true
      }
    })
    if (!isDraged) {
      this.state.photos.push(this.state.dropingPhoto)
      this.setSortPhotos()
      this.setRemoveSuperposePhotoCard()
    }
  }

  setReplacePhotoTop(index) {
    this.state.photos[index].order -= 1.5
    this.setSortPhotos()
    this.setPhotosOrder()
  }

  setReplacePhotoDown(index) {
    this.state.photos[index].order += 1.5
    this.setSortPhotos()
    this.setPhotosOrder()
  }

  get openModal() {
    return this.state.openModal
  }

  get id() {
    return this.state.id
  }

  get isAlreadyExist() {
    return this.state.isAlreadyExist
  }

  get text() {
    return this.state.text
  }

  get photos() {
    return toJS(this.state.photos)
  }

  get preloader() {
    return this.state.preloader
  }

  get openDeleteDialog() {
    return this.state.openDeleteDialog
  }

  get incorrectPhotos() {
    return toJS(this.state.incorrectPhotos)
  }

  get dropingPhoto() {
    return this.state.dropingPhoto
  }
}