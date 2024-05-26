import { makeAutoObservable } from "mobx";
import { client } from "../../../../_common/http/appoloClient";
import { inject } from "react-ioc";
import DataStoreAppointmentModal from "./data.store"
import StoreAppointmentModal from "./store";
import { PRICE_LIST } from "../_queries/Appointment.queries";
import { ESTIMETE_SEND_SERVICE } from "../_mutations/newAppointment.mutations";


export default class StoreAppointmentEstimate {
    dataStore = inject(this, DataStoreAppointmentModal)
    viewStore = inject(this, StoreAppointmentModal)

    view = {
        priceId: 5,
        tabs: [
            {
                typeServices: "MEDICAL",
                label: "Медицинские услуги",
                id: 0,
            }, 
            {
                typeServices: "DOMESTIC",
                label: "Бытовые услуги",
                id: 1,
            }, 
        ],
        activeTab: null,
        isLoadingPrice: true
    }


    state = {
        prices: null,
    }


    constructor() {
        makeAutoObservable(this)
    }

    //view get/set

    get tabs() {
        return this.view.tabs
    }

    get activeTab() {
        return this.view.activeTab
    }

    setActiveTab(id) {
        return new Promise((resolve)=>{
            this.view.activeTab = this.view.tabs?.find(obj => obj.id === id) || this.view.tabs[0]
            resolve(true)
        })
    }

    setDefaultActiveTab() {
        return new Promise((resolve)=>{
            if (!this.view.activeTab){
                this.setActiveTab(this.view.tabs[0]?.id)
            }
            resolve(true)
        })
    }

    get isLoadingPrice() {
        return this.view.isLoadingPrice
    }

    setIsLoadingPrice(value) {
        this.view.isLoadingPrice = value
    }

    //state get/set

    get price () {
        return (id) => {
            return this.state.prices?.find(obj => obj.id === id)
          }      
    }

    pushPrice (id, price) {
        return new Promise((resolve)=>{
            if (!this.state.prices){
                this.state.prices = [{
                    id: id,
                    price: price,
                }]
            }else {
                this.state.prices.push({
                    id: id,
                    price: price,
                })
            }
            resolve(true)
        })
        
    }

    //requests/actions

    getPriceListRequest () {
        const activeTab = this.view.activeTab
        if (!(this.state.prices?.find(obj => obj.id === activeTab?.id))){
            this.setIsLoadingPrice(true)
            client.query({
            //cant show it
          }).then((data)=>{
            this.pushPrice(
                //cant show it
            ).then(()=>{
                this.setIsLoadingPrice(false)
            })
          })
        }
    }

    async sendService(serviceData) {
        //cant show it
      }
    

}