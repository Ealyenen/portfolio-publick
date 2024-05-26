import {
    makeAutoObservable, toJS
} from "mobx";
import {client} from "../../../_common/http/appoloClient";
import { UPLOAD_QUESTIONARIES } from "../_mutations/patients.mutations";
import { PATIENT_COMMON_INFO } from "../_queries/patients.queries";
import { fullNameString, SurnameAndInitialsString } from "../../../_common/helpers/nameGenerationString";
import moment from "moment"

export default class PatientStore {

    patientId = null
    commonInfo = {
        lastName: null,
        firstName: null,
        patronymic: null,
        isPatient: false,
        age: null,
        birthday: null,
        created: null,
        comment: null,
        phones: null,
        parents: null,
        questionnaireFiles: null,
        isPrepaidService: null,
        balance: {
            id: null,
            value: null,
        },
        sendSms: null
    }
    isQuestionary = null
    isLoadingQuestionary = false
    appointmentInMemoryQty = null
    memoryAppointmentsLimit = 10

    getMemoryAppointmentsLimit() {
        return this.memoryAppointmentsLimit
    }

    getAppointmentInMemoryQty() {
        return this.appointmentInMemoryQty
    }

    setAppointmentInMemoryQty(qty) {
        this.appointmentInMemoryQty = qty
    }

    //updates

    updateAnalisis = false
    updatePatientIllneses = false
    updateCommonInfo = false

    //get/set update

    getUpdateAnalisis(){
        return this.updateAnalisis
    }

    setUpdateAnalisis(value){
        this.updateAnalisis = value
    }

    getUpdatePatientIllneses(){
        return this.updatePatientIllneses
    }

    setUpdatePatientIllneses(value){
        this.updatePatientIllneses = value
    }

    getUpdateCommonInfo() {
        return this.updateCommonInfo
    }

    setUpdateCommonInfo(value) {
        this.updateCommonInfo = value
    }

    //get set parametrs

    getIsLoadingQuestionary() {
        return this.isLoadingQuestionary
    }

    getIsQuestionary() {
        return this.isQuestionary
    }

    getPatientId() {
        return this.patientId
    }

    setPatientId(id) {
        this.patientId = id
    }

    getLastName() {
        return this.commonInfo.lastName
    }

    getFirstName() {
        return this.commonInfo.firstName
    }

    getPatronymic() {
        return this.commonInfo.patronymic
    }

    getIsPatient() {
        return this.commonInfo.isPatient
    }

    getAge() {
        return this.commonInfo.age
    }

    getBirthday() {
        return this.commonInfo.birthday
    }

    getCreated() {
        return this.commonInfo.created
    }

    getComment() {
        return this.commonInfo.comment
    }

    getPhones() {
        return this.commonInfo.phones
    }

    getDefaultPhone() {
        const defaultRuPhone = this.commonInfo.phones?.filter((phone) => phone.isDefault && phone.ruNumber)
        const ruPhone = this.commonInfo.phones?.filter((phone) => phone.ruNumber)
        const phone = defaultRuPhone?.length>0 ? defaultRuPhone[0] : (ruPhone?.length>0 ? ruPhone[0] : null)
        return phone
    }

    getParents() {
        return this.commonInfo.parents
    }

    getQuestionnaireFiles() {
        return this.commonInfo.questionnaireFiles
    }

    getBalanceId() {
        return this.commonInfo.balance.id
    }

    getBalanceValue() {
        return this.commonInfo.balance.value
    }

    getIsPrepaidService() {
        return this.commonInfo.isPrepaidService
    }

    getSendSms() {
        return this.commonInfo.sendSms
    }

    setSendSms(value) {
        this.commonInfo.sendSms = value
    }

    //set

    setIsLoadingQuestionary(value) {
        this.isLoadingQuestionary = value
    }

    setIsQuestionary(value) {
        return this.isQuestionary = value
    }

    setLastName(str) {
        this.commonInfo.lastName = str
    }

    setFirstName(str) {
        this.commonInfo.firstName = str
    }

    setPatronymic(str) {
        this.commonInfo.patronymic = str
    }

