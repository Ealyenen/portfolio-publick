import {
    makeAutoObservable
} from "mobx";

export default class GeneralViewStore {

    state ={
        birthdayEditMode: false,
        nameEditMode: false,
        socialEditMode: false,
    }

    getBirthdayEditMode() {
        return this.state.birthdayEditMode
    }

    setBirthdayEditMode(value) {
        this.state.birthdayEditMode = value
    }

    getNameEditMode() {
        return this.state.nameEditMode
    }

    setNameEditMode(value) {
        this.state.nameEditMode = value
    }

    getSocialEditMode() {
        return this.state.socialEditMode
    }

    setSocialEditMode(value) {
        this.state.socialEditMode = value
    }

    constructor() {
        makeAutoObservable(this)
    }

}