import {makeAutoObservable} from "mobx";
import authStore from "../../../../_common/stores/auth.store";
import moment from "moment";
import {App} from "../../../../App";
import {client} from "../../../../_common/http/appoloClient";
import {  COMMON_INNFO,
          GENERAL_APPOINTMENT_INFO,
          REASON_APPEAL,
          COMPLAINTS,
          ANAMNESIS,
          OBJECTIVELY,
          WORK,
          HOME,
          RECCOMENDATIONS,
          CONSULTATION,
          COMMENT,
          NEXT_APPOINTMENT,
          APPOINTMENT_CASH_AMMOUNT
        } from "../_queries/Appointment.queries";
import { CREATE_APPOINTMENT, UPDATE_APPOINTMENT } from "../_mutations/newAppointment.mutations";
import StoreAppointmentModal from "./store";
import StoreAppointmentAnalysis from "./analysis.store";
import { inject } from "react-ioc";

App.register(authStore);

export default class DataStoreAppointmentModal {
  viewStore = inject(this, StoreAppointmentModal)
  analysisStore = inject(this, StoreAppointmentAnalysis)

  analisisWaiting = {
    isSaving: false,
    isLoading: false,
  }

  appointmentBlocks = {
    reason: 0,
    complaints: 1,
    anamnesis: 2,
    objectively: 3,
    home: 4,
    reccomendations: 5,
    consultation: 6,
    comment: 7,
    nexAppointment: 8,
    analisis: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ],
    photo: 22,
    estimate: 23,
    cash: 24,
  }

  commonInfo = {
    userId: "",
    existedAppointmentDoctor: null,
    users: [],
    centerId: "",
    existedAppointmentCenter: null,
    centers: [],
    patient: null,
    date: new Date(),
    fromTime: moment(new Date()).format("HH:mm"),
    toTime: moment(new Date()).format("HH:mm"),
    isFinished: false,
    isExisted: false,
    appointmentId: null,
    isLoadingInfo: false,
    cashUnitsCount: 0,
    //here must be the wright order. It will affect on output and save of data!!!
    allAnalysisTypes: [
      {
        id: "1",
        name: "Анализы кожи"
      },
      {
        id: "2",
        name: "Анализы ногтей"
      },
      {
        id: "3",
        name: "БАСТ"
      },
      {
        id: "10",
        name: "Анализы крови"
      },
      {
        id: "11",
        name: "Анализы капилляроскопии"
      },
      {
        id: "12",
        name: "Рентген, КТ, МРТ, УЗИ"
      },
      {
        id: "4",
        name: "Дерматолог"
      },
      {
        id: "6",
        name: "Консультация подолога"
      },
      {
        id: "7",
        name: "Прием"
      },
      {
        id: "8",
        name: "Консультация ОДА"
      },
      {
        id: "9",
        name: "Консультация сторонних специалистов"
      },
      {
        id: "13",
        name: "Мануальный терапевт"
      },
      {
        id: "5",
        name: "Стельки"
      },
    ],
    openAnalisisFromCard: false,
    analisisTypeFromCard: null,
  }

  textBlocks = {
    appealReason: "",
    complaints: "",
    anamnez: "",
    objectively: "",
    work: "",
    home: "",
    recommendations: "",
    consultation: "",
    notes: "",
    nexAppointment: "",
  }

  get isLoadingInfo () {
    return this.commonInfo.isLoadingInfo
  }

  setIsLoadingInfo(value) {
    this.commonInfo.isLoadingInfo = value
  }

  get analisisWaitingAtatuses () {
    return this.analisisWaiting
  }

  setSavingAnalisis(value) {
    this.analisisWaiting.isSaving = value
  }

  setLoadingAnalisis(value) {
    this.analisisWaiting.isLoading = value
  }

    get appointmentBlocksIds () {
      return this.appointmentBlocks
    }

    get analisisTypeFromCard () {
      return this.commonInfo.analisisTypeFromCard
    }

    get openAnalisisFromCard () {
      return this.commonInfo.openAnalisisFromCard
    }

    get allAnalysisTypes () {
      return this.commonInfo.allAnalysisTypes
    }

    get isExisted () {
      return this.commonInfo.isExisted
    }

    get cashUnitsCount () { 
      return this.commonInfo.cashUnitsCount
    }

    get appointmentId() {
      return this.commonInfo.appointmentId
    }

    get appealReason () {
      return this.textBlocks.appealReason
    }
    get complaints () {
      return this.textBlocks.complaints
    }
    get anamnez () {
      return this.textBlocks.anamnez
    }
    get objectively () {
      return this.textBlocks.objectively
    }
    get work () {
      return this.textBlocks.work
    }
    get home () {
      return this.textBlocks.home
    }
    get recommendations () {
      return this.textBlocks.recommendations
    }
    get consultation () {
      return this.textBlocks.consultation
    }
    get notes () {
      return this.textBlocks.notes
    }
    get nexAppointment () {
      return this.textBlocks.nexAppointment
    }

  get fromTime () {
    return this.commonInfo.fromTime
  }

  get toTime () {
    return this.commonInfo.toTime
  }

  get isFinished () {
    return this.commonInfo.isFinished
  }

  get users(){
    return this.commonInfo.users
  }

  get userId() {
    return this.commonInfo.userId
  }

  get existedAppointmentDoctor() {
    return this.commonInfo.existedAppointmentDoctor
  }

  get existedAppointmentCenter() {
    return this.commonInfo.existedAppointmentCenter
  }

  get centerId() {
    return this.commonInfo.centerId
  }

  get centers() {
    return this.commonInfo.centers
  }

  get patient() {
    return this.commonInfo.patient
  }
  
  get date() {
    return this.commonInfo.date
  }

  setFromTime(time) {
    this.commonInfo.fromTime = time
  }

  resetData() {
      this.commonInfo.userId = ""
      this.commonInfo.existedAppointmentDoctor = null
      this.commonInfo.existedAppointmentCenter = null
      this.commonInfo.users = []
      this.commonInfo.centerId = ""
      this.commonInfo.centers = []
      this.commonInfo.patient = null
      this.commonInfo.date = new Date()
      this.commonInfo.fromTime = moment(new Date()).format("HH:mm")
      this.commonInfo.toTime = ""
      this.commonInfo.isFinished = false
      this.commonInfo.isExisted = false
      this.commonInfo.appointmentId = null
      this.commonInfo.isLoadingInfo = false
      this.commonInfo.analisisTypeFromCard = null
      this.commonInfo.openAnalisisFromCard = false
  
      this.textBlocks.appealReason = ""
      this.textBlocks.complaints = ""
      this.textBlocks.anamnez = ""
      this.textBlocks.objectively = ""
      this.textBlocks.work = ""
      this.textBlocks.home = ""
      this.textBlocks.recommendations = ""
      this.textBlocks.consultation = ""
      this.textBlocks.notes = ""
      this.textBlocks.nexAppointment = ""
  }

  async deleteAppointment(){
    await client.mutate({
      mutation: UPDATE_APPOINTMENT,
      variables: {
      input: {
        appointmentId: this.commonInfo.appointmentId,
        center: this.commonInfo.centerId,
        
      },
      },}).then((data) => {
        this.commonInfo.isLoadingInfo = false
    })
  }

  async saveCommonInfo(){
    await client.mutate({
      mutation: UPDATE_APPOINTMENT,
      variables: {
      input: {
        appointmentId: this.commonInfo.appointmentId,
        center: this.commonInfo.centerId,
        doctorId: this.commonInfo.userId,
        date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
        timeStart: this.commonInfo.fromTime,
        isDone: this.commonInfo.isFinished ? true : false,
        timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
      },
      },}).then((data) => {
        this.commonInfo.isLoadingInfo = false
        return data.data.updateAppointment
    })
  }

  async saveFromTime(time){
    this.setFromTime(time)
    await client.mutate({
      mutation: UPDATE_APPOINTMENT,
      variables: {
      input: {
        appointmentId: this.commonInfo.appointmentId,
        timeStart: time,
      },
    },})
  }

  async saveToTime(time){
    this.setToTime(time)
    await client.mutate({
      mutation: UPDATE_APPOINTMENT,
      variables: {
      input: {
        appointmentId: this.commonInfo.appointmentId,
        timeEnd: this.commonInfo.isFinished ? time : undefined,
      },
    },})
  }

  async finishAppointment(){
    const time = moment(new Date()).format("HH:mm")
    this.setIsFinished()
    this.setToTime(time)
    await client.mutate({
      mutation: UPDATE_APPOINTMENT,
      variables: {
      input: {
        appointmentId: this.commonInfo.appointmentId,
        isDone: this.commonInfo.isFinished ? true : false,
        timeEnd: this.commonInfo.isFinished ? time : undefined,
      },
    },})
  }

   createAppointment() {
    return new Promise((resolve)=>{
      this.commonInfo.isLoadingInfo = true
      if (this.textBlocks.appealReason.length > 0 && this.commonInfo.centerId.length > 0 && this.commonInfo.userId.length > 0) {
        client.mutate({
          mutation: CREATE_APPOINTMENT,
          variables: {
            input: {
              patientId: this.commonInfo.patient.id,
              doctorId: this.commonInfo.userId,
              center: this.commonInfo.centerId,
              date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
              timeStart: this.commonInfo.fromTime,
              reasonAppeal: this.textBlocks.appealReason,
            },
          },
        }).then((data) => {
          this.commonInfo.existedAppointmentDoctor = data.data?.createAppointment?.appointment?.doctor
          this.commonInfo.existedAppointmentCenter = data.data?.createAppointment?.appointment?.center
          this.commonInfo.isExisted = true
          this.commonInfo.appointmentId = data.data.createAppointment.appointment.appointmentId
          this.commonInfo.isLoadingInfo = false
          resolve(true)
        })
      } else {
        this.viewStore.setTabValue(0)
        this.commonInfo.isLoadingInfo = false
        alert(`Заполните ${this.textBlocks.appealReason.length===0 ? "причину обращения" : ""}${this.textBlocks.appealReason.length===0 && this.commonInfo.centerId.length===0 ? "," : ""}${this.commonInfo.centerId.length===0 ? " медцентр" : ""}${this.commonInfo.userId.length===0 && (this.textBlocks.appealReason.length===0 || this.commonInfo.centerId.length===0) ? "," : ""}${this.commonInfo.userId.length===0 ? " специалиста" : ""}`)
        resolve(false)
      }
    })
    
    
   }

  updateAppointment(tab) {
    this.commonInfo.isLoadingInfo = true
    return new Promise((resolve)=>{
        if (this.commonInfo.isExisted){
        if (tab === this.appointmentBlocks.reason){
          if (this.textBlocks.appealReason.length>0 && this.textBlocks.appealReason!=="<p><br></p>"){
            client.mutate({
              mutation: UPDATE_APPOINTMENT,
              variables: {
              input: {  
                appointmentId: this.commonInfo.appointmentId,
                reasonAppeal: this.textBlocks.appealReason,
                center: this.commonInfo.centerId,
              },
              },}).then((data) => {
                this.commonInfo.isLoadingInfo = false
                resolve(true)
            })
          }else{
            alert("Причина обращения не может быть пустой")
            this.viewStore.setTabValue(0)
            this.commonInfo.isLoadingInfo = false
            resolve(false)
          }
        }else if(tab === this.appointmentBlocks.complaints){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              complaints: this.textBlocks.complaints,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.anamnesis){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              anamnesis: this.textBlocks.anamnez,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.objectively){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              objectively: this.textBlocks.objectively,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.work){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              work: this.textBlocks.work,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.home){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              home: this.textBlocks.home,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.reccomendations){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              recommendations: this.textBlocks.recommendations,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.consultation){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              consultation: this.textBlocks.consultation,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.comment){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              comment: this.textBlocks.notes,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }else if(tab === this.appointmentBlocks.nexAppointment){
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
            input: {
              appointmentId: this.commonInfo.appointmentId,
              nextAppointment: this.textBlocks.nexAppointment,
              center: this.commonInfo.centerId,
            },
            },}).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
          })
        }
        
      }else {
        this.createAppointment().then((data)=>{
          resolve(data)
        })
      }
    })
  }

  saveAppointment() {
    return new Promise((resolve)=>{
      this.commonInfo.isLoadingInfo = true
      if (this.commonInfo.isExisted) {
        if (this.viewStore.tabValue === this.appointmentBlocks.reason) {
          if (this.textBlocks.appealReason.length > 0 && this.textBlocks.appealReason!=="<p><br></p>") {
            client.mutate({
              mutation: UPDATE_APPOINTMENT,
              variables: {
                input: {
                  appointmentId: this.commonInfo.appointmentId,
                  reasonAppeal: this.textBlocks.appealReason,
                  center: this.commonInfo.centerId,
                  doctorId: this.commonInfo.userId,
                  date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                  timeStart: this.commonInfo.fromTime,
                  isDone: this.commonInfo.isFinished ? true : false,
                  timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
                },
              },
            }).then((data) => {
              this.commonInfo.isLoadingInfo = false
              resolve(true)
            })
          } else {
            alert("Причина обращения не может быть пустой")
            this.viewStore.setTabValue(0)
            this.commonInfo.isLoadingInfo = false
            resolve(false)
          }
        } else if (this.viewStore.tabValue === this.appointmentBlocks.complaints) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                complaints: this.textBlocks.complaints,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.anamnesis) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                anamnesis: this.textBlocks.anamnez,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.objectively) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                objectively: this.textBlocks.objectively,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.work) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                work: this.textBlocks.work,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.home) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                home: this.textBlocks.home,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.reccomendations) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                recommendations: this.textBlocks.recommendations,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.consultation) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                consultation: this.textBlocks.consultation,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.comment) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                comment: this.textBlocks.notes,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        } else if (this.viewStore.tabValue === this.appointmentBlocks.nexAppointment) {
          client.mutate({
            mutation: UPDATE_APPOINTMENT,
            variables: {
              input: {
                appointmentId: this.commonInfo.appointmentId,
                nextAppointment: this.textBlocks.nexAppointment,
                center: this.commonInfo.centerId,
                doctorId: this.commonInfo.userId,
                date: moment(this.commonInfo.date).format("YYYY-MM-DD"),
                timeStart: this.commonInfo.fromTime,
                isDone: this.commonInfo.isFinished ? true : false,
                timeEnd: this.commonInfo.isFinished ? this.commonInfo.toTime : undefined,
              },
            },
          }).then((data) => {
            this.commonInfo.isLoadingInfo = false
            resolve(true)
          })
        }
      } else {
        this.createAppointment().then(()=>{
          resolve(true)
        })
      }
    })
    
    
  }

  async setCashUnitsCount() {
    if (this?.commonInfo?.appointmentId){
      await client.query({
        query: APPOINTMENT_CASH_AMMOUNT,
        variables: {
          id: this?.commonInfo?.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.cashUnitsCount = data?.data?.appointment?.chequeUnits?.length
      })
    }
  }

  incrCashUnitsCount() {
    this.commonInfo.cashUnitsCount++
  }

  decrCashUnitsCount() {
    this.commonInfo.cashUnitsCount--
  }

  getTextTabInfo(tab){
    this.commonInfo.isLoadingInfo = true
    if (tab===this.appointmentBlocks.reason){
      client.query({
          query: REASON_APPEAL,
          variables: {
            id: this.commonInfo.appointmentId
          },
        }).then((data)=>{
          this.commonInfo.isLoadingInfo = false
          this.textBlocks.appealReason = data.data.appointment.reasonAppeal
        })
    }else if (tab===this.appointmentBlocks.complaints){
      client.query({
        query: COMPLAINTS,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.complaints = data.data.appointment.complaints
      })
    }else if (tab===this.appointmentBlocks.anamnesis){
      client.query({
        query: ANAMNESIS,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.anamnez = data.data.appointment.anamnesis
      })
    }else if (tab===this.appointmentBlocks.objectively){
      client.query({
        query: OBJECTIVELY,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.objectively = data.data.appointment.objectively
      })
    }else if (tab===this.appointmentBlocks.home){
      client.query({
        query: HOME,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.home = data.data.appointment.home
      })
    }else if (tab===this.appointmentBlocks.reccomendations){
      client.query({
        query: RECCOMENDATIONS,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.recommendations = data.data.appointment.recommendations
      })
    }else if (tab===this.appointmentBlocks.consultation){
      client.query({
        query: CONSULTATION,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.consultation = data.data.appointment.consultation
      })
    }else if (tab===this.appointmentBlocks.comment){
      client.query({
        query: COMMENT,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.notes = data.data.appointment.comment
      })
    }else if (tab===this.appointmentBlocks.nexAppointment){
      client.query({
        query: NEXT_APPOINTMENT,
        variables: {
          id: this.commonInfo.appointmentId
        },
      }).then((data)=>{
        this.commonInfo.isLoadingInfo = false
        this.textBlocks.nexAppointment = data.data.appointment.nextAppointment
      })
    }
    
   }

  
    setAppealReason(text) {
      this.textBlocks.appealReason = text
    }
    setComplaints(text) {
      this.textBlocks.complaints = text
    }
    setAnamnez(text) {
      this.textBlocks.anamnez = text
    }
    setObjectively(text) {
      this.textBlocks.objectively = text
    }
    setWork(text) {
      this.textBlocks.work = text
    }
    setHome(text) {
      this.textBlocks.home = text
    }
    setRecommendations(text) {
      this.textBlocks.recommendations = text
    }
    setConsultation(text) {
      this.textBlocks.consultation = text
    }
    setNotes(text) {
      this.textBlocks.notes = text
    }
    setNexAppointment(text) {
      this.textBlocks.nexAppointment = text
    }


  setToTime(time) {
    this.commonInfo.toTime = time
  }

  setIsFinished() {
    this.commonInfo.isFinished = true
  }

  setDate(date) {
    this.commonInfo.date = date
  }

  setPatientToAppointment(patient) {
    this.commonInfo.patient = patient
  }

  setUpdateUserCenter() {
    this.commonInfo.centerId = authStore.medicalCenterId ? authStore.medicalCenterId : ""

  }

  setUserId(id) {
    this.commonInfo.userId = id
  }

  setExistedAppointmentDoctor(doctor) {
    this.commonInfo.existedAppointmentDoctor = doctor
  }

  setExistedAppointmentCenter(center) {
    this.commonInfo.existedAppointmentCenter = center
  }

  setCenterId(id) {
    this.commonInfo.centerId = id
  }

  async getCommonInfo(){
    await client.query({
      query: COMMON_INNFO,
      variables: {
        email: authStore.user.email ? authStore.user.email : undefined
      },
    }).then((data)=>{
      this.setCashUnitsCount()
      if ((!this.commonInfo.userId || this.commonInfo.userId==="") && data.data.userProfile.isSpecialist === true){
        this.commonInfo.userId = data.data.userProfile.id
      }
      if (this.commonInfo.users.length===0){
        data.data.allDoctors.forEach((doctor)=>{
          if (doctor.isActive && doctor.isSpecialist){
            this.commonInfo.users.push(doctor)
          }
        })
      }
      if (this.commonInfo.centers.length===0){
        data.data.medicalCenters.forEach((center)=>{
          if (center.isActive){
            this.commonInfo.centers.push(center)
          }
        })
      }
      this.analysisStore.setAnalysisTypes(data.data.allAnalysisTypes)
    })
  }
  


  setInfo(id){
    this.setUpdateUserCenter()
    this.getCommonInfo(id)
  }

  async setCommonInfoForExist(id){
    this.commonInfo.appointmentId = id
    this.commonInfo.isExisted = true

    await client.query({
      query: GENERAL_APPOINTMENT_INFO,
      variables: {
        id: id
      },
    }).then((data)=>{
      this.setCenterId(data.data.appointment.center?.id)
      this.setUserId(data.data.appointment.doctor?.id)
      this.setExistedAppointmentDoctor(data.data.appointment.doctor)
      this.setExistedAppointmentCenter(data.data.appointment.center)
      this.setPatientToAppointment(data.data.appointment.patient)
      this.setDate(data.data.appointment.date)
      this.setFromTime(data.data.appointment.timeStart.slice(0, 5))
      this.commonInfo.isFinished = data.data.appointment.isDone
      this.setToTime(data.data.appointment.timeEnd.slice(0, 5))
    })
  }

  setAnalisisTypeFromCard(id) {
    this.commonInfo.analisisTypeFromCard = id
  }

  setOpenAnalisisFromCard(data) {
    this.commonInfo.openAnalisisFromCard = data
  }

  openAnalisisPageFromCard(analisisTypeId) {
    this.setAnalisisTypeFromCard(analisisTypeId)
    this.setOpenAnalisisFromCard(true)
  }

  setDownOpenAnalisisPageFromCard() {
    this.setOpenAnalisisFromCard(false)
  }

  constructor() {
    makeAutoObservable(this)
  }
  

}