import React, { useEffect } from 'react';
import { useInstance, provider } from "react-ioc";
import BaseModal from '../../../_components/UI/modals/BaseModal'
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionaryModalViewStore from './store/questionaryModal.view.store';
import QuestionaryModalStore from './store/questionaryModal.store';
import CircularProgress from '@mui/material/CircularProgress';
import PatientStore from '../store/patient.store';
import QuestionaryBlock from './components/QuestionaryBlock';
import QuestionaryGallery from './components/QuestionaryGallery';
import DeleteAllDialog from './components/DeleteAllDialog';
import DeleteChousenDialog from './components/DeleteChousenDialog';
import DeleteOneDialog from './components/DeleteOneDialog';

const QuestionaryModal = provider(QuestionaryModalStore)(observer(() => {
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)
    const questionaryModalStore = useInstance(QuestionaryModalStore)
    const patientStore = useInstance(PatientStore)

    const mainTheme = useTheme();
  const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("sm"));

    useEffect(() => {
        questionaryModalStore.loadQuestionaries(patientStore?.getPatientId())
    }, [])

    const handleCloseModal = () => {
        patientStore.setQuestionnaireFiles(questionaryModalStore.getQuestionaries())
        questionaryModalViewStore.setOpenModal(false)
    }

    const setQuestionaryBlock = () => {
        if (questionaryModalStore.getIsLoading()) {
            return (
                <Box sx={{ height: 300, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </Box>
            )
        } else if (questionaryModalStore.getIsError()) {
            return (
                <Box>
                    Возникла ошибка при попытке загрузить данные
                </Box>
            )
        }
    }


    return (
        <>
            <BaseModal
                title={"Опросник"}
                open={questionaryModalViewStore.getOpenModal()}
                hideSave
                hideClose={!mobileBreakpoint}
                closeTitle="Закрыть"
                onClose={() => handleCloseModal()}
                maxWidth={'sm'}
            >
                <Box sx={{ minHeight: 300, width: "100%" }}>
                    {setQuestionaryBlock()}
                    <QuestionaryBlock />
                </Box>
            </BaseModal>
            <QuestionaryGallery />
            {questionaryModalViewStore.getOpenDeleteAll() && <DeleteAllDialog/>}
            {questionaryModalViewStore.getOpenDeleteChousen() && <DeleteChousenDialog/>}
            {questionaryModalViewStore.getOpenDeleteOne() && <DeleteOneDialog/>}
        </>

    );
}));

export default QuestionaryModal;