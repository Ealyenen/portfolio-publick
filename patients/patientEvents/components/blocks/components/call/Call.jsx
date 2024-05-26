import React from 'react';
import { Grid, Typography, Box, IconButton } from "@mui/material"
import AccordionCastom from '../../../../../../../_components/UI/accordions/AccordionCastom';
import moment from "moment/moment"
import AddIcon from "@mui/icons-material/Add"
import classes from "../../../../../../../_common/assets/styles/audio.module.css"
import PhoneIcon from '@mui/icons-material/Phone';
import CallEditModalStore from '../../../CallEdit/store/callEdit.store';
import { useInstance } from 'react-ioc';

const Call = ({ call }) => {
    const callEditModalStore = useInstance(CallEditModalStore)

    const bgcolor = () => {
        switch (call?.status) {
            case 'CALLING':
                return "primary.light3";
            case 'ACCEPTED':
                return "primary.halfGreen";
            case 'NOT_ACCEPTED':
                return "primary.lightred4";
            case 'TALKING_END':
                return "primary.light3";
            case 'ENDED':
                return "primary.light3";
            case 'MISSED':
                return "primary.lightred4";
            case 'NOT_REACHED':
                return "primary.halfYellow";
            default:
                return "primary.light3";
        }
    }

    const status = () => {
        switch (call?.status) {
            case 'CALLING':
                return "Идет вызов";
            case 'ACCEPTED':
                return "Отвечен";
            case 'NOT_ACCEPTED':
                return "Не отвечен";
            case 'TALKING_END':
                return "Конец разговора";
            case 'ENDED':
                return "Завершен";
            case 'MISSED':
                return "Пропущенный";
            case 'NOT_REACHED':
                return "Недозвон";
            default:
                return "Статус отсутствует";
        }
    }

    const direction = () => {
        switch (call?.direction) {
            case 'incoming':
                return "Входящий";
            case 'outgoing':
                return "Исходящий";
            default:
                return "Направление не определено";
        }
    }

    const countPhoneType = () => {
        const type = call?.phoneObject?.type?.type
        const order = call?.phoneObject?.hasOrder ? " " + call?.phoneObject?.order : ""
        const comment = call?.phoneObject?.comment ? " " + call?.phoneObject?.comment : ""
        const fullType = " " + type + order + comment
        return type ? fullType : " Тип не определен"
    }

    const handleEditClick = (event) => {
        event.stopPropagation()
        callEditModalStore.setOpenPhoneCommentModal(true)
        callEditModalStore.setCallInfo(call?.id)
    }

    return (
        <Grid item xs={12} lg={7}>
            <AccordionCastom
                panelName={`call-${call?.id}`}
                title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <PhoneIcon />
                        <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                            {direction()} звонок
                        </Typography>
                        <Typography>
                            {call?.time?.slice(0, 5)}
                        </Typography>
                    </Box>

                }
                titleWithEditButton
                expandIcon={<AddIcon />}
                detailsSX={{ bgcolor: bgcolor() }}
                callsPanelColor={bgcolor()}
                RedButtonClick={handleEditClick}
            >
                <Typography variant="subtitle1" sx={{ display: { xs: "block", sm: "none" } }}>
                    {direction()} звонок
                </Typography>
                <Box>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Статус:
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {" "}{status()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Дата и время:
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {" "}{moment(call?.date).format("DD.MM.YYYY")} {call?.time?.slice(0, -10)} {" "}
                    </Typography>
                </Box>
                <Box>

                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Тип телефона:
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {countPhoneType()}
                    </Typography>
                </Box>
                {call?.linkToRecord ?
                    <Box sx={{ pt: 1, pb: 1, display: 'flex' }}>
                        <audio className={classes?.audioCallsPatient} controls="controls">
                            <source
                                src={call?.linkToRecord} />
                            Ваш браузер не поддерживает аудио.
                        </audio>
                    </Box>
                    :
                    <Typography>
                        Запись отсутствует
                    </Typography>
                }
                {(call?.comment || call?.reasons.length > 0) &&
                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
                        <Typography variant={"subtitle1"} sx={{ mr: 1 }}>Комментарий:</Typography> {call?.comment && <Typography
                            sx={{ pl: 1 }}>{call?.comment}{call?.reasons.length > 0 && ","}</Typography>}
                        {call?.reasons.length > 0 &&
                            call?.reasons.map((item, index) => {
                                return (
                                    <Typography key={index} sx={{
                                        pl: 1,
                                        pr: 1,
                                        pt: 0.5,
                                        pb: 0.5,
                                        color: "primary.light",
                                        bgcolor: "primary.light2",
                                        borderRadius: 1
                                    }}>{item.name}
                                    </Typography>
                                )
                            })
                        }
                    </Box>
                }
            </AccordionCastom>
        </Grid>
    );
};

export default Call;