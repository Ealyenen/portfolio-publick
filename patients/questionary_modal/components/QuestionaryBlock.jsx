import React from 'react';
import { useInstance } from "react-ioc";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionaryModalStore from '../store/questionaryModal.store';
import QuestionaryImgItem from './QuestionaryImgItem';
import QuestionaryButtons from './ActionButtons';

const QuestionaryBlock = (observer(() => {
    const questionaryModalStore = useInstance(QuestionaryModalStore)

    return (
        <>
            <QuestionaryButtons />
            {questionaryModalStore.getQuestionaries()?.length === 0 &&
                <Box sx={{ p: 2 }}>
                    Файлы отсутствуют
                </Box>
            }
            <Box sx={{ mt: 4, display: "flex", gap: 1, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                {questionaryModalStore.getQuestionaries()?.map((item, index) => {
                    return (
                        <QuestionaryImgItem key={item.id} item={item} index={index} />
                    )
                })}
            </Box>
        </>
    );
}));

export default QuestionaryBlock;