import {
    makeAutoObservable
} from "mobx";

export default class StorePrepayment {

    state = {
        prepayment: null,
    }

    constructor() {
        makeAutoObservable(this)
    }

    get prepayment() {
        return this.state.prepayment
    }

    setPrepayment(prepayment) {
        this.state.prepayment = prepayment
    }

    switchPrepaymentStatus(status) {
        let newStatus
        let color = "none"
        switch (true) {
            case status === "CREATED":
                newStatus = "Создано"
                color = "primary.lightblue"
                break
            case status === "WITHOUT":
                newStatus = "Без статуса"
                color = "primary.lightGrey"
                break
            case status === "ACCEPTED":
                newStatus = "Подписано"
                color = "primary.yellow"
                break
            case status === "PAYED":
                newStatus = "Оплачено"
                color = "primary.green"
                break
            case status === "ERROR":
                newStatus = "Ошибка"
                color = "primary.lightred2"
                break
            case status === "CHEQUE_GRANT":
                newStatus = "Выдан чек"
                color = "primary.green"
                break
            case status === "CHEQUE_ERROR":
                newStatus = "Чек не выдан"
                color = "primary.lightred2"
                break
            default:
                newStatus = ""
                color = "none"
                break
        }
        return {
            status: newStatus,
            color: color
        }
    }

    countAllPrice() {
        return this.state.prepayment.units.reduce((accumulator = 0, unit) => accumulator + unit.totalPrice, 0)
    }

    async printPrepayment() {
        if (this.state.prepayment.status === "PAYED" && this.state.prepayment.payed) {
            let sendObj = {
                "prepayment_id": this.state.prepayment?.id
            }
            let response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/prepayment/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendObj)
            })
            if (response.ok) {
                let blob = await response.blob();
                let url = URL.createObjectURL(blob);
                let newTab = window.open(url, '_blank');

                newTab.onload = function () {
                    setTimeout(() => {
                        newTab.document.title = 'Предоплата';
                        newTab.print();
                    }, 100);

                };
            }
        }
    }

}