import React, { useEffect } from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    FormControl,
    InputLabel, MenuItem, Select,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import AddIcon from "@mui/icons-material/Add";
import StoreAppointmentModal from "../stores/store";
import DataStoreAppointmentModal from "../stores/data.store";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { provider } from "react-ioc";
import { fullNameString } from '../../../../_common/helpers/nameGenerationString';
import MemoryAppointmentsBtn from './MemoryAppointmentsBtn';

const CommonInfoBlockExistedAppointment = provider()(observer(() => {
    const store = useInstance(StoreAppointmentModal);
    const dataStore = useInstance(DataStoreAppointmentModal);

    useEffect(() => {
        dataStore.setInfo()
    }, [dataStore])

    const infoToggle = () => store.setInfoExpandToggle();

    const fromTimeChange = (time) => {
        dataStore.saveFromTime(time)
    }

    const toTimeChange = (time) => {
        dataStore.saveToTime(time)
    }

    const finishClick = () => {
        dataStore.finishAppointment()
    }

    const deleteAppointment = () => {
        store.setDeleteAppointmentModalOpen(true)
    }



    return (
        <Accordion expanded={store.infoExpand} onChange={infoToggle} sx={{ boxShadow: 'none' }}>
            <AccordionSummary
                sx={{ bgcolor: 'primary.light2', flexDirection: 'row-reverse', }}
                expandIcon={<AddIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{flex: 1, display: "flex", alignItems: "center"}}>Информация о приеме</Typography>
                <MemoryAppointmentsBtn/>
            </AccordionSummary>
            <AccordionDetails sx={{ p: [2, 1], bgcolor: 'primary.light3', alignItems: 'center', display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Box sx={{ alignItems: 'center', display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <FormControl sx={{ minWidth: 244 }} size="small" focused>
                        <InputLabel disabled id="userSelect">Специалист</InputLabel>
                        <Select
                            labelId="userSelect"
                            id="userSelect"
                            value={dataStore.userId}
                            label="Специалист"
                            disabled
                        >
                            <MenuItem value={dataStore.userId}>
                                {fullNameString(dataStore?.existedAppointmentDoctor?.lastName, dataStore?.existedAppointmentDoctor?.firstName, dataStore?.existedAppointmentDoctor?.patronymic)}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 244 }} size="small" focused>
                        <InputLabel disabled id="centerSelect">Центр</InputLabel>
                        <Select
                            labelId="centerSelect"
                            id="centerSelect"
                            value={1}
                            label="Центр"
                            disabled
                        >
                            <MenuItem value={1}>
                                {dataStore?.existedAppointmentCenter?.name}
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 244 }} size="small" focused>
                        <MobileDatePicker
                            label="Дата"
                            inputFormat="DD.MM.yyyy"
                            value={dataStore.date}
                            disabled
                            renderInput={(params) => <TextField {...params} size="small" focused />}
                        />
                    </FormControl>
                    <Box sx={{ display: "inline-block", mr: 1 }}>
                        <FormControl focused sx={{ mr: 1 }}>
                            <TextField
                                size="small"
                                focused
                                id="timeStart"
                                label="от"
                                type="time"
                                value={dataStore.fromTime}
                                onChange={(newValue) => {
                                    fromTimeChange(newValue.target.value)
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </FormControl>
                        {dataStore.isFinished &&
                            <FormControl focused>
                                <TextField
                                    size="small"
                                    focused
                                    id="timeStart"
                                    label="до"
                                    type="time"
                                    value={dataStore.toTime}
                                    onChange={(newValue) => {
                                        toTimeChange(newValue.target.value);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </FormControl>
                        }
                    </Box>
                    {!dataStore.isFinished &&
                        <Button variant="outlined" onClick={() => finishClick()}>
                            <Typography variant="button">Завершить прием</Typography>
                        </Button>
                    }
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Button variant={"outlined"} sx={{ width: 240 }} onClick={() => deleteAppointment()}>
                        Удалить прием
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}));

export default CommonInfoBlockExistedAppointment;