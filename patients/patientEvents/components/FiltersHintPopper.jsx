import React from "react";
import { Typography, Popper, Box, Paper, IconButton } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import PatientEventsBlockStore from "../../store/patientEventsBlock.store";
import moment from "moment"
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import SmsIcon from '@mui/icons-material/Sms';
import InfoIcon from '@mui/icons-material/Info';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PatientEventFiltersHint = observer(() => {
    const patientEventsBlockStore = useInstance(PatientEventsBlockStore)
    const anchorEl = patientEventsBlockStore.getPopperAnchor()
    const filters = patientEventsBlockStore.getFilters()

    const generateBlocksList = () => {
        let blocks = []
        if (filters.appointment) blocks.push({name: "Приемы", icon: <PersonIcon fontSize="small"/>})
        if (filters.calls) blocks.push({name: "Звонки", icon: <PhoneIcon fontSize="small"/>})
        if (filters.sms) blocks.push({name: "Смс", icon: <SmsIcon fontSize="small"/>})
        if (filters.infoBlock) blocks.push({name: "Инфоблоки", icon: <InfoIcon fontSize="small"/>})
        if (filters.prepayment) blocks.push({name: "Предоплаты", icon: <CreditScoreIcon fontSize="small"/>})
        if (filters.sheduleRecords) blocks.push({name: "Записи в расписании", icon: <CalendarTodayIcon fontSize="small"/>})
        return (
            <Box>
                {blocks?.map((block, index) => {
                    return (
                        <Box key={index} sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center"}}>
                            {block.icon}
                            <Typography>
                                {block.name}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        )
    }

    return (
        <>
            <Popper
                id={anchorEl ? "shedule-popover-hint" : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                sx={{ zIndex: 5, display: {xs: "none", md: "block"} }}
                placement="bottom-start"
            >
                <Paper sx={{ p: 2, maxWidth: {xs: 300, sm: 600} }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ display: "inline" }}>
                            Диапазон поиска:
                        </Typography>
                        <Typography sx={{ display: "inline" }}>
                            {filters.useTimeLapse ?
                                ` ${filters.dateFrom ? moment(filters.dateFrom).format("DD.MM.YYYY") : "первое событие"} - ${filters.dateTo ? moment(filters.dateTo).format("DD.MM.YYYY") : "последнее событие"}`
                                :
                                " за все время"
                            }
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ display: "inline" }}>
                            Направление сортировки:
                        </Typography>
                        <Typography sx={{ display: "inline" }}>
                            {filters.searchDirection === "desc" ?
                                " от последнего к первому"
                                :
                                " от первого к последнему"
                            }
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                        Выбранные блоки:
                    </Typography>
                    {generateBlocksList()}
                </Paper>
            </Popper >

        </>
    )

});

export default PatientEventFiltersHint