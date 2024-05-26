import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import ButtonMain from "../../../../../../../_components/UI/Buttons/ButtonMain"
import StorePhonesModal from '../../../../../phones/stores/store';
import PhoneIcon from "@mui/icons-material/Phone";


const CallBtn = observer(() => {
    const patientStore = useInstance(PatientStore)
    const storePhonesModal = useInstance(StorePhonesModal)
    const [callBtnClicked, setCallBtnClicked] = useState(false)
    const [callTimer, setCallTimer] = useState(0)

    const callTimerProcess = () => {
        setCallTimer(5)
        let timer = setInterval(() => setCallTimer(prev => prev - 1), 1000)
        setTimeout(() => {
            clearInterval(timer)
            setCallTimer(0)
            setCallBtnClicked(false)
        }, 5000)
    }

    useEffect(() => {
        if (callBtnClicked) {
            callTimerProcess()
        }
    }, [callBtnClicked])

    const getBtnName = () => {
        const phone = patientStore.getDefaultPhone()
        const name = phone?.type?.type ? phone?.type?.type : "без названия"
        const order = phone?.hasOrder ? ` ${phone?.order}` : ""
        const comment = phone?.comment ? ` ${phone.comment}` : ""//` ${phone.comment?.length <= 13 ? phone.comment : `${phone.comment.slice(0, 10)}...`}` : ""
        return phone ? name + order + comment : "отсутствует"
    }

    const findDefaultNumber = () => {
        return patientStore.getDefaultPhone()?.id
    }

    async function handleFastCallClick() {
        setCallBtnClicked(true)
        await storePhonesModal.setCall(findDefaultNumber())
    }

    return (
        <ButtonMain
            disabled={callBtnClicked || !patientStore.getDefaultPhone()}
            color={"success"}
            title={callBtnClicked ? `повторить` : getBtnName()}
            icon={
                callBtnClicked ?
                    ` ${callTimer}`
                    :
                    <PhoneIcon />
            }
            onClick={handleFastCallClick}
        />
    );
});

export default CallBtn;