    setIsPatient(value) {
        this.commonInfo.isPatient = value
    }

    setAge(num) {
        this.commonInfo.age = num
    }

    setBirthday(date) {
        this.commonInfo.birthday = date
    }

    setCreated(date) {
        this.commonInfo.created = date
    }

    setComment(str) {
        this.commonInfo.comment = str
    }

    setPhones(arr) {
        this.commonInfo.phones = arr
    }

    setParents(arr) {
        this.commonInfo.parents = arr
    }

    setQuestionnaireFiles(arr) {
        if (arr?.length>0){
            this.setIsQuestionary(true)
        }else this.setIsQuestionary(false)
        this.commonInfo.questionnaireFiles = arr
    }

    setBalanceId(id) {
        this.commonInfo.balance.id = id
    }

    setBalanceValue(value) {
        this.commonInfo.balance.value = value
    }

    setIsPrepaidService(value) {
        this.commonInfo.isPrepaidService = value
    }

    //set patient data from request
    setAllPatientData(patient) {
        this.setLastName(patient?.lastName)
        this.setFirstName(patient?.firstName)
        this.setPatronymic(patient?.patronymic)
        this.setIsPatient(patient?.isPatient)
        this.setAge(patient?.age)
        this.setBirthday(patient?.birthday)
        this.setCreated(patient?.created)
        this.setComment(patient?.comment)
        this.setPhones(patient?.phones)
        this.setParents(patient?.parents)
        this.setQuestionnaireFiles(patient?.questionnaires)
        this.setBalanceId(patient?.balance?.id)
        this.setBalanceValue(patient?.balance?.value)
        this.setIsPrepaidService(patient?.isPrepaidService)
        this.setSendSms(patient?.sendSms)
    }

    //handle functions

    updatePatientData() {
        this.setUpdatePatientIllneses(true)
        client.query({
            query: PATIENT_COMMON_INFO,
            variables:{
                id: this.patientId
            }
        }).catch((error)=>{
            alert ("Данные не были успешно обновлены")
        }).then((data)=>{
            if (data){
                this.setAllPatientData(data.data.patient)
            }
        })
    }

    //upload questionary files

    uploadQuestionary (files) {
        this.setIsLoadingQuestionary(true)
        return new Promise((resolve, reject)=>{
            const filesForSend = []
            for (let i = 0; i<files?.length; i++){
                if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(files[i].type)) {
                    filesForSend.push({file: files[i]})
                }
            }
            client.mutate({
                mutation: UPLOAD_QUESTIONARIES,
                variables: {
                input: {
                    patientId: this.patientId,
                    lastName: this.commonInfo.lastName,
                    firstName: this.commonInfo.firstName,
                    questionnaireFiles: filesForSend
                },
                },})
                .catch((error)=>{
                    reject(error)
                    alert("что-то пошло не так при отправке файла")
                }).then((data) => {
                    if (data?.data?.updatePatient?.patient?.questionnaires){
                        this.setQuestionnaireFiles(data.data.updatePatient?.patient?.questionnaires)
                    }
                    this.setIsLoadingQuestionary(false)
                    resolve(true)
            })
        })
        
    }

    constructor() {
        makeAutoObservable(this)
    }

    //get name and date for card or if their no name and date just title for page

    get cardTitle() {
        const fullName = fullNameString(this.commonInfo.lastName, this.commonInfo.firstName, this.commonInfo.patronymic)
        const name = fullName?.length>=40 ? SurnameAndInitialsString(this.commonInfo.lastName, this.commonInfo.firstName, this.commonInfo.patronymic) : fullName
        const birthday = this.commonInfo.birthday ? ` ${moment(this.commonInfo.birthday).format("DD.MM.YYYY")}` : ""
        return (name + birthday) || "Карта пациента"
    }

    get cardTitleShort() {
        const name = SurnameAndInitialsString(this.commonInfo.lastName, this.commonInfo.firstName, this.commonInfo.patronymic)
        const birthday = (name?.length<=20 && this.commonInfo.birthday) ? ` ${moment(this.commonInfo.birthday).format("DD.MM.YYYY")}` : ""
        return (name + birthday) || "Карта пациента"
    }

}