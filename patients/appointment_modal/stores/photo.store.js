import {makeAutoObservable, toJS, runInAction} from "mobx";
import {client} from "../../../../_common/http/appoloClient";
import { PHOTO_TYPES, PHOTOS } from "../_queries/Appointment.queries";
import DataStoreAppointmentModal from "./data.store";
import { inject } from "react-ioc";
import { UPDATE_APPOINTMENT } from "../_mutations/newAppointment.mutations";
import moment from "moment";
import StoreAppointmentModal from "./store";

export default class PhotoStore {
  dataStore = inject(this, DataStoreAppointmentModal)
  viewStore = inject(this, StoreAppointmentModal)

  deletePhotosType = {
    deleteOnePhoto: null,
    deleteAllPhotos: false,
    deleteCheckedPhotos: false,
  }

    state = {
        photos: [],
        patientId: null,
        deleteImages: [],
        preloader: false,
        incorrectPhotos: [],
        dropingPhoto: null,
        allChecked: false,
        anyChecked: false,
        photWriteModeOpene: false,
        photosForWrite: [],
        photoWrites: [],
        photosLoadedForComment: []
    }

    setPhotosLoadedForComment(photos) {
      this.state.photosLoadedForComment = photos
    }

    get photosLoadedForComment () {
      return this.state.photosLoadedForComment
    }

    addPhotosAfterFastCommentLoad () {
      this.state.photos = this.state.photos.concat(this.state.photosLoadedForComment)
      this.setPhotosLoadedForComment([])
    }

    switchWriteCheckInFastLoadComment (photoIndex, write){
      runInAction(() => {
        const photo = this.state.photosLoadedForComment[photoIndex]
        if (photo) {
            const writesIds = photo?.writes?.map((write)=>write?.id) || []
            if (writesIds.includes(write?.id)){
              const newWrites = photo?.writes.filter((oldWrite)=>oldWrite?.id!==write?.id) || []
              photo.writes = newWrites
            }else{
              photo?.writes.push({
                id: write?.id,
                name: write?.name
              })
            }
        }
      })
    }

    get permissionToClosePhotosBlock () {
      return this.state.photosLoadedForComment?.length>0 ? false : true
    }

    get fastLoadModeOn () {
      return this.state.photosLoadedForComment?.length>0 ? true : false
    }

    get baseModeOn () {
      if ((!this.state.photosLoadedForComment || this.state.photosLoadedForComment?.length===0) && !this.state.photWriteModeOpene){
        return true
      }else return false
    }

    constructor() {
        makeAutoObservable(this)
      }

      get deleteOnePhoto () {
        return this.deletePhotosType.deleteOnePhoto
      }

      get deleteAllPhotos () {
        return this.deletePhotosType.deleteAllPhotos
      }

      get deleteCheckedPhotos () {
        return this.deletePhotosType.deleteCheckedPhotos
      }

      setDeleteOnePhoto (value) {
        this.deletePhotosType.deleteOnePhoto = value
      }

      setDeleteAllPhotos (value) {
        this.deletePhotosType.deleteAllPhotos = value
      }

      setDeleteCheckedPhotos (value) {
        this.deletePhotosType.deleteCheckedPhotos = value
      }

      resetStore() {
        this.state.photos = []
        this.state.patientId = null
        this.state.deleteImages = []
        this.state.preloader = false
        this.state.incorrectPhotos = []
        this.state.dropingPhoto = null
        this.state.allChecked = false
        this.state.anyChecked = false
        this.state.photWriteModeOpene = false
        this.state.photosForWrite = []
        this.state.photoWrites = []
      }

      resetOnTabChange() {
        this.state.patientId = null
        this.state.deleteImages = []
        this.state.preloader = false
        this.state.incorrectPhotos = []
        this.state.dropingPhoto = null
        this.state.allChecked = false
        this.state.anyChecked = false
        this.state.photWriteModeOpene = false
        this.state.photosForWrite = []
      }

