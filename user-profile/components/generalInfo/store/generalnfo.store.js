import {
    makeAutoObservable, toJS
} from "mobx";
import { UPDATE_USER, UPDATE_USER_NETWORKS } from "../../../mutation/user.mutation";
import { client } from "../../../../../_common/http/appoloClient";
import authStore from "../../../../../_common/stores/auth.store";
import moment from "moment"

export default class StoreGeneralInfo {

    userData = {
        lastName: "",
        firstName: "",
        patronymic: "",
        birthday: null,
        phone: "",
        socialMedia: [],
        positions: {
            isSpecialist: false,
            isAdministrator: false,
            isStudent: false,
            position: null
        }
    }

    dataForChoose = {
        networkTypes: []
    }


    //get data

    getLastName() {
        return this.userData.lastName
    }

    getFirstName() {
        return this.userData.firstName
    }

    getPatronymic() {
        return this.userData.patronymic
    }

    getPhone() {
        return this.userData.phone
    }

    getIsSpecialist() {
        return this.userData.positions.isSpecialist
    }

    getIsAdministrator() {
        return this.userData.positions.isAdministrator
    }

    getIsStudent() {
        return this.userData.positions.isStudent
    }

    getPosition() {
        return this.userData.positions.position
    }

    getBirthday() {
        return this.userData.birthday
    }

    getSocialMedia() {
        let copiedObj = this.userData.socialMedia.map((item)=>{
            return {
                id: item.id,
                nickname: item.nickname,
                comment: item.comment,
                networkType: {
                    id: item.networkType?.id,
                    type: item.networkType?.type
                }
            }
        })
        return copiedObj 
    }

    getNetworkTypes() {
        return toJS(this.dataForChoose.networkTypes)
    }

    //set new Data

    setLastName(str) {
        this.userData.lastName = str
    }

    setFirstName(str) {
        this.userData.firstName = str
    }

    setPatronymic(str) {
        this.userData.patronymic = str
    }

    setNewName(lastName, firstName, patronymic) {
        return new Promise((resolve, reject)=>{
            client.mutate({
                mutation: UPDATE_USER,
                variables: {
                    input: {
                        email: authStore.user.email,
                        lastName: lastName.length>0 && lastName,
                        firstName: firstName.length>0 && firstName,
                        patronymic: patronymic.length>0 && patronymic
                    },
                },
            }).catch((error)=>{
                alert("Возникла ошибка при изменении фио")
                reject(error)
            }).then((data)=>{
                if(data.data.updateUserProfile.ok){
                    this.setLastName(lastName)
                    this.setFirstName(firstName)
                    this.setPatronymic(patronymic)
                    resolve(true)
                }
            })
        })
    }

    setBirthday(date) {
        this.userData.birthday = date
    }

    setNewBirthday(newDate) {
        return new Promise((resolve, reject)=>{
            client.mutate({
                mutation: UPDATE_USER,
                variables: {
                    input: {
                        email: authStore.user.email,
                        birthday: newDate && moment(newDate).format("YYYY-MM-DD")
                    },
                },
            }).catch((error)=>{
                alert("Возникла ошибка при изменении даты")
                reject(error)
            }).then((data)=>{
                if(data.data.updateUserProfile.ok){
                    this.setBirthday(newDate)
                    resolve(true)
                }
            })
        })
    }

    setSocialMedia(data) {
        this.userData.socialMedia = data
    }

    setNewSocialMedia(data, deleted) {
        return new Promise((resolve, reject)=>{
            let networks = []
            data.forEach((item) => {
                if (!item?.id){
                    networks.push({
                        networkType: item.networkType.id,
                        nickname: item.nickname,
                        comment: item.comment
                    })
                }
            })
            let forDelete = deleted.map((item)=>{
                return {
                    isDelete: item
                }
            })
            networks.concat(forDelete)
            client.mutate({
                mutation: UPDATE_USER_NETWORKS,
                variables: {
                    input: {
                        email: authStore.user.email,
                        socialNetworks: [...networks, ...forDelete]
                    },
                },
            }).catch((error)=>{
                alert("Возникла ошибка при изменении соцсетей")
                reject(error)
            }).then((data)=>{
                if(data.data.updateUserProfile.ok){
                    this.setSocialMedia(data.data.updateUserProfile.user.socialNetworks)
                }
            })
        })
    }

    //set data from request first time

    setAllProfileData(data) {
        this.userData.lastName = data?.lastName
        this.userData.firstName = data?.firstName
        this.userData.patronymic = data?.patronymic
        this.userData.birthday = data?.birthday
        this.userData.phone = data?.sip
        this.userData.positions.isSpecialist = data?.isSpecialist
        this.userData.positions.isAdministrator = data?.isAdministrator
        this.userData.positions.isStudent = data?.isStudent
        this.userData.positions.position = data?.position
    }

    constructor() {
        makeAutoObservable(this)
    }

}