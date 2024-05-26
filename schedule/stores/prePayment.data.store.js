import { makeAutoObservable } from "mobx"
import { SEND_PREPAYMENT } from "../mutations/modal.mutations"
import { client } from "../../../_common/http/appoloClient"
export default class PrePaymentDataStore{
  state = {
    openModal: false,
    preloader: false,
    center: null,
    specialist: null,
    patientId: null,
    scheduleEntryId: null,
    tab: "prepayment",
    allData: [],
    totalSum: 0,
    totalSumWithPercentage: 0,
    openConfirmationModal: false,
    sumDiscount: 0,
    prepSumNew: 0,
    prepNewComment: "",
    prepNewPercent: 0,
  }
  constructor() {
    makeAutoObservable(this)
  }
  setOpenModal(open) {
    this.state.openModal = open
  }
  get openModal() {
    return this.state.openModal
  }
  setOpenConfirmationModal(open) {
    this.state.openConfirmationModal = open
  }
  get openConfirmationModal() {
    return this.state.openConfirmationModal
  }
  setPrepSum(data) {
    this.state.prepSumNew = data
  }
  get prepSumNew() {
    return this.state.prepSumNew
  }
  setPrepNewPercent(percent) {
    this.state.prepNewPercent = percent
  }
  get prepNewPercent() {
    return this.state.prepNewPercent
  }
  setPrepNewComment(text) {
    this.state.prepNewComment = text
  }
  get prepNewComment() {
    return this.state.prepNewComment
  }

  setAmountIncrement(id) {
    const selectedElement = this.state.allData.find((el) => {
      return el.idToFindBy === id
    })
    if (selectedElement) {
      selectedElement.amount++
    }
    this.setTotalSum()
  }

  setAmountDecrement(id) {
    const selectedElement = this.state.allData.find((el) => {
      return el.idToFindBy === id
    })
    if (selectedElement) {
      selectedElement.amount--
    }
    if (selectedElement.amount <= 0) {
      this.setDeleteUnit(selectedElement.idToFindBy)
    }
    this.setTotalSum()
    if (this.state.totalSum === 0 || this.state.allData.length === 0) {
      this.state.prepNewComment = ""
    }
  }

  setFilteredServicesInComment() {

    const servicesListNew = this.state.allData.map((el) => {
      const setServiceToGroup = this.state.allData.reduce((servicesList, itm) => {
        if (el.parent === itm.parent) {
          servicesList.push(itm.serviceName)
        }
        return servicesList
      }, [])
      return {
        parent: el.parent,
        service: setServiceToGroup
      }
    });

    const filteredServicesFromDuplicates = [...new Map(servicesListNew.map((m) => [m.parent, m])).values()];

    let convertServicesToString

    if (filteredServicesFromDuplicates.length > 0) {
      convertServicesToString = filteredServicesFromDuplicates.map((el) => {
        const convertInnerServicesToString = el.service.join(", ")
        return `/${el.parent}/ ${convertInnerServicesToString}`
      })
    }

    if (this.state.totalSum > 0) {
      this.setPrepNewComment(convertServicesToString.join())
    }

    if (this.state.totalSum < 0) {
      this.setPrepNewComment("")
    }
  }

  setTotalSum() {
    const sum = this.state.allData.reduce(
      (accumulator, currentValue) => {
        const unitTotalValue = +currentValue.value * currentValue.amount
        return accumulator + unitTotalValue
      },
      0,
    );
    this.state.totalSum = sum
    this.setFilteredServicesInComment()
  }
  get totalSum() {
    return this.state.totalSum
  }
  setSumWithDiscount(percent) {
    const percentage = (percent / 100) * this.state.totalSum
    const newSum = Math.floor(this.state.totalSum - percentage)
    this.state.prepSumNew = this.state.totalSum - newSum
  }
  setPatientId(id) {
    this.state.patientId = id
  }
  get patientId() {
    return this.state.patientId
  }
  setScheduleEntryId(id) {
    this.state.scheduleEntryId = id
  }
  get scheduleEntryId() {
    return this.state.scheduleEntryId
  }
  setPrepaymentDataClear() {
    this.state.allData = []
    this.state.totalSumTopWithDiscount = 0
    this.state.prepSumNew = 0
    this.state.prepNewComment = ""
    this.state.prepNewPercent = 0

    this.state.totalSum = 0
  }
  setClearDataByButtonClear() {
    this.state.allData = []
    this.state.totalSumTopWithDiscount = 0
    this.state.prepSumNew = 0
    this.state.prepNewComment = ""
    this.state.prepNewPercent = 0
    this.state.tab = "prepayment"
    this.state.totalSum = 0
  }
  setDeleteUnit(id) {
    this.state.allData = this.state.allData.filter((el) => {
      return el.idToFindBy !== id
    })
    if (this.state.totalSum === 0 || this.state.allData.length === 0) {
      this.state.prepNewComment = ""
    }
    this.setTotalSum()
  }
  
  get preloader() {
    return this.state.preloader
  }
  setSpecialist(data) {
    this.state.specialist = data
  }
  get specialist() {
    return this.state.specialist
  }
  setCenter(data) {
    this.state.center = data
  }
  get center() {
    return this.state.center
  }
  setTab(data) {
    this.state.tab = data
  }
  get tab() {
    return this.state.tab
  }
  setAllDataData(data, id, value, price) {
    const selectedElement = this.state.allData.find((el) => {
      return el.serviceId === id && el.value === value && el.price === price
    })

    if (selectedElement) {
      selectedElement.amount++
    } else {
      this.state.allData.push({
        ...data,
        amount: 1
      })
    }

    this.setTotalSum()
  }

  get allData() {
    return this.state.allData
  }

  async sendPrepayment() {
    await client.mutate({
      mutation: SEND_PREPAYMENT,
      //sorry cant show it(
    })
  }

}