      setSortPhotos () {
        this.state.photos.sort((a,b) => {
          if (a?.order > b?.order) return 1
          else if (a?.order < b?.order) return -1
          else return 0
        })
      }

      setPhotosBlockForUpload(){
        let photosForSend = []
        this.state?.photos?.forEach((photo)=>{
          let types = []
          photo?.writes?.forEach((type)=>{
            types.push(type?.id)
          })
          if (photo?.existed===true){
            if (photo?.isChangedRotation===true){
              let rotation = photo?.prevRotation + photo?.rotation
              if (rotation>=360){
                rotation = rotation - 360
              }
              photosForSend.push({
                imageId: photo?.id,
                order: photo?.order,
                rotation: rotation===0 ? 360 : rotation,
                typeId: types?.length>0 ? types : undefined,
                clearTypes: types?.length===0 ? true : false,
              })
            }else{
              photosForSend.push({
                imageId: photo?.id,
                order: photo?.order,
                typeId: types?.length>0 ? types : undefined,
                clearTypes: types?.length===0 ? true : false,
              })
            }
          }else{
            photosForSend.push({
              image: photo?.photo,
              order: photo?.order,
              rotation: photo?.rotation===0 ? 360 : photo?.rotation,
              typeId: types?.length>0 ? types : undefined,
              clearTypes: types?.length===0 ? true : false,
            })
          }
        })
        this.state?.deleteImages?.forEach((id)=>{
          photosForSend.push({
            imageId: id,
            isDelete: true,
          })
        })
        return photosForSend
      }

      setCheckedPhotos() {
        this.state.photosForWrite.forEach((photo)=>{
          photo.writes.forEach((write)=>{
            this.photoWrites.forEach((group)=>{
              group.types.forEach((type)=>{
                if (type.id === write.id){
                  type.checked = true
                }
              })
            })
          })
        })
      }


      setChecked(group, type){
        this.state.photoWrites[group].types[type].checked = !this.state.photoWrites[group].types[type].checked
        if (this.state.photoWrites[group].types[type].checked===true){
          this.state.photosForWrite.forEach((photo)=>{
            if (photo.writes.length===0){
              photo.writes.push({
                id: this.state.photoWrites[group].types[type].id,
                name: this.state.photoWrites[group].types[type].name
              })
            }else{
              let isEnabledWrite = false
              photo.writes.forEach((write)=>{
                if (write.id===this.state.photoWrites[group].types[type].id){
                  isEnabledWrite = true
                }
              })
              if (isEnabledWrite===false){
                photo.writes.push({
                  id: this.state.photoWrites[group].types[type].id,
                  name: this.state.photoWrites[group].types[type].name
                })
              }
            }
          })
        }else{
          this.state.photosForWrite.forEach((photo)=>{
            if (photo.writes.length!==0){
              photo.writes.forEach((write, index)=>{
                if (write.id===this.state.photoWrites[group].types[type].id){
                  photo.writes.splice(index, 1)
                }
              })
            }
          })
        }
      }

      async setPhotoWrites() {
        await client.query({
          query: PHOTO_TYPES
        }).then((data)=>{
          let imageTypes = []
          data.data.imageTypes.forEach((imageType)=>{
            if (imageType.isGroup === true){
              imageTypes.push({
                groupName: imageType.name,
                id: imageType.id,
                types: []
              })
              imageType.children.forEach((type)=>{
                imageTypes[imageTypes.length-1].types.push({
                  id: type.id,
                  name: type.name,
                  checked: false
                })
              })
            }
          })
          this.state.photoWrites = imageTypes
        })
      }

      setOneForWrite(index) {
        this.state.photosForWrite.push(this.state.photos[index])
      }

