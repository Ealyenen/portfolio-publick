import {makeAutoObservable} from "mobx";

export default class AllPatientCard {
    state = {
        refetching: false,
        eventsRefetching: false
    }

    constructor() {
      makeAutoObservable(this)
    }

    get refetching() {
        return this.state.refetching
    }

    setRefetching(data) {

        this.state.refetching = data
    }

    setEventsRefetching(mode){

        this.state.eventsRefetching = mode

    }

    get eventsRefetching(){

        return this.state.eventsRefetching
    }
}