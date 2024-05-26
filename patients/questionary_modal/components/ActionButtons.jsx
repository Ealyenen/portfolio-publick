import React from 'react';
import { useInstance } from "react-ioc";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import ButtonMain from '../../../../_components/UI/Buttons/ButtonMain';
import QuestionaryModalStore from '../store/questionaryModal.store';
import UploadBtn from './UploadBtn';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuestionaryModalViewStore from '../store/questionaryModal.view.store';

const QuestionaryButtons = (observer(() => {
    const questionaryModalStore = useInstance(QuestionaryModalStore)
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)

    const handleDeleteAll = () => {
        questionaryModalViewStore.setOpenDeleteAll(true)
    }

    const handleDeleteChousen = () => {
        questionaryModalViewStore.setOpenDeleteChousen(true)
    }

    return (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <UploadBtn />
                <ButtonMain
                    title={"Удалить все"}
                    icon={<DeleteIcon />}
                    mobileOnlyIcon
                    onClick={handleDeleteAll}
                />
            <ButtonMain
                disabled={!questionaryModalStore.getChousen()?.length>0}
                title={"Удалить выбранные"}
                icon={<DeleteForeverIcon />}
                mobileOnlyIcon
                onClick={handleDeleteChousen}
            />
        </Box>
    );
}));

export default QuestionaryButtons;