    setPhotosForWrite() {
        this.state.photos.forEach((photo)=>{
            if (photo.checked === true){
                this.state.photosForWrite.push(photo)
            }
        })
    }
    resetPhotosForWrite() {
        this.state.photosForWrite = []
    }

    changePhotWriteModeOpene(){
        this.state.photWriteModeOpene = !this.state.photWriteModeOpene
        if (this.state.photWriteModeOpene===false){
          this.state.photosForWrite.forEach((photo)=>{
            for (let i = 0; i<this.state.photos.length; i++){
              if (this.state.photos[i].id===photo.id){
                this.state.photos[i].writes = photo.writes
                break
              }
            }
          })
          this.resetPhotosForWrite()
        }
    }

    checkCheckingPosition() {
        let checkedAmmount = 0
        this.state.photos.forEach((photo)=>{
            if (photo.checked === true){
                checkedAmmount+=1
            }
        })
        if (checkedAmmount === this.state.photos.length){
            this.state.allChecked = true
        }else{ this.state.allChecked = false }
        if (checkedAmmount>0){
          this.state.anyChecked = true
        }
        if (checkedAmmount===0) {
          this.state.anyChecked = false
        }
    }

    checkAllPhotos() {
        this.state.photos.forEach((photo)=>{
            photo.checked = true
        })
        this.state.allChecked = true
        this.state.anyChecked = true
    }

    unCheckAllPhotos() {
        this.state.photos.forEach((photo)=>{
            photo.checked = false
        })
        this.state.allChecked = false
        this.state.anyChecked = false
    }

    chooseAllOrNoPhotos() {
        if (this.state.allChecked===true){
            this.unCheckAllPhotos()
        }else this.checkAllPhotos()
    }

    changeCheckPositionForAll() {
        this.state.photos.forEach((photo)=>{
            photo.checked = !photo.checked
        })
        this.checkCheckingPosition()
    }

    setAddIncorrectPhoto(obj){
      this.state.incorrectPhotos.push(obj)
    }
    
    setResetIncorectPhotos(){
      this.state.incorrectPhotos = []
    }

    setResetStore(){
      this.state.photos = []
      this.state.deleteImages = []
      this.state.preloader = false
      this.state.incorrectPhotos = []
    }

    setRotationForOne(index) {
      this.state.photos[index].rotation+=90
        if (this.state.photos[index].rotation>270){
          this.state.photos[index].rotation -= 360
        }
        if (this.state.photos[index].existed===true){
          this.state.photos[index].isChangedRotation = true
        }
    }

    setRotationForAll() {
        this.state.photos.forEach((photo)=>{
            if (photo.checked===true){
                photo.rotation+=90
                if (photo.rotation>270){
                  photo.rotation -= 360
                }
                if (photo.existed===true){
                  photo.isChangedRotation = true
                }
            }
        })
        
    }

    

    setPhotos(photosArray){
      this.state.photos = photosArray
      this.setSortPhotos()
    }

    getPhotos() {
      client.query({
        query: PHOTOS,
        variables: {
          id: this.dataStore.appointmentId
        },
      }).then((data)=>{
        let photos = []
        data?.data?.appointment?.appointmentImages?.forEach((photo)=>{
          let writes = []
          photo.photoType.forEach((type)=>{
            writes.push({
              id: type.id,
              name: type.name,
              checked: true
            })
          })
          photos.push({
            url: photo?.image300Link,
            checked: false,
            rotation: 0,
            prevRotation: photo?.rotation===360 ? 0 : photo?.rotation,
            isChangedRotation: false,
            existed: true,
            existedOriginalUrl: photo?.imageLink,
            writes: writes,
            id: photo.id,
            order: photo.order})
        })
        this.setPhotos(photos)
        this.dataStore.setIsLoadingInfo(false)
      })
    }

