import { makeAutoObservable, toJS } from "mobx";
import { fullNameString } from "../../../../../_common/helpers/nameGenerationString";

export default class EventPopperStore {

    anchorEl = null

    time = null
    comment = null

    isInfo = false

    patientFullName = null
    patientAge = null
    patientNewSource = null
    patientBalance = null

    isPrepaidService = null
    
    //get
    get getAnchorEl()  {
        return this.anchorEl
    }

    getTime () {
        return this.time
    }

    getComment () {
        return this.comment
    }

    getIsInfo () {
        return this.isInfo
    }

    getPatientFullName () {
        return this.patientFullName
    }

    getPatientAge () {
        return this.patientAge
    }

    getPatientNewSource () {
        return this.patientNewSource
    }

    getPatientBalance () {
        return this.patientBalance
    }

    getIsPrepaidService () {
        return this.isPrepaidService
    }


    //set
    
    setAnchorEl(anchorEl) {
        this.anchorEl = anchorEl
    }

    setTime(str) {
        this.time = str
    }

    setComment(str) {
        this.comment = str
    }

    setIsInfo(value) {
        this.isInfo = value
    }

    setPatientFullName(str) {
        this.patientFullName = str
    }

    setPatientAge(str) {
        this.patientAge = str
    }

    setPatientNewSource(str) {
        this.patientNewSource = str
    }

    setPatientBalance(str) {
        this.patientBalance = str
    }

    setIsPrepaidService (value) {
        this.isPrepaidService = value
    }


    //open/close functions

    openPopper(anchorEl, time, comment, isInfo, patient, isNew){
        this.setAnchorEl(anchorEl)
        this.setTime(time)
        this.setComment(comment)
        this.setIsInfo(isInfo)
        if (!isInfo){
            this.setPatientFullName(fullNameString(patient?.lastName, patient?.firstName, patient?.patronymic))
            this.setPatientAge(patient?.age)
            this.setPatientBalance(patient?.balance?.value!=="0.00" ? patient?.balance?.value : null)
            this.setIsPrepaidService(patient?.isPrepaidService)
            if (isNew){
                this.setPatientNewSource(patient?.source?.name)
            }
        }
    }

    resetStore() {
        this.setAnchorEl(null)
        this.setTime(null)
        this.setComment(null)
        this.setIsInfo(null)
        this.setPatientFullName(null)
        this.setPatientAge(null)
        this.setPatientNewSource(null)
        this.setPatientBalance(null)
    }

    constructor() {
        makeAutoObservable(this)
    }

}