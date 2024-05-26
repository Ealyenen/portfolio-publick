import { makeAutoObservable } from "mobx"
import { client } from "../../../../../../_common/http/appoloClient"
import { GET_ADDITION_BY_ID } from "../../../../_queries/patients.queries"
import moment from "moment"

export class StoreDownLoadModal {

  state = {
    openModal: false,
    preloader: false,
    photos: [],
    photosToDownLoad: [],
    patientName: "",
    createdArchive: "",
    checkedPhotos: [],
  }

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal() {
    this.state.openModal = true
  }

  setPreloader(data) {
    this.state.preloader = data
  }

  get preloader() {
    return this.state.preloader
  }

  get modal() {
    return this.state.openModal
  }

  setCloseModal() {
    this.state.openModal = false
  }

  setPhotosClear() {
    this.state.photos = []
  }

  setAllImagesToUnSelect(data) {

    this.state.photos.forEach((item, index) => {

      item.checked = false
      item.styles.border = "none"
      item.styles.filter = "none"
      item.styles.transform = "scale(0.9)"
    })
  }

  setPhotosListToDownLoad(photos) {
    this.state.photosToDownLoad = photos
  }

  setPhotosToDownloadToClear() {
    this.state.photosToDownLoad = []
  }

  setPatientNameClear() {
    this.state.patientName = ""
  }

  get getPatientNameClear() {
    return this.state.patientName
  }

  setCreatedArchiveClear() {
    this.state.createdArchive = ""
  }


  async setOpenDownLoadAddition(id) {
    this.setPreloader(true)
    this.state.id = id
    this.state.isAlreadyExist = true


    await client.query({
      query: GET_ADDITION_BY_ID,
      variables: {
        id: id
      },
    }).then((data) => {

      this.state.patientName = `${data.data.infoRecord.patient.lastName} ${data.data.infoRecord.patient.firstName} ${data.data.infoRecord.patient?.patronymic ? data.data.infoRecord.patient.patronymic : ""}`
      this.state.createdArchive = moment(new Date()).format('YYYY-MM-DD')

      data.data.infoRecord.images.forEach((item) => {
        this.state.photos.push({
          url: item.image300Link,
          photo: item.image,
          fileName: item.imageName,
          existed: true,
          id: item.id,
          order: item.order,
          checked: false,
          styles: {
            border: "none",
            filter: "none",
            transform: "scale(0.9)",
          }
        })
      })
      this.setPreloader(false)
    })

    if (this.state.photos?.length > 0) {
      this.setOpenModal()
    }
  }

  setStyledCheckedImage(index) {


    if (this.state.photos[index].checked !== true) {
      this.state.photos[index].checked = true
      this.state.photos[index].styles.border = "6px solid"
      this.state.photos[index].styles.filter = "brightness(80%)"
      this.state.photos[index].styles.transform = "scale(1)"
    } else if (this.state.photos[index].checked === true) {

      this.state.photos[index].checked = false
      this.state.photos[index].styles.border = "none"
      this.state.photos[index].styles.filter = "none"
      this.state.photos[index].styles.transform = "scale(0.9)"

    }
  }

  setAllImagesToSelect(data) {

    this.state.photos.forEach((item, index) => {
      item.checked = true
      item.styles.border = "6px solid #5F66BF"
      item.styles.filter = "brightness(80%)"
      item.styles.transform = "scale(1)"
    })
  }

  async setDownloadFiles() {
    this.setPreloader(true)
    const urlsToDownload = []

    this.state.photos.forEach((el) => {
      if (el.checked === true) {
        urlsToDownload.push(el.url)
      }
    })

    // var downloadArray = "["
    // this.state.photos.map((photoItem) => {
    //   if (photoItem.checked === true) {
    //     downloadArray += `"${photoItem.url}", `
    //   }

    // })
    // downloadArray = downloadArray.slice(0, -2)
    // downloadArray += "]"
    // var data = new FormData();
    // data.append("json", JSON.stringify([
    //   "https://651815.selcdn.ru/test/patient_files/patient_22703/inforecord_61/0d18ab31535de4bde856f6705c13d49a.jpg",
    //   "https://651815.selcdn.ru/test/patient_files/patient_22703/inforecord_61/5bfb98b609d211674ecc8718.jpg"
    // ]));

    var downloadArray = "["

    urlsToDownload.map((url) => {
      return downloadArray += `"${url}", `
    })
    downloadArray = downloadArray.slice(0, -2)
    downloadArray += "]"

    if (urlsToDownload?.length === 1) {

      await fetch(urlsToDownload[0])
        .then(res => res.blob())
        .then((blob) => {
          const file = new File([blob], `${this.state.patientName} ${this.state.createdArchive}`, {type: blob.type})
          const downLoadUrl = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = downLoadUrl
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          link.remove()
          this.setPreloader(false)
        })
    }

    if (urlsToDownload?.length > 1) {

      await fetch(`${process.env.REACT_APP_API_ENDPOINT}_images/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:
        downloadArray
      })
        .then(res => res.blob())
        .then((blob) => {

          const file = new File([blob], `${this.state.patientName} ${this.state.createdArchive}`, {type: blob.type})
          const downLoadUrl = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = downLoadUrl
          link.download = file.name
          document.body.appendChild(link)
          link.click()
          link.remove()
          this.setPreloader(false)
        })
    }
  }


  get photos() {
    return this.state.photos
  }
}