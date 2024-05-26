import {
    makeAutoObservable
} from "mobx";

export default class PasswordViewStore {

    state ={
        editMode: false,
        saveClicked: false
    }

    getSaveClicked() {
        return this.state.saveClicked
    }

    setSaveClicked(value) {
        this.state.saveClicked = value
    }

    getEditMode() {
        return this.state.editMode
    }

    setEditMode(value) {
        this.state.editMode = value
    }


    constructor() {
        makeAutoObservable(this)
    }

}