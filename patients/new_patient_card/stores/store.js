import { makeAutoObservable, toJS } from "mobx";
import { client } from "../../../../_common/http/appoloClient"
import { GET_ADMINISTRATOR } from "../../_queries/patients.queries"


export default class StoreNewPatientCardModal {


  openModal = false

  state = {
    admins: []
  }


  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(open) {
    this.openModal = open

    if (open === true){

      this.getPatientSelects()
    }



  }


  async getPatientSelects(){

    // const userGet = await client.query({
    //   query: GET_USERS,
    // })

    const getAdministrators = await client.query({
      query: GET_ADMINISTRATOR,
    })

    this.state.admins = getAdministrators.data.allAdministrators
  }

  get admins(){

    return this.state.admins
  }





}













export class StoreContractNewCardModal {
  state = {
    openModal: false
  }

  constructor() {
    makeAutoObservable(this)
  }

  get openModal() {
    return this.state.openModal
  }




  setOpenContractNewCardModal(open) {
    this.state.openModal = open
  }
}