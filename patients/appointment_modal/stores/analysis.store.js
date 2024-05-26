import {makeAutoObservable} from "mobx";
import moment from "moment";
import {client} from "../../../../_common/http/appoloClient";
import { UPDATE_APPOINTMENT } from "../_mutations/newAppointment.mutations";
import { ANALISIS } from "../_queries/Appointment.queries";
import { inject } from "react-ioc";
import StoreAppointmentModal from "./store";
import { parseAnalisisNamesAndDates } from "../../../../_common/helpers/analisisParse";
import { parseAnalisisNamesAndDatesToJSON } from "../../../../_common/helpers/analisisParse";


export default class StoreAppointmentAnalsies {
  viewStore = inject(this, StoreAppointmentModal)
  
  state={
    analysisTypes: [],
    appointmentId: "",
    activeAnalysisId: "",
    text: "",
    photos: [],
    incorrectPhotos: [],
    dropingPhoto: null,
    datesAndNames: [],
    errorNames: [],
    errorDates: [],
    shortName: "",
    waitingDate: "",
    waitingDays: "",
    date: "",
    center: "",
    existedId: null,
    deleteImages: [],
  }

  commonInfo = {
    isLoadingInfo: false,
    analisisDateError: false
  }

  constructor() {
    makeAutoObservable(this)
  }

  get errorNames() {
    return this.state.errorNames
  }

  get errorDates() {
    return this.state.errorDates
  }

  setErrorNames(arr) {
    this.state.errorNames = arr
  }

  setErrorDates(arr) {
    this.state.errorDates = arr
  }

  removeFromErrorNames(num) {
    const index = this.state.errorNames.indexOf(num);
    if (index !== -1) {
      this.state.errorNames.splice(index, 1);
    }
  }

  removeFromErrorDates(num) {
    const index = this.state.errorDates.indexOf(num);
    if (index !== -1) {
      this.state.errorDates.splice(index, 1);
    }
  }

  get datesAndNames() {
    return this.state.datesAndNames
  }

  setDatesAndNames(data) {
    this.state.datesAndNames = data
  }

  incrDatesAndNames() {
    this.state.datesAndNames.push({
      name: "",
      date: ""
    })
  }

  removeDatesAndNames(index) {
    this.state.datesAndNames.splice(index, 1)
  }

  setNameInDatesAndNames(index, name) {
    this.state.datesAndNames[index].name = name
  }

  setDateInDatesAndNames(index, date) {
    this.state.datesAndNames[index].date = date
  }

  removeVoidDatesAndNames() {
    return new Promise((resolve)=>{
      const fullDatesAndNames = this.state.datesAndNames.filter((item)=>item.name?.length>0 || item?.date)
      this.setDatesAndNames(fullDatesAndNames)
      resolve(true)
    })
  }

  compareNamesInDatesAndNames() {
    return new Promise((resolve)=>{
      const arrWithoutSearchingElement = (index) => {
        if (index===0){
          return this.state.datesAndNames.slice(1, this.state.datesAndNames.length)
        }
        else if (index===this.state.datesAndNames.length-1){
          return this.state.datesAndNames.slice(0, this.state.datesAndNames.length-1)
        }
        else {
          return this.state.datesAndNames.slice(0, index).concat(this.state.datesAndNames.slice(index+1, this.state.datesAndNames.length))
        }
      }
      const needChange = []
      this.state.datesAndNames.forEach((itemObj, index) => {
        if (arrWithoutSearchingElement(index).map(item => item.name).includes(itemObj.name) && itemObj.name?.length!==0) {
          needChange.push(index)
        }})
      this.setErrorNames(needChange)
      resolve(true)
    })
    

  }

  findErrorDatesInDatesAndNames() {
    return new Promise ((resolve)=> {
      let needChange = []
      this.state.datesAndNames.forEach((item, index)=>{
        if (!item.date){
          needChange.push(index)
        }
      })
      this.setErrorDates(needChange)
      resolve(true)
    })
    
  }

  setDatesAndNamesForSend () {
    return new Promise((resolve, reject)=>{
      this.removeVoidDatesAndNames().then(()=>{
        this.findErrorDatesInDatesAndNames().then(()=>{
          this.compareNamesInDatesAndNames().then(()=>{
            if (this.state.errorDates?.length!==0){
              alert("Возникла ошибка, проверьте даты ожидания")
              reject("there are error dates")
            }
            if (this.state.errorNames?.length!==0){
              alert("Возникла ошибка, проверьте уникальность имен")
              reject("names are not unique")
            }
            if (this.state.errorDates?.length===0 && this.state.errorNames?.length===0){
              resolve(parseAnalisisNamesAndDatesToJSON(this.state.datesAndNames))
            }
          })
        })
      })
    })
  }

