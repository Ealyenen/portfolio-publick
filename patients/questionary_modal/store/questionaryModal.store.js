import {
    makeAutoObservable, toJS
} from "mobx";
import {client} from "../../../../_common/http/appoloClient";
import { PATIENT_QUESTIONARIES } from "../queries/questionaryModal.queries";
import { CHANGE_QUESTIONARIES } from "../mutations/questionaryModal.mutations"

export default class QuestionaryModalStore {

    questionaries = []
    questionaryGalleryIndex = null
    chousen = []
    oneFileIdForDelete = null
    isLoading = false
    isError = false
    isUploadingFiles = false

    getOneFileIdForDelete() {
        return this.oneFileIdForDelete
    }

    setOneFileIdForDelete(id) {
        this.oneFileIdForDelete = id
    }

    getChousen() {
        return toJS(this.chousen)
    }

    setChousen(arr) {
        this.chousen = arr
    }

    addChousen(item) {
        if (!this.chousen?.includes(item)){
            this.chousen = this.chousen.concat([item])
        }
    }

    removeFromChousen(item) {
        this.chousen = this.chousen?.filter((el)=>el!==item)
    }

    getIsUploadingFiles() {
        return this.isUploadingFiles
    }

    setIsUploadingFiles(value) {
        this.isUploadingFiles = value
    }

    getQuestionaryGalleryIndex() {
        return this.questionaryGalleryIndex
    }

    setQuestionaryGalleryIndex(index) {
        this.questionaryGalleryIndex = index
    }

    getIsLoading() {
        return this.isLoading
    }

    setIsLoading(value) {
        this.isLoading = value
    }

    getIsError() {
        return this.isError
    }

    setIsError(value) {
        this.isError = value
    }

    getQuestionaries(){
        return this.questionaries
    }

    setQuestionaries(arr){
        this.questionaries = arr
    }

    loadQuestionaries(patientId){
        if (patientId){
            this.setIsLoading(true)
            client.query({
                query: PATIENT_QUESTIONARIES,
                variables: {
                    id: patientId
                }
            }).catch((error)=>{
                if (error){
                    this.setIsError(true)
                }
            }).then((data)=>{
                if (data?.data?.patient?.questionnaires){
                    this.setQuestionaries(data?.data?.patient?.questionnaires)
                }
                this.setIsLoading(false)
            })
        }
    }

    uploadQuestionaries(files, patientId, lastName, firstName) {
        this.setIsUploadingFiles(true)
        return new Promise((resolve, reject)=>{
            const filesForSend = []
            for (let i = 0; i<files?.length; i++){
                if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(files[i].type)) {
                    filesForSend.push({file: files[i]})
                }
            }
            client.mutate({
                mutation: CHANGE_QUESTIONARIES,
                variables: {
                input: {
                    patientId: patientId,
                    lastName: lastName,
                    firstName: firstName,
                    questionnaireFiles: filesForSend
                },
                },})
                .catch((error)=>{
                    reject(error)
                    alert("что-то пошло не так при отправке файла")
                }).then((data) => {
                    if (data?.data?.updatePatient?.patient?.questionnaires){
                        this.setQuestionaries(data.data.updatePatient?.patient?.questionnaires)
                    }
                    this.setIsUploadingFiles(false)
                    resolve(true)
            })
        })
    }

    //delete mutations

    deleteAllFiles(patientId, lastName, firstName) {
        return new Promise((resolve, reject)=>{
            let filesForSend = this.questionaries.map((item)=>{return{questionaryId: item.id, isDelete: true}})
            client.mutate({
                mutation: CHANGE_QUESTIONARIES,
                variables: {
                input: {
                    patientId: patientId,
                    lastName: lastName,
                    firstName: firstName,
                    questionnaireFiles: filesForSend
                },
                },})
                .catch((error)=>{
                    reject(error)
                    alert("что-то пошло не так при удалении файлов")
                }).then((data) => {
                    if (data?.data?.updatePatient?.patient?.questionnaires){
                        this.setQuestionaries(data.data.updatePatient?.patient?.questionnaires)
                    }
                    resolve(true)
            })
        })
    }

    deleteChousenFiles(patientId, lastName, firstName) {
        return new Promise((resolve, reject)=>{
            let filesForSend = this.chousen.map((item)=>{return{questionaryId: item, isDelete: true}})
            client.mutate({
                mutation: CHANGE_QUESTIONARIES,
                variables: {
                input: {
                    patientId: patientId,
                    lastName: lastName,
                    firstName: firstName,
                    questionnaireFiles: filesForSend
                },
                },})
                .catch((error)=>{
                    reject(error)
                    alert("что-то пошло не так при удалении файлов")
                }).then((data) => {
                    if (data?.data?.updatePatient?.patient?.questionnaires){
                        this.setChousen([])
                        this.setQuestionaries(data.data.updatePatient?.patient?.questionnaires)
                    }
                    resolve(true)
            })
        })
    }


    deleteOneFile(patientId, lastName, firstName) {
        return new Promise((resolve, reject)=>{
            client.mutate({
                mutation: CHANGE_QUESTIONARIES,
                variables: {
                input: {
                    patientId: patientId,
                    lastName: lastName,
                    firstName: firstName,
                    questionnaireFiles: [{
                        questionaryId: this.oneFileIdForDelete,
                        isDelete: true
                    }]
                },
                },})
                .catch((error)=>{
                    reject(error)
                    alert("что-то пошло не так при удалении файлов")
                }).then((data) => {
                    if (data?.data?.updatePatient?.patient?.questionnaires){
                        this.removeFromChousen(this.oneFileIdForDelete)
                        this.setOneFileIdForDelete(null)
                        this.setQuestionaries(data.data.updatePatient?.patient?.questionnaires)
                    }
                    resolve(true)
            })
        })
    }

    constructor() {
        makeAutoObservable(this)
    }

}