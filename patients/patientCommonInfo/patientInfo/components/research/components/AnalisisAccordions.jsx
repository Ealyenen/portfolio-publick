import React, { useState } from 'react';
import { Box, Typography, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import AccordionCastom from "../../../../../../../_components/UI/accordions/AccordionCastom";
import moment from "moment"
import { parseAnalisisNamesAndDates } from '../../../../../../../_common/helpers/analisisParse';
import DataStoreAppointmentModal from '../../../../../appointment_modal/stores/data.store';
import StoreAppointmentModal from '../../../../../appointment_modal/stores/store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PatientEventsBlockStore from '../../../../../store/patientEventsBlock.store';
import EventsFiltersModalStore from '../../../../../eventsFiltersModal/store/eventsFiltersModal.store';

const AnalisisAccordion = (observer(({ type }) => {
    const patientEventsBlockStore = useInstance(PatientEventsBlockStore)
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)
    const [panelExpandedName, setPanelExpandedName] = useState('panel1');


    const panelChange = (panelName) => (event, newExpanded) => {
        setPanelExpandedName(newExpanded ? panelName : true);
    };

    const handleAnalisisClick = (dateTimeStart, dateTimeEnd, appointmentId) => {
        patientEventsBlockStore.setFilters(
            true,
            false,
            false,
            false,
            false,
            false,
            true,
            dateTimeStart,
            dateTimeEnd,
            "desc"
        )
        patientEventsBlockStore.setRequestEvents(true)
        eventsFiltersModalStore.setAppointmentFilterValue(true)
        eventsFiltersModalStore.setCallsFilterValue(false)
        eventsFiltersModalStore.setSmsFilterValue(false)
        eventsFiltersModalStore.setInfoBlockFilterValue(false)
        eventsFiltersModalStore.setPrepaymentFilterValue(false)
        eventsFiltersModalStore.setSheduleRecordsFilterValue(false)
        eventsFiltersModalStore.setSearchDirection("desc")
        eventsFiltersModalStore.setDateFrom(moment(dateTimeStart).format("YYYY-MM-DD"))
        eventsFiltersModalStore.setDateTo(moment(dateTimeEnd).format("YYYY-MM-DD"))
        eventsFiltersModalStore.setUseTimelapseValue(true)
        eventsFiltersModalStore.setIsLookingForAnalize(true)
        const scrollToAppointment = () => {
            const element = document?.getElementById(appointmentId)
            if (element) {
                const elementRect = element.getBoundingClientRect();
                const top = window.pageYOffset + elementRect.top - 200
                setTimeout(() => {
                    window.scrollTo({ top: top, behavior: 'smooth' })
                    observer.disconnect();
                }, 100);
            }
        }
        const observer = new MutationObserver((mutations, obs) => {
            if (document.getElementById(appointmentId)) {
                scrollToAppointment();
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    }

    const switchStatus = (type) => {
        switch (type) {
            case "SENT":
                return (<LocalShippingIcon sx={{ mb: -0.8, mr: 1 }} />)
            case "EXPECTED":
                return (<HourglassEmptyIcon sx={{ mb: -0.8, mr: 1 }} />)
            case "UNANSWERED":
                return (<ErrorOutlineIcon sx={{ mb: -0.8, mr: 1, color: "primary.lightred" }} />)
            case "PARTIALLY_ANSWERED":
                return (<StarHalfIcon sx={{ mb: -0.8, mr: 1 }} />)
            case "ANSWERED":
                return (<CheckCircleIcon sx={{ mb: -0.8, mr: 1, color: "primary.aquamarine" }} />)
            default:
                return ""
        }
    }

    return (
        <AccordionCastom
            key={`accordService${type.id}`}
            isClearTitle={type.analisis?.length > 0 ? false : true}
            expanded={type.analisis?.length > 0 ? (panelExpandedName === type.id) : false}
            onChange={panelChange(type.id)}
            panelName={type.id}
            title={type.analisis?.length > 0 ? type.name : `${type.name} (отсутствуют)`}
        >
            {type?.analisis?.map((analyze, index) => {
                const analisisNameData = analyze?.additionInformation && parseAnalisisNamesAndDates(analyze?.additionInformation)
                return (
                    <Box key={`analiz${type.id}${analyze.id}`}>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "column",
                                ":hover": { color: 'primary.light' },
                            }}
                            onClick={() => handleAnalisisClick(analyze?.appointment?.event?.eventDatetimeStart, analyze?.appointment?.event?.eventDatetimeEnd, analyze?.appointment?.appointmentId)}
                        >
                            <Typography variant="subtitle1" >
                                {switchStatus(analyze.status)}Дата проведения: {moment(analyze.appointmentDate && analyze.appointmentDate).format("DD.MM.YYYY")}
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {analisisNameData?.map((title, index) => {
                                    return (
                                        <Typography
                                            key={`addition-inf-${analyze.id}-${index}`}
                                            sx={{
                                                wordBreak: "break-word",
                                                pb: 1,
                                                borderBottom: analisisNameData.length > (index + 1) ? "1px solid" : "none",
                                                borderColor: "primary.light3"
                                            }}
                                        >
                                            {`${moment(title.date).format("DD.MM.YYYY")} ${title.name}`}
                                        </Typography>
                                    )
                                })}
                            </Box>

                        </Box>
                        {type.analisis.length > index + 1 &&
                            <Divider sx={{ mt: 1, mb: 2, borderColor: "primary.light4" }} />
                        }
                    </Box>
                )
            })}

        </AccordionCastom >
    );
}));

export default AnalisisAccordion;