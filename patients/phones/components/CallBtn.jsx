import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import StorePhonesModal from '../stores/store';
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton } from "@mui/material"

const CallBtn = observer(({ phone }) => {
    const store = useInstance(StorePhonesModal)
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

    async function handleFastCallClick() {
        setCallBtnClicked(true)
        await store.setCall(phone?.id)
    }

    return (
        <IconButton
            disabled={callBtnClicked || !phone.ruNumber}
            color={"secondary"}
            size="small"
            onClick={handleFastCallClick}
        >
            {
                callBtnClicked ?
                    ` ${callTimer}`
                    :
                    <PhoneIcon />
            }
        </IconButton>
    );
});

export default CallBtn;