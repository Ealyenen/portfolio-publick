import React, { useEffect } from 'react';
import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance, provider } from "react-ioc";
import { useQuery } from "@apollo/client";
import PatientHeader from './patientHeader/PatientHeader';
import PatientBanners from './patientBanners/PatientBanners';
import PatientInfo from './patientInfo/PatientInfo';
import { PATIENT_COMMON_INFO } from '../_queries/patients.queries';
import { FullPageFallbackProgress } from '../../../_components/UI/preloaders/FullPageFallbackProgress';
import PatientStore from '../store/patient.store';
import PatientViewStore from './patientInfo/store/patientInfo.view.store';
import Divider from '@mui/material/Divider';


const PatientCommonInfo = provider(PatientViewStore)(observer(() => {
    const patientStore = useInstance(PatientStore)

    const {data, loading, error} = useQuery(PATIENT_COMMON_INFO,{
        variables: { id: patientStore?.getPatientId() }
    })

    useEffect(()=>{
        if (!loading && data && data.patient){
            patientStore.setAllPatientData(data.patient)
        }
    },[data, loading])

    if (loading){
        return(
            <FullPageFallbackProgress/>
        )
    }

    if (error){
        return(
            <Typography variant="h5">
                Возникла ошибка при попытке загрузить данные
            </Typography>
        )
    }

    return (
        <>
            <PatientHeader />
            <Divider sx={{mt: 4}}/>
            <PatientBanners />
            <PatientInfo/>
            <Divider sx={{mt: 4}}/>
        </>
    );
}));

export default PatientCommonInfo;