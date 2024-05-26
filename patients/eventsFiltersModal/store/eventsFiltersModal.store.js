import {
    makeAutoObservable
} from "mobx";

export default class EventsFiltersModalStore {

    state = {
        openFiltersModal: false,
        isLookingForAnalize: false,
    }

    filters = {
        appointment: true,
        calls: true,
        sms: true,
        infoBlock: true,
        prepayment: true,
        sheduleRecords: true,
    }

    timeLapse = {
        useTimeLapse: false,
        dateFrom: null,
        dateTo: null,
    }

    //isLookingForAnalize

    getIsLookingForAnalize() {
        return this.state.isLookingForAnalize
    }

    setIsLookingForAnalize(value) {
        this.state.isLookingForAnalize = value
    }

    //search direction value is desc (last date and time go first (means from last event)) and asc (from first event)

    searchDirection = "desc"

    //filters customing modal. It set here as all options are needed for request and puts from here.

    getOpenFiltersModal() {
        return this.state.openFiltersModal
    }

    setOpenFiltersModal(value) {
        this.state.openFiltersModal = value
    }

    //get/set filters values

    getAppointmentFilter() {
        return this.filters.appointment
    }

    setAppointmentFilter() {
        this.filters.appointment = this.filters.appointment ? false : true
    }

    setAppointmentFilterValue(value) {
        this.filters.appointment = value
    }

    getCallsFilter() {
        return this.filters.calls
    }

    setCallsFilter() {
        this.filters.calls = this.filters.calls ? false : true
    }

    setCallsFilterValue(value) {
        this.filters.calls = value
    }

    getSmsFilter() {
        return this.filters.sms
    }

    setSmsFilter() {
        this.filters.sms = this.filters.sms ? false : true
    }

    setSmsFilterValue(value) {
        this.filters.sms = value
    }

    getInfoBlockFilter() {
        return this.filters.infoBlock
    }

    setInfoBlockFilter() {
        this.filters.infoBlock = this.filters.infoBlock ? false : true
    }

    setInfoBlockFilterValue(value) {
        this.filters.infoBlock = value
    }

    getPrepaymentFilter() {
        return this.filters.prepayment
    }

    setPrepaymentFilter() {
        this.filters.prepayment = this.filters.prepayment ? false : true
    }

    setPrepaymentFilterValue(value) {
        this.filters.prepayment = value
    }

    getSheduleRecordsFilter() {
        return this.filters.sheduleRecords
    }

    setSheduleRecordsFilter() {
        this.filters.sheduleRecords = this.filters.sheduleRecords ? false : true
    }

    setSheduleRecordsFilterValue(value) {
        this.filters.sheduleRecords = value
    }

    //get/set searchDirection

    getSearchDirection() {
        return this.searchDirection
    }

    setSearchDirection(value) {
        this.searchDirection = value
    }

    setSearchDirectionDesc() {
        this.searchDirection = "desc"
    }

    setSearchDirectionAsc() {
        this.searchDirection = "asc"
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


    //set all filter blocks to true

    selectAllBlocks() {
        this.filters.appointment = true
        this.filters.calls = true
        this.filters.sms = true
        this.filters.infoBlock = true
        this.filters.prepayment = true
        this.filters.sheduleRecords = true
    }

    //select only appointment

    chooseOnlyAppointment() {
        this.filters.appointment = true
        this.filters.calls = false
        this.filters.sms = false
        this.filters.infoBlock = false
        this.filters.prepayment = false
        this.filters.sheduleRecords = false
    }

    //getters for outputing/disablind elements
    get areChousenOnlyAppointment() {
        let filtersOn = this.filtersOn()
        return (this.filters.appointment && filtersOn === 1) ? true : false
    }

    get areChousenMoreThenOneBlock() {
        let filtersOn = this.filtersOn()
        return filtersOn >= 2 ? true : false
    }

    get areAllBlocksChousen() {
        let filtersOn = this.filtersOn()
        return filtersOn === 6 ? true : false
    }

    //counting are options default
    countAreOptionsCustomed() {
        let filtersOn = this.filtersOn()
        const areOptionsDefault = this.searchDirection === "desc" && filtersOn === 6 && this.timeLapse.useTimeLapse === false
        return {
            areOptionsCustomed: areOptionsDefault ? false : true,
            countedOptions: filtersOn + (this.timeLapse.useTimeLapse ? 1 : 0) + (this.searchDirection === "desc" ? 0 : 1)
        }
    }

    get countAreOptionsCustomedBoolean() {
        return this.countAreOptionsCustomed().areOptionsCustomed
    }

    //timelaps gets/sets

    getDateFrom() {
        return this.timeLapse.dateFrom
    }

    setDateFrom(date) {
        this.timeLapse.dateFrom = date
    }

    getDateTo() {
        return this.timeLapse.dateTo
    }

    setDateTo(date) {
        this.timeLapse.dateTo = date
    }

    getUseTimeLapse() {
        return this.timeLapse.useTimeLapse
    }

    setUseTimeLapse() {
        const prev = this.timeLapse.useTimeLapse
        this.timeLapse.useTimeLapse = prev ? false : true
        //sets dates to null if usingTimelapse becomes off (false)
        if (prev) {
            this.setDateFrom(null)
            this.setDateTo(null)
        }
    }

    setUseTimelapseValue(value) {
        this.timeLapse.useTimeLapse = value
    }

    //reset selections

    resetSelections() {
        this.selectAllBlocks()
        this.timeLapse.useTimeLapse = false
        this.timeLapse.dateFrom = null
        this.timeLapse.dateTo = null
        this.searchDirection = "desc"
    }

    //count can be modal closed. It cant be if dates are null

    checkDates() {
        return new Promise((resolve)=>{
            if (!this.timeLapse.dateFrom && !this.timeLapse.dateTo){
                this.setUseTimelapseValue(false)
            }
            resolve(true)
        })
    }

    constructor() {
        makeAutoObservable(this)
    }

}