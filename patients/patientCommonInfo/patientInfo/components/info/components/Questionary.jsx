import React from 'react';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import ButtonMain from '../../../../../../../_components/UI/Buttons/ButtonMain';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LoadQuestionaryBtn from './LoadQuestionaryBtn';
import QuestionaryModalViewStore from '../../../../../questionary_modal/store/questionaryModal.view.store';

const Questionary = observer(() => {
    const patientStore = useInstance(PatientStore)
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)

    const handleWatchQuestionary = () => {
        questionaryModalViewStore.setOpenModal(true)
    }

    return (
        <Box sx={{ pb: 2, borderBottom: patientStore.getComment()?.length > 0 ? "1px solid" : "none", borderColor: "primary.light4" }}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontSize: 16 }}>
                Опросник:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                <LoadQuestionaryBtn />
                {patientStore.getIsQuestionary() &&
                    <ButtonMain
                        title={"Посмотреть"}
                        icon={<RemoveRedEyeIcon />}
                        mobileOnlyIcon
                        onClick={handleWatchQuestionary}
                    />
                }
            </Box>

        </Box>
    );
});

export default Questionary;