import React, { useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    TextField,
    Typography
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { provider } from "react-ioc";
import StoreAppointmentAnalsies from '../../stores/analysis.store';
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';
import { parseAnalisisNamesAndDatesToJSON } from '../../../../../_common/helpers/analisisParse';
import AnalysisHint from './AnalysisHint';
import NamesHintPopover from './NameHintPopover';

const AnalysisDatesAndNames = provider()(observer(() => {
    const analysisStore = useInstance(StoreAppointmentAnalsies)

    const addNameDate = () => {
        analysisStore.incrDatesAndNames()
    }

    const removeNameDate = (index) => {
        analysisStore.removeDatesAndNames(index)
        analysisStore.removeFromErrorNames(index)
        analysisStore.removeFromErrorDates(index)
        analysisStore.compareNamesInDatesAndNames()
        analysisStore.findErrorDatesInDatesAndNames()
    }

    const changeName = (index, name) => {
        analysisStore.setNameInDatesAndNames(index, name)
        analysisStore.removeFromErrorNames(index)
        analysisStore.compareNamesInDatesAndNames()
    }

    const changeDate = (index, name) => {
        analysisStore.setDateInDatesAndNames(index, name)
        analysisStore.removeFromErrorDates(index)
    }

    const setHelperText = (index, previousName, text) => {
        if (previousName?.length>0){
            analysisStore.setNameInDatesAndNames(index, `${previousName}, ${text}`)
        }else analysisStore.setNameInDatesAndNames(index, text)
        
    }

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <AnalysisHint />
            </Box>
            <Box sx={{ mt: 2 }}>
                {analysisStore?.datesAndNames?.map((analisis, index) => {
                    const isErrorName = analysisStore.errorNames.includes(index)
                    const isErrorDate = analysisStore.errorDates.includes(index)

                    return (
                        <Box 
                        sx={{ 
                            mb: 3, 
                            display: "flex", 
                            gap: 2, 
                            flexWrap: "wrap", 
                            alignItems: "center",
                            }}
                            >
                            <FormControl sx={{ minWidth: {xs: 244} }} size="small" focused>
                                <TextField
                                    error={isErrorName}
                                    label={"краткое название"}
                                    focused
                                    value={analisis.name}
                                    size="small"
                                    fullWidth
                                    onChange={(e) => changeName(index, e.target.value)}
                                />
                            </FormControl>
                            {/* <FormControl sx={{ minWidth: 244 }} size="small" focused>
                            <TextField
                                fullWidth
                                label="дни ожидания"
                                variant="outlined"
                                focused
                                size="small"
                                type="number"
                                inputProps={{ max: 40, min: 0 }}
                                value={analysisStore.waitingDays}
                                onChange={(event) => analysisStore.changeDaysAndWaitingDate(event.target.value)}
                            />
                        </FormControl> */}
                            <FormControl sx={{ minWidth: 244 }} size="small" focused>
                                <MobileDatePicker
                                    label="Дата ожидания"
                                    inputFormat="DD.MM.yyyy"
                                    value={analisis.date === "" ? null : analisis.date}
                                    onChange={(newValue) => changeDate(index, newValue)}
                                    renderInput={(params) =>
                                        isErrorDate ?
                                            <TextField color="error" {...params} size="small" focused />
                                            :
                                            <TextField {...params} size="small" focused />
                                    }
                                />
                            </FormControl>
                            <NamesHintPopover onClick={(text)=>setHelperText(index, analisis.name, text)}/>
                            <ButtonMain
                                title={"Удалить название и дату"}
                                onClick={() => removeNameDate(index)}
                            />
                        </Box>
                    )
                })
                }
            </Box>

            <ButtonMain
                title={"Добавить название и дату"}
                onClick={() => addNameDate()}
                disabled={analysisStore?.datesAndNames?.length > 9}
                sx={{ mb: 2 }}
            />
        </>
    )
}));

export default AnalysisDatesAndNames