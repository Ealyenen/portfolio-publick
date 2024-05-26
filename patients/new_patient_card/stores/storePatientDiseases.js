import { makeAutoObservable } from "mobx";
import { client } from "../../../../_common/http/appoloClient"
import { GET_DISEASES } from "../../_queries/patients.queries"

export default class StorePatientDiseases {

  state ={

    diseasesList: [],
    loadDiseases: false,
  }

  constructor() {
    makeAutoObservable(this)
  }


  async setDiseasesList(){

    this.state.loadDiseases = true

    await client.query({
      query: GET_DISEASES
    }).then((data) => {

      let dataDis = []


      data?.data?.diseases?.map((dis) => {

        return dataDis.push({
          comment: dis.comment,
          diseaseId: dis.id,
          // isActive: dis.isActive,
          // isEnabled:dis.isEnabled,
          name:dis.name,
          order:dis.order,
          commentFromPatient: dis.commentFromPatient,
        })
      })

      this.state.diseasesList = dataDis.sort((a, b) => {
        if (a.order > b.order) return 1
        else if (a.order < b.order) return -1
        else return 0
      })

      this.state.loadDiseases = false

    })
  }

  get diseasesList(){

    return this.state.diseasesList
  }

  get loadDiseases(){

    return this.state.loadDiseases
  }

}


