import { makeAutoObservable } from "mobx";
import { CALL_REASONS, REASONS } from "../../../../_queries/patients.queries"
import { client } from "../../../../../../_common/http/appoloClient";
import { UPDATE_CALL } from "../../../../_mutations/patients.mutations";

export default class CallEditModalStore {

  state = {
    id: null,
    openModal: false,
    reasonsOptions: [],
    preloader: false,
    comment: '',
    notReached: false,
    notReachedStatus: "",
    direction: "",
    status: "",
    callStatusWasEdited: false,
    rerender: false
  }

  getId() {
    return this.state.id
  }

  constructor() {
    makeAutoObservable(this)
  }

  get direction() {
    return this.state.direction
  }

  get openModal() {
    return this.state.openModal
  }

  get reasonsOptions() {
    return this.state.reasonsOptions
  }

  setRender(mode) {
    this.state.rerender = mode
  }

  get render(){
    return this.state.rerender
  }


  get preloader() {
    return this.state.preloader
  }

  get comment() {
    return this.state.comment
  }

  setReset() {
    this.state.comment = ''
    this.state.id = null

    this.state.reasonsOptions.map((parent) => {

      parent.children.map((reason) => {

        return [reason.isActive = false]
      })
    })
  }

  setOpenPhoneCommentModal(open) {
    if (open === false) {
      this.setReset()
    }
    this.state.openModal = open

  }

  setComment(text) {
    this.state.comment = text
  }

  setSwitchNotReached() {
    this.state.notReached = !this.state.notReached

    if (this.state.notReached === true && this.state.direction === "outgoing") {
      this.state.status = "NOT_REACHED"
    } if (this.state.notReached === false && this.state.direction === "outgoing") {
      return this.state.status
    }
  }

  get statusToChange(){
    return this.state.notReachedStatus
  }


  get notReached() {
    return this.state.notReached
  }

  updateCallReasons() {
    return new Promise((resolve)=>{
        this.state.preloader = true
      const reasonIds = []

      this.state.reasonsOptions.map((parent) => [
        parent.children.map((reason) => {

          if (reason.isActive === true) {
            return reasonIds.push(reason.id)
          }
        })
      ])


      client.mutate({
        mutation: UPDATE_CALL,
        variables: {
          input: {
            callId: this.state.id,
            comment: this.state.comment,
            clearComment: this.state.comment?.length > 0 ? false : true,
            reasons: reasonIds?.length > 0 ? reasonIds : [],
            clearReasons: reasonIds?.length > 0 ? false : true ,
            notReached: this.state.notReached === false ? false : true,
          },
        },
      }).then(() => {
        resolve(true)
        this.setOpenPhoneCommentModal(false)
        this.setRender(true)
      })
    })
    
  }

  async setAllReasons() {
    this.state.preloader = true

    await client.query({
      query: REASONS
    }).then((data) => {

      if (this.state.reasonsOptions?.length === 0) {
        data.data.allReasons.map((reasonObj) => {

          if (reasonObj.children?.length > 0) {

            reasonObj.children.map((reason) => {
              reason.isActive = false;
              delete reason.children
            })

            return this.state.reasonsOptions.push(reasonObj)
          }
        })
        this.state.preloader = false
      }
      this.state.preloader = false
    });
  }


  async setCallInfo(id) {
    this.state.id = id
    this.state.preloader = true
    this.state.openModal = true
    if (this.state.reasonsOptions?.length === 0) {
      await this.setAllReasons()
    }

    await client.query({
      query: CALL_REASONS,
      variables: {
        callId: id
      }
    }).then((data) => {
      this.state.comment = data.data.call?.comment
      this.state.status = data.data.call?.status
      this.state.notReached = data.data.call?.status === "NOT_REACHED" ? true : false
      this.state.direction = data.data.call?.direction

      data.data.call?.reasons.map((reason) => {
        this.state.reasonsOptions.map((parent) => {
          if (reason.parent.id === parent.id) {
            parent.children.map((reasonOutput) => {
              if (reasonOutput.id === reason.id) {
                return reasonOutput.isActive = true
              }
            })
          }
        })
      })
      this.state.preloader = false
    });
  }

  setChangeActiveReason(parentIndex, reasonIndex) {
    this.state.reasonsOptions[parentIndex].children[reasonIndex].isActive = !this.state.reasonsOptions[parentIndex].children[reasonIndex].isActive
  }

}