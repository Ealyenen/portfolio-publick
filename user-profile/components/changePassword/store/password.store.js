import {
    makeAutoObservable
} from "mobx";
import {
    UPDATE_PASSWORD
} from "../../../mutation/user.mutation";
import {
    client
} from "../../../../../_common/http/appoloClient";
import authStore from "../../../../../_common/stores/auth.store";

export default class PasswordStore {

    state = {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
        isSameNewPassword: true,
        isNewPasswordSuitCharConditions: false,
        requestMsg: "",
        success: false,
    }

    getSuccess() {
        return this.state.success
    }

    setSuccess(value) {
        this.state.success = value
    }

    getRequestMsg() {
        return this.state.requestMsg
    }

    setRequestMsg(msg) {
        this.state.requestMsg = msg
    }

    //check passwords

    getIsSameNewPassword() {
        return this.state.isSameNewPassword
    }

    setIsSameNewPassword() {
        if (this.state.newPassword === this.state.repeatNewPassword) {
            this.state.isSameNewPassword = true
        } else this.state.isSameNewPassword = false
    }

    getIsNewPasswordSuitCharConditions() {
        return this.state.isNewPasswordSuitCharConditions
    }

    setIsNewPasswordSuitCharConditions(value) {
        this.state.isNewPasswordSuitCharConditions = value
    }

    checkIsNewPassSuitsConditions() {
        const hasDigit = /\d/.test(this.state.newPassword),
            hasLetter = /[a-zA-Z]/.test(this.state.newPassword),
            hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.state.newPassword);
        if (hasDigit && hasLetter && hasSpecialChar && this.state.newPassword.length>=6) {
            this.setIsNewPasswordSuitCharConditions(true)
        }
    }

    //get/set passwords

    getOldPassword() {
        return this.state.oldPassword
    }

    setOldPassword(str) {
        this.state.oldPassword = str
    }

    getNewPassword() {
        return this.state.newPassword
    }

    setNewPassword(str) {
        this.state.newPassword = str
        this.checkIsNewPassSuitsConditions()
        this.setIsSameNewPassword()
    }

    getRepeatNewPassword() {
        return this.state.repeatNewPassword
    }

    setRepeatNewPassword(str) {
        this.state.repeatNewPassword = str
        this.setIsSameNewPassword()
    }

    resetStore() {
        this.setOldPassword("")
        this.setNewPassword("")
        this.setRepeatNewPassword("")
        this.setIsNewPasswordSuitCharConditions(false)
    }

    resetMutationAnswer() {
        this.setSuccess()
        this.setRequestMsg()
    }

    saveNewPassword() {
        return new Promise((resolve, reject) => {
            if (this.state.isSameNewPassword && this.state.isNewPasswordSuitCharConditions) {
                client.mutate({
                    mutation: UPDATE_PASSWORD,
                    variables: {
                        userId: authStore.user.id,
                        newPassword: this.state.newPassword,
                        oldPassword: this.state.oldPassword,
                    },
                }).catch((error) => {
                    reject(error)
                }).then((data) => {
                    this.setSuccess(data.data.changePassword.success)
                    this.setRequestMsg(data.data.changePassword.msg)
                    if (data.data.changePassword.success) {
                        resolve(true)
                    } else {
                        reject(data.data.changePassword.msg)
                    }
                })

            } else {
                reject()
            }
        })
    }

    constructor() {
        makeAutoObservable(this)
    }

}