  get analisisDateError() {
    return this.commonInfo.analisisDateError
  }

  setAnalisisDateError(value) {
    this.commonInfo.analisisDateError = value
  }

  reset() {
    this.state.analysisTypes = []
    this.state.activeAnalysisId = ""
    this.state.text = ""
    this.state.photos = []
    this.state.datesAndNames = []
    this.state.errorNames = []
    this.state.shortName = ""
    this.state.waitingDate = ""
    this.state.waitingDays = ""
    this.state.existedId = ""
    this.state.date = ""
    this.state.center = ""
    this.state.deleteImages = []
    this.commonInfo.analisisDateError = false
  }

  changeWaitingDateAndDays (date) {
    this.state.waitingDate = date
    this.state.waitingDays = moment(date).diff(this.state.date, 'days');
  }

  changeDaysAndWaitingDate (days) {
    this.state.waitingDays = days
    this.state.waitingDate = moment(this.state.date).add(days, 'days')

  }

  setPhotos(photos){
    this.state.photos = photos
  }

  getAnalisisData(appointmentId) {
    this.state.appointmentId = appointmentId
      client.query({
        query: ANALISIS,
        variables: {
          id: appointmentId
        },
      }).then((data)=>{
        this.state.date = data.data.appointment.date
        this.state.center = data.data.appointment.center.id
        data.data.appointment.analyzes.forEach((analisis)=>{
            if (analisis.analyzeType.id===this.state.activeAnalysisId){
                this.state.text = analisis.text ? analisis.text : ""
                this.setDatesAndNames(analisis.additionInformation ? parseAnalisisNamesAndDates(analisis.additionInformation) : [])
                // this.state.shortName = analisis.shortName ? analisis.shortName : ""
                this.state.existedId = analisis.id
                this.changeWaitingDateAndDays(analisis.waitingDate)
                let photos = []
                analisis.analyzeImages.forEach((image)=>{
                  photos.push({
                    id: image.id,
                    existed: true,
                    existedOriginalUrl: image.imageLink,
                    prevRotation: image?.rotation===360 ? 0 : image.rotation,
                    url: image.image300Link,
                    rotation: 0,
                    order: image.order,
                  })
                })
                this.setPhotos(photos)
            }
        })
      })
  }

  setPhotosForSend() {
    if (this.state.photos.length===0 && this.state.deleteImages.length===0){
      return undefined
    }
    let photosSet = []
    this.state.photos.forEach((photo)=>{
      if (photo.existed===true){
        let rotation = photo.prevRotation + photo.rotation
        if (rotation>=360){
          rotation = rotation - 360
        }
        photosSet.push({
          imageId: photo.id,
          order: photo.order,
          rotation: photo.rotation ? rotation : undefined,
        })
      }else{
        photosSet.push({
          image: photo.photo,
          order: photo.order,
          rotation: photo.rotation,
        })
      }
    })
    if (this.state.deleteImages.length>0){
      this.state.deleteImages.forEach((photo)=>{
        photosSet.push({
          imageId: photo,
          isDelete: true
        })
      })
    }
    return photosSet
  }

