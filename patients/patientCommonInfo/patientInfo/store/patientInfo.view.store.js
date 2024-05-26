import {
    makeAutoObservable
} from "mobx";

export default class PatientViewStore {

    infoBlockHeight = null
    infoTitleHeight = null
    illnesBlockHeight = null
    illnesTitleHeight = null

    //info block

    getInfoBlockHeight() {
        return this.infoBlockHeight
    }

    setInfoBlockHeight(height) {
        this.infoBlockHeight = height
    }

    //info title

    getInfoTitleHeight() {
        return this.infoTitleHeight
    }

    setInfoTitleHeight(height) {
        this.infoTitleHeight = height
    }

    //ullnes block

    getIllnesBlockHeight() {
        return this.illnesBlockHeight
    }

    setIllnesBlockHeight(height) {
        this.illnesBlockHeight = height
    }

    //illnes title

    getIllnesTitleHeight() {
        return this.illnesTitleHeight
    }

    setIllnesTitleHeight(height){
        this.illnesTitleHeight = height
    }

    //get height for research block

    get researchBlockHeight () {
        let height = 180
        if (typeof(this.infoBlockHeight)==="number" && typeof(this.infoTitleHeight)==="number" && typeof(this.illnesBlockHeight)==="number" && typeof(this.illnesTitleHeight)==="number"){
            if (this.infoTitleHeight > this.illnesTitleHeight && this.infoBlockHeight > this.illnesBlockHeight){
                height = this.infoBlockHeight + (this.infoTitleHeight - this.illnesTitleHeight)
            }else height = Math.max(this.infoBlockHeight, this.illnesBlockHeight)
        }
        return height
    }

    constructor() {
        makeAutoObservable(this)
    }

}