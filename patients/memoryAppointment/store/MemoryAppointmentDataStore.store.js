import {
    makeAutoObservable, toJS
} from "mobx";
import {
    GET_MEMORY_APPOINTMENTS
} from "../queries/memoryAppointments.queries";
import {
    client
} from "../../../../_common/http/appoloClient";
import { inject } from "react-ioc";
import PatientStore from "../../store/patient.store";

export default class MemoryAppointmentDataStore {
    patientStore = inject(this, PatientStore)

    appointmentsData = {
        appointments: [],
        loading: false,
        error: false,
    }

    getLoading() {
        return this.appointmentsData.loading
    }

    setLoading(value) {
        this.appointmentsData.loading = value
    }

    getError() {
        return this.appointmentsData.error
    }

    setError(value) {
        this.appointmentsData.error = value
    }

    setAppointments(arr) {
        this.appointmentsData.appointments = arr
    }

    requestAppointments() {
        this.setLoading(true)
        return new Promise((resolve)=>{
            const favoried = localStorage.getItem('appointmentsList')
            if (favoried) {
                const appointmentsList = JSON.parse(favoried)
                if (appointmentsList?.length > 0) {
                    client.query({
                        query: GET_MEMORY_APPOINTMENTS,
                        variables: {
                            ids: appointmentsList || []
                        },
                    }).catch((err) => {
                        this.setError(true)
                        console.log("error in request appointments (allappointments)", err)
                    }).then((data) => {
                        if (data?.data?.allAppointments) {
                            this.setAppointments(data.data.allAppointments)
                        } else {
                            this.setError(true)
                        }
                        this.setLoading(false)
                        resolve()
                    })
                }else{
                    this.setLoading(false)
                    this.setAppointments([])
                    resolve()
                }
            }else{
                this.setLoading(false)
                this.setAppointments([])
                resolve()
            }
        })
    }

    removeAppointmentFromLocalStorage(id){
        const favoried = localStorage.getItem('appointmentsList')
        if (favoried) {
            const appointmentsList = JSON.parse(favoried)
            if (!appointmentsList.includes(id)) {
                const newFavoried = [...appointmentsList, id]
                localStorage.setItem('appointmentsList', JSON.stringify(newFavoried))
                this.patientStore.setAppointmentInMemoryQty(newFavoried?.length || null)
            } else {
                const newFavoried = appointmentsList.filter((e) => e !== id)
                localStorage.setItem('appointmentsList', JSON.stringify(newFavoried))
                this.patientStore.setAppointmentInMemoryQty(newFavoried?.length || null)
            }
        } else {
            localStorage.setItem('appointmentsList', JSON.stringify([id]))
            this.patientStore.setAppointmentInMemoryQty(1)
        }
    }

    //remove appointment
    removeAppointmentById(id) {
        if (id){
            this.removeAppointmentFromLocalStorage(id)
            this.setAppointments(this.appointmentsData.appointments.filter((app) => app?.appointmentId!==id))
        }
    }

    removeAllAppointments() {
        const favoried = localStorage.getItem('appointmentsList')
        if (favoried){
            localStorage.removeItem('appointmentsList')
        }
        this.setAppointments([])
        this.patientStore.setAppointmentInMemoryQty(0)
    }

    get appointments() {
        return toJS(this.appointmentsData.appointments)
    }

    constructor() {
        makeAutoObservable(this)
    }

}