import React from 'react';
import { useInstance } from "react-ioc";
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Box, Typography } from "@mui/material"
import AccordionCastom from "../../../../../../../_components/UI/accordions/AccordionCastom";
import moment from "moment/moment"
import AddIcon from "@mui/icons-material/Add"
import { SurnameAndInitialsString } from '../../../../../../../_common/helpers/nameGenerationString';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SheduleEditModalStore from '../../../sheduleEdit/store/sheduleEdit.store';

const Schedule = ({ schedule }) => {
    const sheduleEditModalStore = useInstance(SheduleEditModalStore)

    const handleOpenEditModal = (event) => {
        event.stopPropagation()
        sheduleEditModalStore.setOpenModal(true)
        sheduleEditModalStore.setData(schedule)
    }

    const time = schedule?.timeStart?.slice(0, -3) + " - " + schedule?.timeEnd?.slice(0, -3),
        date = moment(schedule?.date).format("DD.MM.YYYY"),
        status = schedule?.status?.name + (schedule?.isStudent ? " (ученическая запись)" : ""),
        created = moment(schedule?.created).format("DD.MM.YYYY")

    const specialist = schedule?.specialist ? SurnameAndInitialsString(
        schedule?.specialist?.lastName,
        schedule?.specialist?.firstName,
        schedule?.specialist?.patronymic) : "Данные отсутствуют"

    const adminCreated = schedule?.creator ? SurnameAndInitialsString(
        schedule?.creator?.lastName,
        schedule?.creator?.firstName,
        schedule?.creator?.patronymic) : "Данные отсутствуют"

    const detailsSXBgcolor = () => {
        if (schedule?.isActive) {
            return schedule?.status?.name === 'Не пришел' ? "primary.lightred4" : "primary.light3"
        } else return "primary.white"
    }

    const bgAndBordersColor = () => {
        if (schedule?.isActive) {
            return schedule?.status?.name === 'Не пришел' ? "primary.lightred2" : "primary.light2"
        } else return "primary.lightGrey2"
    }

    const tableRow = (title, text) => {
        return (
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" sx={{ width: 120, borderBottom: 1, borderBottomColor: bgAndBordersColor() }}>
                    <strong>{title}:</strong>
                </TableCell>
                <TableCell align="left" sx={{ borderBottom: 1, borderBottomColor: bgAndBordersColor() }}>
                    {text}
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Grid item xs={12} lg={7}>
            <AccordionCastom
                callsPanelColor={bgAndBordersColor()}
                titleWithEditButton
                panelName={`record${schedule?.id}`}
                title={
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                        <CalendarTodayIcon />
                        <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                            Запись
                        </Typography>
                        <Typography>
                            {time}
                        </Typography>
                    </Box>
                }
                expandIcon={<AddIcon />}
                detailsSX={{ bgcolor: detailsSXBgcolor() }}
                RedButtonClick={handleOpenEditModal}
            >
                <TableContainer>
                    <Table aria-label="schedule table">
                        <TableBody>
                            {tableRow("Дата и время", date + " " + time)}
                            {tableRow("Добавлена", created)}
                            {tableRow("Специалист", specialist)}
                            {tableRow("Добавил", adminCreated)}
                            {tableRow("Статус", status)}
                            {tableRow("Комментарий", schedule?.description)}
                            {!schedule?.isActive && tableRow("Запись удалена", "Да")}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionCastom>
        </Grid>
    );
};

export default Schedule;