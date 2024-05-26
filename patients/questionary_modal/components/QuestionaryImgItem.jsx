import React, { useState } from 'react';
import { useInstance } from "react-ioc";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionaryModalStore from '../store/questionaryModal.store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import QuestionaryModalViewStore from '../store/questionaryModal.view.store';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionaryImgItem = (observer(({ item, index }) => {
    const questionaryModalStore = useInstance(QuestionaryModalStore)
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)
    const [hovered, setHovered] = useState(false)

    const mouseEnterBlock = () => {
        setHovered(true)
    }

    const mouseLeaveBlock = () => {
        setHovered(false)
    }

    const handleWatchClick = (event) => {
        event.stopPropagation()
        questionaryModalStore.setQuestionaryGalleryIndex(index)
        questionaryModalViewStore.setOpenGallery(true)
    }

    const handleChoose = () => {
        if (!questionaryModalStore.getChousen()?.includes(item.id)) {
            questionaryModalStore.addChousen(item.id)
        } else {
            questionaryModalStore.removeFromChousen(item.id)
        }
    }

    const handleDeleteOneClick = (event) => {
        event.stopPropagation()
        questionaryModalStore.setOneFileIdForDelete(item.id)
        questionaryModalViewStore.setOpenDeleteOne(true)
    }

    return (
        <Box onClick={handleChoose} sx={{ flex: 1, borderRadius: 1.8, border: questionaryModalStore.getChousen()?.includes(item.id) ? "4px solid" : "none", borderColor: "primary.main" }}>
            <Box
                sx={{
                    backgroundImage: `url(${item.fileLink && item.fileLink})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    minWidth: 200,
                    height: 300,
                    borderRadius: 1.4,
                    border: questionaryModalStore.getChousen()?.includes(item.id) ? "2px solid" : "none",
                    borderColor: "primary.white",
                    transform: questionaryModalStore.getChousen()?.includes(item.id) ? "scale(1.01)" : "none"
                }}
                onMouseEnter={mouseEnterBlock}
                onMouseLeave={mouseLeaveBlock}
            >
                {!item.fileLink &&
                    <Typography>
                        {item.fileName}
                    </Typography>
                }
                {hovered &&
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            bgcolor: "primary.halfBlack",
                            borderRadius: 1.4,
                            position: "relative",
                            display: { xs: "none", md: 'flex' },
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <VisibilityIcon onClick={handleWatchClick} sx={{ color: "primary.white", fontSize: 40, cursor: "pointer" }} />
                        <Box sx={{position: "absolute", top:0, right: 0, p: 1}}>
                            <DeleteIcon onClick={handleDeleteOneClick} sx={{ color: "primary.white", cursor: "pointer" }} />
                        </Box>
                    </Box>
                }
                <Box
                    sx={{
                        display: { xs: "flex", md: "none" },
                        borderRadius: 1.4,
                        p: 1,
                        bgcolor: "primary.halfBlack",
                        justifyContent: "space-between"
                    }}
                >
                    <VisibilityIcon onClick={handleWatchClick} sx={{ color: "primary.white", cursor: "pointer" }} />
                    <DeleteIcon onClick={handleDeleteOneClick} sx={{ color: "primary.white", cursor: "pointer" }} />
                </Box>
            </Box>
        </Box>

    );
}));

export default QuestionaryImgItem;