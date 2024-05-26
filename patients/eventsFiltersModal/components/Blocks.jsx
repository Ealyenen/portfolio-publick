import React, { useEffect, useState } from 'react';
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Typography, List, ListItem, FormControlLabel, Checkbox, Box } from "@mui/material"
import EventsFiltersModalStore from '../store/eventsFiltersModal.store';
import ButtonMain from '../../../../_components/UI/Buttons/ButtonMain';

const Blocks = provider()(observer(() => {
    const eventsFiltersModalStore = useInstance(EventsFiltersModalStore)

    const countDisableCheckbox = (isBlockActive) => {
        if (eventsFiltersModalStore.areChousenMoreThenOneBlock) {
            return false
        } else {
            if (!isBlockActive) {
                return false
            } else return true
        }
    }

    const handleSelectAll = () => {
        eventsFiltersModalStore.selectAllBlocks()
    }

    const handleChooseOnlyAppointment = () => {
        eventsFiltersModalStore.chooseOnlyAppointment()
    }

    const handleChangeAppointment = () => {
        eventsFiltersModalStore.setAppointmentFilter()
    }

    const handleChangeCalls = () => {
        eventsFiltersModalStore.setCallsFilter()
    }

    const handleChangeSms = () => {
        eventsFiltersModalStore.setSmsFilter()
    }

    const handleChangeInfoBlock = () => {
        eventsFiltersModalStore.setInfoBlockFilter()
    }

    const handleChangePrepayment = () => {
        eventsFiltersModalStore.setPrepaymentFilter()
    }

    const handleChangeScheduleRecord = () => {
        eventsFiltersModalStore.setSheduleRecordsFilter()
    }


    return (
        <>
            <Typography variant="h6">
                Блоки
            </Typography>
            <ButtonMain
                fullWidth
                sx={{ mt: 2 }}
                title={"Выбрать все"}
                onClick={handleSelectAll}
                disabled={eventsFiltersModalStore.areAllBlocksChousen ? true : false}
            />
            <ButtonMain
                fullWidth
                sx={{ mt: 2 }}
                title={"Только приемы"}
                onClick={handleChooseOnlyAppointment}
                disabled={eventsFiltersModalStore.areChousenOnlyAppointment ? true : false}
            />
            <List>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getAppointmentFilter())}
                                checked={eventsFiltersModalStore.getAppointmentFilter()}
                                onChange={handleChangeAppointment}
                            />
                        }
                        label="Приемы"
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getCallsFilter())}
                                checked={eventsFiltersModalStore.getCallsFilter()}
                                onChange={handleChangeCalls}
                            />
                        }
                        label="Звонки"
                    />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getSmsFilter())}
                                checked={eventsFiltersModalStore.getSmsFilter()}
                                onChange={handleChangeSms}
                            />
                        }
                        label="Смс" />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getInfoBlockFilter())}
                                checked={eventsFiltersModalStore.getInfoBlockFilter()}
                                onChange={handleChangeInfoBlock}
                            />
                        }
                        label="Инфоблоки" />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getPrepaymentFilter())}
                                checked={eventsFiltersModalStore.getPrepaymentFilter()}
                                onChange={handleChangePrepayment}
                            />
                        }
                        label="Предоплаты" />
                </ListItem>
                <ListItem>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={countDisableCheckbox(eventsFiltersModalStore.getSheduleRecordsFilter())}
                                checked={eventsFiltersModalStore.getSheduleRecordsFilter()}
                                onChange={handleChangeScheduleRecord}
                            />
                        }
                        label="Записи в расписании" />
                </ListItem>
            </List>
            {!eventsFiltersModalStore.areChousenMoreThenOneBlock &&
                <Typography sx={{ mt: 2, }} variant="caption">
                    *необходимо выбрать минимум 1 блок
                </Typography>
            }
        </>

    );
}));
export default Blocks;