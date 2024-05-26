import { makeAutoObservable } from "mobx";
import startPhoneCall from "../../../../_common/commonRequests/startPhoneCall";
import authStore from "../../../../_common/stores/auth.store";

export default class StorePhonesModal {

  state = {
    openModal: false
  }
  

  get openModal() {
    return this.state.openModal
  }

  constructor() {
    makeAutoObservable(this)
  }

  setOpenModal(open) {
    this.state.openModal = open
  }

  async setCall(numberId) {
    return await new Promise((resolve, reject) => {
      startPhoneCall(authStore.currentMedicalCenterPhone, numberId, "id").catch((error)=>{
        reject(error)
      }).then((data) => {
        if (data){
          resolve(true)
        }else reject("an error ocured in startCall mutation")
      })
    })
  }
}