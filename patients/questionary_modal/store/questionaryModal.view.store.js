import {
    makeAutoObservable
} from "mobx";

export default class QuestionaryModalViewStore {

    view = {
        open: false,
        openGallery: false,
        openDeleteAll: false,
        openDeleteChousen: false,
        openDeleteOne: false,
    }

    getOpenModal() {
        return this.view.open
    }

    setOpenModal(value) {
        this.view.open = value
    }

    getOpenGallery() {
        return this.view.openGallery
    }

    setOpenGallery(value) {
        this.view.openGallery = value
    }

    //get set open delete dialogs

    getOpenDeleteAll() {
        return this.view.openDeleteAll
    }

    getOpenDeleteChousen() {
        return this.view.openDeleteChousen
    }

    getOpenDeleteOne() {
        return this.view.openDeleteOne
    }

    setOpenDeleteAll(value) {
        this.view.openDeleteAll = value
    }

    setOpenDeleteChousen(value) {
        this.view.openDeleteChousen = value
    }

    setOpenDeleteOne(value) {
        this.view.openDeleteOne = value
    }

    constructor() {
        makeAutoObservable(this)
    }

}