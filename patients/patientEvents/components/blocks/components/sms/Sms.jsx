import React from 'react';
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import AccordionCastom from "../../../../../../../_components/UI/accordions/AccordionCastom";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment/moment"
import { SurnameAndInitialsString } from '../../../../../../../_common/helpers/nameGenerationString';
import SmsIcon from '@mui/icons-material/Sms';

const Sms = ({ sms }) => {

    const switchStatusNameColor = () => {
        switch (sms?.status) {
            case 'NEW':
                return {
                    name: "Новое",
                    color: "primary.blue"
                }
            case 'DELIVERED':
                return {
                    name: "Доставлено",
                    color: "primary.lightGreen"
                }
            case 'SENT':
                return {
                    name: "Отправлено",
                    color: "primary.yellow"
                }
            case 'ERROR':
                return {
                    name: "Ошибка",
                    color: "primary.lightred3"
                }
            default:
                return {
                    name: "",
                    color: "none"
                }
        }
    }

    const status = () => {
        const status = switchStatusNameColor()
        return (
            <Box sx={{
                p: 0.5,
                backgroundColor: status?.color,
                borderRadius: 1
            }}>{status?.name}</Box>
        )
    }

    const phoneNaming = () => {
        const type = sms?.phone?.type?.type ? sms?.phone?.type?.type : "отсутствует"
        const order = sms?.phone?.hasOrder ? " " + sms?.phone?.order : ""
        const comment = sms?.phone?.comment ? " " + sms?.phone?.comment : ""
        return type + order + comment
    }

    return (

        <Grid item xs={12} lg={7}>
            <AccordionCastom
                panelName={`sms-${sms?.id}`}
                sms
                smsTitle={
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
                        <SmsIcon/>
                        <Typography sx={{display: {xs: "none", sm: "block"}}}>Сообщение{"\u00A0"}</Typography>
                        <Typography>{moment(sms?.dispatch).format("HH:mm")}</Typography>
                        {status()}
                    </Box>
                }
                expandIcon={<AddIcon />}
                detailsSX={{ backgroundColor: 'primary.light3' }}
            >
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                    <Typography variant="subtitle1">
                        Телефон:
                    </Typography>
                    <Typography>
                        {phoneNaming()}
                    </Typography>
                    <Typography variant="subtitle1">
                        Отправитель:
                    </Typography>
                    <Typography>
                        {SurnameAndInitialsString(
                            sms?.admin?.lastName,
                            sms?.admin?.firstName,
                            sms?.admin?.patronymic
                        )}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography 
                    sx={{ 
                        mt: 0.5, 
                        p: 2, 
                        bgcolor: "white", 
                        border: "1px solid", 
                        borderColor: "primary.light4", 
                        borderRadius: 1 ,
                        wordWrap: "break-word"
                        }}>
                        {sms?.text}
                    </Typography>
                </Box>
            </AccordionCastom>
        </Grid>
    );
};

export default Sms;