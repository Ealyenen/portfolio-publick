import { makeAutoObservable } from "mobx";
import { client } from "../../../../../../_common/http/appoloClient";
import { GET_PHOTO_TYPES } from "../../../../_queries/patients.queries";

export class StorePhotoFastCommentModal {
    state = {
      openModal: false,
      photosWithGroups: [],
  
      photoId: null,
      preloader: false,
      photos: [],
  
      appointmentId: null,
      reasonAppeal: null,
      patientId: null,
      center: null,
    }
  
    constructor() {
      makeAutoObservable(this)
    }
  
    get openModal() {
      return this.state.openModal
    }
  
    setAppointmentId(data){
  
      this.state.appointmentId = data
    }
  
    get appointmentId(){
  
      return this.state.appointmentId
    }
  
    setReasonAppeal(data){
  
      this.state.reasonAppeal = data
    }
  
    get reasonAppeal(){
  
      return this.state.reasonAppeal
    }
  
    setPatientId(data){
  
      this.state.patientId = data
    }
  
    get patientId(){
  
      return this.state.patientId
    }
  
    setClearAppointmentId(){
  
      this.state.appointmentId = null
    }
  
    setClearPatientId(){
  
      this.state.patientId = null
    }
  
    setClearReasonAppeal(){
  
      this.state.reasonAppeal = null
    }
  
  
    setCenter(data){
      this.state.center = data
    }
  
    get center(){
      return this.state.center
    }
  
    setClearCenter(){
  
      this.state.center = null
    }
  
    setOpenPhotoFastCommentModal(open) {
      this.state.openModal = open
    }
  
    get preloader(){
      return this.state.preloader
    }
  
    async setOpenModalEditPhotoText(id){
      this.state.preloader = true
      this.state.photoId = id
  
      this.state.openModal = true
  
      await client.query({
        query: GET_PHOTO_TYPES,
        variables: {
          id: id
        },
      }).then((data)=>{
  
        this.state.photos = data.data.photoTypesByPhotoId
  
        this.state.preloader = false
  
      })
    }
  
  
  
    get photoId(){
      return this.state.photoId
    }
  
    get photos(){
  
      return this.state.photos
    }
  
    setPhotosModal(data){
      this.state.photosWithGroups = data
    }
  
    get photosModal(){
      return this.state.photosWithGroups
    }
  
    setDeletePhotos(){
      this.state.photosWithGroups = []
    }
  }