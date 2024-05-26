import {
    makeAutoObservable
} from "mobx";

export default class PatientEventsBlockStore {

    state = {
        isFiltersBtnHierViewSpace: false,
        popperAnchor: null,
        requestEvents: false
    }

    filters = {
        appointment: true,
        calls: true,
        sms: true,
        infoBlock: true,
        prepayment: true,
        sheduleRecords: true,
        useTimeLapse: false,
        dateFrom: null,
        dateTo: null,
        searchDirection: "desc"
    }

    //get/set requestEvents

    getRequestEvents() {
        return this.state.requestEvents
    }

    setRequestEvents(value) {
        this.state.requestEvents = value
    }

    //set/get popperAnchor

    getPopperAnchor() {
        return this.state.popperAnchor
    }

    setPopperAnchor(anchor) {
        this.state.popperAnchor = anchor
    }

    //get/set filters after changing them

    getFilters() {
        return this.filters
    }

    setFilters (
        appointment,
        calls,
        sms,
        infoBlock,
        prepayment,
        sheduleRecords,
        useTimeLapse,
        dateFrom,
        dateTo,
        searchDirection
    ) {
        this.filters.appointment = appointment
        this.filters.calls = calls
        this.filters.sms = sms
        this.filters.infoBlock = infoBlock
        this.filters.prepayment = prepayment
        this.filters.sheduleRecords = sheduleRecords
        this.filters.useTimeLapse = useTimeLapse
        this.filters.dateFrom = dateFrom
        this.filters.dateTo = dateTo
        this.filters.searchDirection = searchDirection
    }

    //filters btn state

    getIsFiltersBtnHierViewSpace() {
        return this.state.isFiltersBtnHierViewSpace
    }

    setIsFiltersBtnHierViewSpace(value) {
        this.state.isFiltersBtnHierViewSpace = value
    }

    //count filters blocks are true
    filtersOn() {
        let filtersOn = 0
        if (this.filters.appointment) filtersOn++
        if (this.filters.calls) filtersOn++
        if (this.filters.sms) filtersOn++
        if (this.filters.infoBlock) filtersOn++
        if (this.filters.prepayment) filtersOn++
        if (this.filters.sheduleRecords) filtersOn++
        return filtersOn
    }

    //counting are options default or customed
    countAreOptionsCustomed() {
        let filtersOn = this.filtersOn()
        const areOptionsDefault = this.filters.searchDirection === "desc" && filtersOn === 6 && this.filters.useTimeLapse === false
        return {
            areOptionsCustomed: areOptionsDefault ? false : true,
            countedOptions: filtersOn + (this.filters.useTimeLapse ? 1 : 0) + (this.filters.searchDirection === "desc" ? 0 : 1)
        }
    }

    //geting data for bage on filters btn. It counts are choose default or no and count if default else puts string
    get customFiltersCount() {
        const countAreOptionsCustomed = this.countAreOptionsCustomed()
        return countAreOptionsCustomed.areOptionsCustomed ? countAreOptionsCustomed.countedOptions : null
    }

    get countAreOptionsCustomedBoolean() {
        return this.countAreOptionsCustomed().areOptionsCustomed
    }

    //reset selections

    resetSelections() {
        this.filters = {
            appointment: true,
            calls: true,
            sms: true,
            infoBlock: true,
            prepayment: true,
            sheduleRecords: true,
            useTimeLapse: false,
            dateFrom: null,
            dateTo: null,
            searchDirection: "desc"
        }
    }

    constructor() {
        makeAutoObservable(this)
    }

}