  saveAnalisis(appointmentId) {
    return new Promise((resolve, reject) => {
      this.setDatesAndNamesForSend().catch((error)=>{
        reject("cant save, error in names || dates")
      }).then((datesAndNamesForSend)=>{
        if (datesAndNamesForSend){
          if (this.state.existedId){
            client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: appointmentId,
              center: this.state.center,
              analyzes: [
                {
                    analyzeId: this.state.existedId,
                    text: this.state.text,
                    additionInformation: datesAndNamesForSend,
                    analyzeType: this.state.activeAnalysisId,
                    images: this.setPhotosForSend()
                }
              ]
            },
            },}).catch((err)=>{
              reject(err)
              alert("Возникла ошибка при сохранении анализа")
            }).then((data) => {
              this.commonInfo.isLoadingInfo = false
              if (data){
                this.reset()
                resolve(true)
              }else reject("no data in request")
              
            })
          }else{
            if (datesAndNamesForSend.length>2 || this.state.text?.length>0 || this.state.photos?.length>0){
                client.mutate({
                  mutation: UPDATE_APPOINTMENT,
                  variables: {
                  input: {
                    appointmentId: appointmentId,
                    center: this.state.center,
                    analyzes: [
                      {
                          analyzeType: this.state.activeAnalysisId,
                          text: this.state.text,
                          additionInformation: datesAndNamesForSend,
                          images: this.setPhotosForSend()
                      }
                    ]
                  },
                  },}).catch((err)=>{
                    reject(false)
                    alert("Возникла ошибка при сохранении анализа")
                  }).then((data) => {
                    if (data){
                      this.reset()
                      resolve(true)
                    }else{
                      reject(false)
                    }
                })
            }else {
              this.reset()
              resolve(true)
            }
          }
        }
      })
    })
  }

    get activeAnalysisId () {
        return this.state.activeAnalysisId
    }

    get text () {
        return this.state.text
    }

    get photos () {
        return this.state.photos
    }

    get shortName () {
        return this.state.shortName
    }

    get waitingDate () {
        return this.state.waitingDate
    }

    get waitingDays () {
      return this.state.waitingDays
    }

    get waitingLength () {
        return this.state.waitingLength
    }

    get waitingLengthVariants () {
        return this.state.waitingLengthVariants
    }

    get analysisTypes() {
        return this.state.analysisTypes
    }

    get incorrectPhotos() {
      return this.state.incorrectPhotos
    }

  setAnalysisTypes(analysis) {
    this.state.analysisTypes = analysis
  }

  setWaitingLength (value) {
    this.state.waitingLength = value
  }

  setShortName (text) {
    this.state.shortName = text
  }

  setText (text) {
    this.state.text = text
  }

  setActiveAnalysisId (id) {
    this.state.activeAnalysisId = id
  }

  setSortPhotos () {
    this.state.photos.sort((a,b) => {
      if (a.order > b.order) return 1
      else if (a.order < b.order) return -1
      else return 0
    })
  }

  setRemoveSuperposePhotoCard() {
    this.state.photos.forEach((item, index)=>{
      if (item?.superpose===true){
        this.state.photos.splice(index, 1)
      }
    })
  }

  setResetPhotos(){
    this.state.photos.forEach((item) => {
      if (item.existed===true){
        this.state.deleteImages.push(item.id)
      }
    })
    this.state.photos = []
  }

  setPhotosOrder() {
    this.state.photos.forEach((photo, index) => {
      photo.order = index + 1
    })
  }


  setAddIncorrectPhoto(obj){
    this.state.incorrectPhotos.push(obj)
  }

  async setAddPhotos(photo){
    const timer = ms => new Promise(res => setTimeout(res, ms))
    const waitEvent = (condition) =>{
      if (condition){
        return true
      }
    }
    for (let i=0; i<photo.length;i++){
      // let fileReader = new FileReader();
      // fileReader.readAsDataURL(photo[i]);
      this.state.photos.push({
        url: URL.createObjectURL(photo[i]),
        photo: photo[i],
        rotation: 0,
        existed: false,
        id: `new${this.state.photos.length+1}${(new Date()).getTime()}`,
        order: this.state.photos.length+1})
        // fileReader.onload = () =>{
        // }
        // fileReader.onloadend = () =>{
        //   this.state.photos[this.state.photos.length-1].url = fileReader.result
        // }
        while (waitEvent(this.state.photos[this.state.photos.length-1].url)!==true){
          await timer(200)
        }
    }
    await this.setSortPhotos()
    this.viewStore.setActionWait(false)
  }

  setDropingPhoto(data){
    this.state.dropingPhoto = data
  }

  setResetDroppingPhotoCard() {
    let isDraged = false
    this.state.photos.forEach((item) => {if (item.id===this.state.dropingPhoto.id){isDraged = true}})
    if (!isDraged){
      this.state.photos.push(this.state.dropingPhoto)
      this.setSortPhotos()
      this.setRemoveSuperposePhotoCard()
    }
  }

  setVoidPhoto (photoCard) {
    for (var i = 0; i<this.state.photos.length; i++){
      if (this.state.photos[i].id===photoCard.id){
        this.setRemoveSuperposePhotoCard()
        if(!this.state.photos[i]?.id){
          this.state.photos.push({superpose: true, id: "superpose", order: this.state.photos[this.state.photos.length-1].order})
        }else{
          this.state.photos.splice(i, 0, {superpose: true, id: "superpose", order: this.state.photos[i].order})
        }
        this.state.photos.forEach((item, index)=>{if (item.id===this.state.dropingPhoto.id){this.state.photos.splice(index, 1)}})
        break
      }
    }
  }

  setDropCard (photoCard) {
    for (var i = 0; i<this.state.photos.length; i++){
      if (this.state.photos[i]?.superpose){
        this.state.photos[i] = this.state.dropingPhoto
        break
      }
    }
    this.setPhotosOrder()
  }

  setResetIncorectPhotos(){
    this.state.incorrectPhotos = []
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

  setResetPhotosByIndex(index){
    if (this.state.photos[index].existed===true){
      this.state.deleteImages.push(this.state.photos[index].id)
    }
    this.state.photos.splice(index, 1)
  }

  setRotationForOne(index) {
    this.state.photos[index].rotation+=90
      if (this.state.photos[index].rotation>270){
        this.state.photos[index].rotation = 0
      }
  }

}