    saveAppointmentFromPhotos(){
      return new Promise((resolve) => {
        client.mutate({
          mutation: UPDATE_APPOINTMENT,
          variables: {
            input: {
              appointmentId: this.dataStore?.appointmentId,
              images: this.setPhotosBlockForUpload(),
            },
          },
        }).then((data) => {
          this.dataStore.setIsLoadingInfo(false)
          this.resetOnTabChange()
          resolve(true)
        })
      })
      }

    setDropingPhoto(data){
      this.state.dropingPhoto = data
    }

    setPhotosOrder() {
      this.state.photos.forEach((photo, index) => {
        photo.order = index + 1
      })
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
          checked: false,
          rotation: 0,
          existed: false,
          writes: [],
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

    async setAddPhotosForFastWrite(photo){
      const timer = ms => new Promise(res => setTimeout(res, ms))
      const waitEvent = (condition) =>{
        if (condition){
          return true
        }
      }
      let photos = []
      for (let i=0; i<photo.length;i++){
        photos.push({
          url: URL.createObjectURL(photo[i]),
          photo: photo[i],
          checked: false,
          rotation: 0,
          existed: false,
          writes: [],
          id: `new${this.state.photos.length+1}${(new Date()).getTime()}`,
          order: this.state.photos.length+1})
          while (waitEvent(photos[photos?.length-1].url)!==true){
            await timer(200)
          }
      }
      await this.setSortPhotos()
      this.setPhotosLoadedForComment(photos)
      this.viewStore.setActionWait(false)
    }

    setResetPhotos(){
      this.state.photos.forEach((item) => {
        if (item.existed===true){
          this.state.deleteImages.push(item.id)
        }
      })
      this.state.photos = []
    }

    setCheckedPhoto(index){      
        this.state.photos[index].checked = !this.state.photos[index].checked
        this.checkCheckingPosition()
        // let isAnyChecked = false
        // for (let i = 0; i<this.state.photos.length; i++){
        //   if (this.state.photos[i].checked===true){
        //     isAnyChecked = true
        //     break
        //   }
        // }
        // if (isAnyChecked===true){
        //   this.state.anyChecked = true
        // }else this.state.anyChecked = false
    }

    setResetPhotosByIndex(index){
      if (this.state.photos[index].existed===true){
        this.state.deleteImages.push(this.state.photos[index].id)
      }
      this.state.photos.splice(index, 1)
    }

    setResetCheckedPhotos(){
      let checkedIndexes = []
      this.state.photos.forEach((photo, index)=>{
        if (photo.checked===true){
          checkedIndexes.push(index)
        }
      })
      checkedIndexes?.forEach((photoIndex, itemIndex)=>{
        this.setResetPhotosByIndex(photoIndex-itemIndex)
      })
    }


    setRemoveSuperposePhotoCard() {
      this.state.photos.forEach((item, index)=>{
        if (item?.superpose===true){
          this.state.photos.splice(index, 1)
        }
      })
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

    setResetDroppingPhotoCard() {
      let isDraged = false
      this.state.photos.forEach((item) => {if (item.id===this.state.dropingPhoto.id){isDraged = true}})
      if (!isDraged){
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

    resetPhotoWritesChecked() {
      runInAction(() => {
        this.state.photoWrites?.map((writes)=>{
          writes?.types.map((type)=>{
            type.checked = false
          })
        })
      })
    }

    get photos () {
      return toJS(this.state.photos)
    }

    get preloader () {
      return this.state.preloader
    }

    get incorrectPhotos() {
    return toJS(this.state.incorrectPhotos)
  }
    get dropingPhoto() {
      return this.state.dropingPhoto
    }

    get allChecked() {
        return this.state.allChecked
    }

    get photWriteModeOpene() {
        return this.state.photWriteModeOpene
    }

    get photosForWrite() {
        return this.state.photosForWrite
    }

    get photoWrites() {
      return this.state.photoWrites
    }
    get anyChecked() {
      return this.state.anyChecked
    }

    get deleteImages() {
      return this.state.deleteImages
    }
}