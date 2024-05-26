import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { useQuery } from "@apollo/client";
import PatientStore from '../../../../store/patient.store';
import { PATIENT_ILLNESES } from '../../../../_queries/patients.queries';
import CircularProgress from '@mui/material/CircularProgress';
import PatientViewStore from '../../store/patientInfo.view.store';


const Illneses = observer(() => {
    const patientStore = useInstance(PatientStore)
    const patientViewStore = useInstance(PatientViewStore)

    const updateHeight = () => {
        const block = document.getElementById("illnes-data")
        const title = document.getElementById("illnes-title")
        if (block && title) {
            patientViewStore.setIllnesBlockHeight(block.getBoundingClientRect().height)
            patientViewStore.setIllnesTitleHeight(title.getBoundingClientRect().height)
        }
    }


    const { data, loading, error, refetch } = useQuery(PATIENT_ILLNESES, {
        variables: { id: patientStore?.getPatientId() }
    })

    useEffect(()=>{
        if (patientStore.getUpdatePatientIllneses()){
            refetch()
            patientStore.setUpdatePatientIllneses(false)
        }
    },[patientStore.getUpdatePatientIllneses()])

    useEffect(() => {
        updateHeight()
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        }
    }, [data]);

    const getIllnesesByData = () => {
        if (loading) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
                    <CircularProgress />
                </Box>
            )
        } else if (error) {
            return (
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    Возникла ошибка при попытке загрузить данные
                </Box>
            )
        }
    }

    return (
        <Grid item xs={12} sm={3} sx={{ alignSelf: "stretch" }}>
            <Paper sx={{ bgcolor: "primary.light3", height: "100%" }}>
                <Box id={"illnes-title"} sx={{ bgcolor: "primary.light2", p: 1, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <Typography variant="subtitle1" sx={{ fontSize: 18 }}>
                        Заболевания
                    </Typography>
                </Box>
                {getIllnesesByData()}
                <Box id={"illnes-data"} sx={{ p: 2, pt: 0, maxHeight: { xs: "auto", sm: 500 }, overflowY: "scroll" }}>
                    {data?.patient?.diseases.map((disease) => {
                        if (disease.toRepresentation) {
                            return (
                                <Box key={disease.id} sx={{ mt: 1, ':first-of-type': { mt: 0, pt: 2 } }}>
                                    <Typography variant="subtitle2" sx={{ display: "inline", fontWeight: 600 }}>
                                        {disease?.disease?.name}
                                    </Typography>
                                    {disease?.comment &&
                                        <Typography variant="body2" sx={{ display: "inline" }}>
                                            {" "}({disease?.comment})
                                        </Typography>
                                    }

                                </Box>
                            )
                        }
                    })}
                    {data?.patient?.individualDiseases.map((disease) => {
                        if (disease.toRepresentation) {
                            return (
                                <Box key={disease.id} sx={{ mt: 1, pt: 2, ':first-of-type': { mt: 0 } }}>
                                    <Typography variant="subtitle2" sx={{ display: "inline", fontWeight: 600 }}>
                                        {disease?.name}
                                    </Typography>
                                    {disease?.comment &&
                                        <Typography variant="body2" sx={{ display: "inline" }}>
                                            {" "}({disease?.comment})
                                        </Typography>
                                    }

                                </Box>
                            )
                        }
                    })}
                </Box>

            </Paper>
        </Grid>
    );
});

export default Illneses;