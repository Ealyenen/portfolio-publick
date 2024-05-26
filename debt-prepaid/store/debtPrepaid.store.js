import {
    makeAutoObservable,
    toJS,
    action
} from "mobx";
import {
    client
} from "../../../_common/http/appoloClient";
import {
    ALL_DEBTS
} from "../query/debtPrepaid.queries";
import moment from "moment"

export default class DebtPrepaidStore {

    types = [{
            type: "DUTY",
            name: "Долг"
        },
        {
            type: "ADVANCE",
            name: "Аванс"
        },
    ]

    filters = {
        dateFrom: null,
        dateTo: null,
        type: "",
        user: null,
        patient: null,
    }

    state = {
        limit: 10,
        offset: 0,
        totalCount: 0,
        currentPage: 0,
        loading: false,
        error: false,
        debts: [],
    }

    //state actions

    get debts() {
        return toJS(this.state.debts)
    }

    setDebts(arr) {
        this.state.debts = arr
    }

    getLoading() {
        return this.state.loading
    }

    setLoading(value) {
        this.state.loading = value
    }

    getError() {
        return this.state.error
    }

    setError(value) {
        this.state.error = value
    }

    getCurrentPage() {
        return this.state.currentPage
    }

    setCurrentPage(num) {
        this.state.currentPage = num
    }

    getLimit() {
        return this.state.limit
    }

    getOffset() {
        return this.state.offset
    }

    setOffset(num) {
        this.state.offset = num
    }

    getTotalCount() {
        return this.state.totalCount
    }

    setTotalCount(num) {
        this.state.totalCount = num
    }

    get pagesQty() {
        return Math.floor(this.state.totalCount / this.state.limit) + (this.state.totalCount % this.state.limit > 0 ? 1 : 0)
    }

    resetPagination() {
        this.state.limit = 10
        this.state.offset = 0
        this.state.totalCount = 0
        this.state.currentPage = 0
    }

    //get/set 

    getDateFrom() {
        return this.filters.dateFrom
    }

    setDateFrom(date) {
        this.filters.dateFrom = date
    }

    getDateTo() {
        return this.filters.dateTo
    }

    setDateTo(date) {
        this.filters.dateTo = date
    }


    getType() {
        return this.filters.type
    }

    setType(id) {
        this.filters.type = id
    }

    getUser() {
        return this.filters.user
    }

    setUser(id) {
        this.filters.user = id
    }

    getPatient() {
        return this.filters.patient
    }

    setPatient(id) {
        this.filters.patient = id
    }

    //get choose options

    getTypes() {
        return this.types
    }

    //all options actions

    get countFilters() {
        let count = 0
        if (this.filters.dateFrom !== null) count++
        if (this.filters.dateTo !== null) count++
        if (this.filters.type !== "") count++
        if (this.filters.user !== null) count++
        if (this.filters.patient !== null) count++
        return count
    }

    resetFilters() {
        this.filters.dateFrom = null
        this.filters.dateTo = null
        this.filters.type = ""
        this.filters.user = null
        this.filters.patient = null
    }

    //request

    requestAllDebt() {
        this.setLoading(true)
        return new Promise((resolve, reject) => {
            client.query({
                query: ALL_DEBTS,
                variables: {
                    limit: this.state.limit,
                    offset: this.state.offset,
                    created_Lte: this.filters.dateTo ? moment(this.filters.dateTo).format("YYYY-MM-DD")+"T23:59:59" : undefined,
                    created_Gte: this.filters.dateFrom ? moment(this.filters.dateFrom).format("YYYY-MM-DD")+"T00:00:00" : undefined,
                    operationType: this.filters.type || undefined,
                    patient_Id: this.filters.patient?.id || undefined,
                    userId: this.filters.user?.id || undefined,
                }
            }).catch((err)=>{
                this.setLoading(false)
                this.setError(true)
                reject(err)
            }).then((data)=>{
                if (data?.data){
                    this.setTotalCount(data?.data?.allDebts?.totalCount)
                    this.setDebts(data?.data?.allDebts?.results)
                }
                this.setLoading(false)
                resolve(data?.data)
            })
        })
    }

    handleUpdateDutyObj(obj) {
        if (this.state.debts?.length>0){
            const index = this.debts.findIndex(debt => debt.id === obj.id);
            if (index !== -1) {
                const updatedDebts = [...this.debts.slice(0, index), obj, ...this.debts.slice(index + 1)];
                this.setDebts(updatedDebts)
            }
        }
    }

    constructor() {
        makeAutoObservable(this)
    }
}