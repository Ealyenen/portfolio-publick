import React, { useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import PatientEventsBlockStore from "../../../store/patientEventsBlock.store";
import PatientEventsStore from "../../../store/patinetEvents.store";
import PrepaymentBlock from "./components/prepayment/PrepaymentBlock";
import Sms from "./components/sms/Sms";
import Schedule from "./components/schedule/Schedule";
import Call from "./components/call/Call";
import DateBanner from "./components/dateBanner/DateBanner";
import InfoRecord from "./components/infoRecord/InfoRecord";
import Appointment from "./components/appointment/Appointment";
import CallsBannerStore from "../../../../../_components/Layouts/auth-layout/stores/calls.store";
import PatientStore from "../../../store/patient.store";

const EventsBlocksWrap = observer(() => {
    const patientEventsBlockStore = useInstance(PatientEventsBlockStore)
    const patientEventsStore = useInstance(PatientEventsStore)
    const callsBannerStore = useInstance(CallsBannerStore)
    const patientStore = useInstance(PatientStore)

    useEffect(()=>{
        patientEventsStore.searchAgain()
    },[patientStore.patientId])

    const getSubsCalls = () => {
        callsBannerStore.callsArrayIncoming.map((call)=>{
            if (call?.patient?.id===patientStore?.getPatientId() && patientEventsBlockStore?.getFilters()?.calls){
                patientEventsStore?.callBySubscription(call?.id)
            }
        })
        callsBannerStore.callsArrayOutgoing.map((call)=>{
            if (call?.patient?.id===patientStore.getPatientId() && patientEventsBlockStore.getFilters()?.calls){
                patientEventsStore.callBySubscription(call?.id)
            }
        })
        if (callsBannerStore.currentCall && callsBannerStore.currentCall?.patient?.id===patientStore.getPatientId() && patientEventsBlockStore.getFilters()?.calls){
            patientEventsStore.callBySubscription(callsBannerStore?.currentCall?.id)
        }else if (!callsBannerStore?.currentCall){
            patientEventsStore.callBySubscriptionRemoveCurrentCall()
        }
    }

    useEffect(()=> {
        getSubsCalls()
    },[callsBannerStore.callsArrayIncoming, callsBannerStore.callsArrayOutgoing, callsBannerStore.currentCall, callsBannerStore.refechCallState])

    useEffect(() => {
        if (patientEventsStore.getEvents()?.length === 0) {
            patientEventsStore.reset().then(() => {
                patientEventsStore.requestEvents()
            })
        }
    }, [])

    useEffect(() => {
        if (patientEventsBlockStore.getRequestEvents()) {
            patientEventsStore.reset().then(() => {
                patientEventsStore.requestAddEvents()
            })
            patientEventsBlockStore.setRequestEvents(false)
        }
    }, [patientEventsBlockStore.getRequestEvents()])


    const getFirstEventsHeight = () => {
        const heights = patientEventsStore.lastEvents.slice(0, patientEventsStore.getLimit()).map((event) => {
            const eventData = document.getElementById(`event-item-${event?.id}`)
            const rect = eventData?.getBoundingClientRect()
            return rect?.height
        })
        return heights.reduce((a, b) => a + b)
    }

    useEffect(() => {
        const pixelsMustLeft = 0
        const scrollTopAndBottomUpload = () => {
            const boxElement = document?.getElementById("events-wrap")
            const rect = boxElement?.getBoundingClientRect()
            const bottomPosition = rect?.bottom
            const topPosition = rect?.top
            const pixelsLeftToScrollBottom = window?.innerHeight - bottomPosition
            if (pixelsMustLeft + pixelsLeftToScrollBottom >= 0 && patientEventsStore.getEvents()?.length < patientEventsStore.getEventsQty()) {
                if (patientEventsStore.canSendRequest) {
                    patientEventsStore.requestAddEvents()
                    if (patientEventsStore.lastEvents?.length > (patientEventsStore.getLimit() * 6) && (patientEventsStore.getLimit() < patientEventsStore.getEventsQty())) {
                        patientEventsStore.addTopBlockHeight(getFirstEventsHeight())
                    }
                }
            } else if (pixelsMustLeft + topPosition >= 0) {
                const firstEventOutput = document?.getElementById(`event-item-${patientEventsStore.getEvents()[0].id}`)
                if (((patientEventsStore.getOffset() - patientEventsStore.getOffsetStep()) > 0)) {
                    if (patientEventsStore.getEvents()?.length > patientEventsStore.getLimit() && !firstEventOutput) {
                        patientEventsStore.removeLastEvents()
                        patientEventsStore.setOffset(patientEventsStore.getOffset() - patientEventsStore.getOffsetStep())
                        patientEventsStore.removeLastTopBlockHeight()
                    }
                    if (firstEventOutput) {
                        patientEventsStore.resetTopBlockHeight()
                    }
                }
            }
        }
        const uploadMoreEvents = () => {
            const boxElement = document?.getElementById("events-wrap")
            const rect = boxElement?.getBoundingClientRect()
            const bottomPosition = rect?.bottom
            const pixelsLeftToScrollBottom = window?.innerHeight - bottomPosition
            if (pixelsMustLeft + pixelsLeftToScrollBottom >= 0 && patientEventsStore.getEvents()?.length < patientEventsStore.getEventsQty()) {
                patientEventsStore.requestAddEvents()
            }
        }
        const updateEvents = () => {
            if (patientEventsStore.canSendRequest) {
                if (patientEventsStore.getEventsQty() >= patientEventsStore.getEventsAmountScrollTypesChoose()) {
                    scrollTopAndBottomUpload()
                } else uploadMoreEvents()
            }
        }
        window.addEventListener("scroll", updateEvents)
        return () => {
            window.removeEventListener("scroll", updateEvents)
        }
    }, [])

    const outputDateBanner = (currentDate, nextDate) => {
        if (nextDate && currentDate !== nextDate) {
            return (
                <DateBanner date={currentDate} />
            )
        }
    }

    return (
        <>
            <Box id={"top-events-block"} sx={{ height: patientEventsStore.getEventsQty() >= patientEventsStore.getEventsAmountScrollTypesChoose() ? patientEventsStore.topBlockHeight : 0 }} />
            {patientEventsStore.getEventsQty() > 0 && patientEventsStore.getEvents() &&
                <Box id={"events-wrap"}>
                    {patientEventsStore.lastEvents?.map((patientEvent, index) => {
                        return (
                            <Box key={patientEvent?.id} id={`event-item-${patientEvent?.id}`} sx={{maxWidth: 1600}}>
                                {index > 0 ?
                                    outputDateBanner(
                                        patientEvent?.eventDatetimeStart?.slice(0, 10),
                                        patientEventsStore?.lastEvents[index - 1]?.eventDatetimeStart?.slice(0, 10)
                                    )
                                    :
                                    <DateBanner date={patientEvent?.eventDatetimeStart} />
                                }
                                <Box sx={{ ml: { xs: 0.8, md: 2.4 }, pl: 3, pt: 1, pb: 1, borderLeft: "1px solid", borderColor: "primary.light" }}>
                                    {patientEvent?.appointment &&
                                        <Appointment appointment={patientEvent?.appointment} />
                                    }
                                    {patientEvent?.call &&
                                        <Call call={patientEvent?.call} />
                                    }
                                    {patientEvent?.infoRecord &&
                                        <InfoRecord infoRecord={patientEvent?.infoRecord} />
                                    }
                                    {patientEvent?.prepayment &&
                                        <PrepaymentBlock prepayment={patientEvent?.prepayment} />
                                    }
                                    {patientEvent?.schedule &&
                                        <Schedule schedule={patientEvent?.schedule} />
                                    }
                                    {patientEvent?.smsMessage &&
                                        <Sms sms={patientEvent?.smsMessage} />
                                    }
                                </Box>
                                {patientEventsStore?.getEvents()?.length === patientEventsStore?.getEventsQty() && index + 1 === patientEventsStore.lastEvents?.length &&
                                    <DateBanner date={null} alternativeText={"Были показаны все найденные элементы"} useDoneIcon={true} />
                                }
                            </Box>
                        )
                    })}
                </Box>
            }
            {patientEventsStore.getIsLoading() &&
                <Box sx={{ width: "100%", p: 2, display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            }
            {patientEventsStore.getIsError() &&
                <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
                    Возникла ошибка при попытке загрузить данные
                </Typography>
            }
        </>
    )
});

export default EventsBlocksWrap