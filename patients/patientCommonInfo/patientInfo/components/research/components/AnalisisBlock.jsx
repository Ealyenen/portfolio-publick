import React, { useEffect } from 'react';
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { useQuery } from "@apollo/client";
import { PATIENT_ANALISIS } from '../../../../../_queries/patients.queries';
import PatientStore from '../../../../../store/patient.store';
import CircularProgress from '@mui/material/CircularProgress';
import AnalisisAccordion from './AnalisisAccordions';


const AnalisisBlock = (observer(() => {
    const patientStore = useInstance(PatientStore)

    const { data, loading, error, refetch } = useQuery(PATIENT_ANALISIS, {
        variables: {
            id: patientStore.getPatientId()
        }
    })

    useEffect(() => {
        if (patientStore.getUpdateAnalisis()) {
            refetch()
            patientStore.setUpdateAnalisis(false)
        }
    }, [patientStore.getUpdateAnalisis()])

    const setBlockFromData = () => {
        if (loading) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
                    <CircularProgress />
                </Box>
            )
        } else if (error) {
            return (
                <Box sx={{ p: 2 }}>
                    Возникла ошибка при попытке загрузить данные
                </Box>
            )
        }
    }

    const setAnalisisAccordions = () => {
        let analisisByType = data?.allAnalyzeTypes?.map((type) => {
            const analisis = data?.allAnalyzeSelectedPatient.filter((analyze) => analyze.analyzeType.id === type.id)
            return {
                id: type.id,
                name: type.name,
                analisis: analisis
            }
        })?.sort((a, b) => a.analisis?.length > 0 && b.analisis?.length === 0 ? -1 : (a.analisis.length === 0 && b.analisis.length > 0 ? 1 : 0)) || []
        return analisisByType
    }


    return (
        <Box>
            {setBlockFromData()}
            {setAnalisisAccordions()?.map((type) => {
                return (
                    <AnalisisAccordion type={type} key={`analyze-accrodion-${type.id}`} />
                )
            })}
        </Box>
    );
}));

export default AnalisisBlock;