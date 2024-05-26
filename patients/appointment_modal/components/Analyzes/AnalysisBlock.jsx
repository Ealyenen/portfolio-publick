import React, { useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import RichTextEditor from "../../../../../_components/UI/rich-text/rich.text-editor";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { provider } from "react-ioc";
import StoreAppointmentAnalsies from '../../stores/analysis.store';
import AnalysisPhoto from './AnalysisPhoto';
import AnalysisDatesAndNames from './AnalysisDatesAndNames';

const AnalysisBlock = provider()(observer(() => {
    const [dateError, setDateError] = useState(false)
    const analysisStore = useInstance(StoreAppointmentAnalsies)

    useEffect(() => {
        if (analysisStore.analisisDateError) {
            setDateError(true)
        } else {
            setDateError(false)
        }
    }, [analysisStore, analysisStore.analisisDateError])

    const handleSetText = (text) => {
        if (text.replace(/<p>|<\/p>|<br>|\s|\&nbsp;/g, '') === "") {
            analysisStore.setText("")
        } else {
            analysisStore.setText(text)
        }
    }

    return (
        <>
            <AnalysisDatesAndNames />
            <RichTextEditor
                initialValue={analysisStore.text}
                getValue={(value) => handleSetText(value)}
            />
            <AnalysisPhoto />
        </>
    )
}));

export default AnalysisBlock