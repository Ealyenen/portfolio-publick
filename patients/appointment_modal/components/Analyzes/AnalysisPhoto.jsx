import React from "react";
import {
    Typography,
    Box,
    Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useInstance } from "react-ioc";
import UploadIcon from "@mui/icons-material/Upload";
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from "@mui/material/styles";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import StoreAppointmentAnalsies from "../../stores/analysis.store";
import StoreAppointmentModal from "../../stores/store";
import AnalizeImgElement from "./AnalizeImgElement";

const InputHiden = styled('input')({
    display: 'none',
});

const AnalysisPhoto = observer(() => {
    const storeAnalsies = useInstance(StoreAppointmentAnalsies)
    const viewStore = useInstance(StoreAppointmentModal)

    const getFile = (event) => {
        viewStore.setActionWait(true)
        let photoArray = []
        for (let i = 0; i < event.target.files.length; i++) {
            if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(event.target.files[i].type)) {
                photoArray.push(event.target.files[i])
            } else {
                storeAnalsies.setAddIncorrectPhoto(event.target.files[i])
            }
        }
        storeAnalsies.setAddPhotos(photoArray)

    }

    const preventDefaultBehaviour = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const dropUpload = (event) => {
        viewStore.setActionWait(true)
        preventDefaultBehaviour(event)
        storeAnalsies.setAddPhotos(event.dataTransfer.files)
    }

    const NoFilesBlock = () => {
        return (
            <label htmlFor="files-upload-addition-modal-test">
                <InputHiden accept="image/*,.png,.jpg" id="files-upload-addition-modal-test" multiple type="file" onChange={getFile} />
                <Box
                    onDrop={dropUpload}
                    onDragEnter={preventDefaultBehaviour}
                    onDragOver={preventDefaultBehaviour}
                    sx={{ p: 1, width: "100%", height: 100, bgcolor: "primary.light2", borderRadius: 2, border: "1px dashed", borderColor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography>Перетащите файлы в эту облать</Typography>
                </Box>
            </label>
        )
    }



    const handleDragStart = (event, photoFile) => {
        storeAnalsies.setDropingPhoto(photoFile)

    }
    const handleDragEnd = (event) => {
        storeAnalsies.setResetDroppingPhotoCard()
    }
    const handleDragOver = (event, photoFile) => {
        if (storeAnalsies.photos.length > 1) {
            event.preventDefault()
            storeAnalsies.setVoidPhoto(photoFile)
        }
    }
    const handleDrop = (event, photoFile) => {
        event.preventDefault()
        storeAnalsies.setDropCard(photoFile)

    }

    const handleOutDropEnd = (event) => {
        storeAnalsies.setResetDroppingPhotoCard()
    }


    return (
        <>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "inline-block" }}>
                    <label htmlFor="files-upload-addition-modal">
                        <InputHiden accept="image/*,.png,.jpg" id="files-upload-addition-modal" multiple type="file" onChange={getFile} />
                        <Button size="small" variant="outlined" component="span" sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                            <Typography variant={"button"}>
                                Загрузить
                            </Typography>
                            <UploadIcon />
                        </Button>
                    </label>
                    <Button size="small" sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0, ':hover': { borderLeft: 0 } }} variant="outlined" onClick={() => storeAnalsies.setResetPhotos()}>
                        <Typography variant={"button"}>
                            удалить
                        </Typography>
                        <DeleteIcon />
                    </Button>
                </Box>
                <Box sx={{ pb: 2 }}>
                    {storeAnalsies.incorrectPhotos.length > 0 &&
                        <>
                            <Box>
                                <Typography>Файлы не подходят по типу и не будут загружены:</Typography>
                                {storeAnalsies.incorrectPhotos.map((item, index) => {
                                    return (
                                        <Typography key={index} variant={'body2'}>
                                            Название файла: {item.name}
                                        </Typography>
                                    )
                                })}
                                <Box sx={{ mb: 1 }}>подходящие файлы: <Typography sx={{ color: "primary.main" }}>jpg, jpeg, png</Typography></Box>
                            </Box>
                            <Button variant="outlined" onClick={() => storeAnalsies.setResetIncorectPhotos()}>
                                <Typography>Понятно</Typography>
                            </Button>
                        </>
                    }
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    {storeAnalsies.photos.length === 0 && NoFilesBlock()}
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "start" }}>
                    {storeAnalsies.photos.length > 0 && storeAnalsies.photos.map((photoFile, index) => {
                        return (
                            photoFile?.superpose ?
                                <Box
                                    sx={{
                                        width: { xs: "100%", md: 185 },
                                        height: 180,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 2,
                                        border: "2px dashed",
                                        borderColor: "primary.main",
                                        bgcolor: "primary.light2"
                                    }}
                                    key={index}
                                    draggable={true}
                                    onDragEnd={(event) => handleOutDropEnd(event)}
                                    onDragOver={(event) => handleDragOver(event, photoFile)}
                                    onDrop={(event) => handleDrop(event, photoFile)}
                                ><Typography>Перетащить сюда</Typography></Box>
                                :
                                <Box
                                    sx={{
                                        width: { xs: 300, sm: 210, md: 200 },
                                        aspectRatio: "1 / 1",
                                        display: "flex",
                                        justifyContent: "end",
                                        borderRadius: 1,
                                        cursor: "grab",
                                        position: "relative",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                    }}
                                    draggable={true}
                                    onDragStart={(event) => handleDragStart(event, photoFile)}
                                    onDragLeave={(event) => handleDragEnd(event)}
                                    onDragEnd={(event) => handleDragEnd(event)}
                                    onDragOver={(event) => handleDragOver(event, photoFile)}
                                    onDrop={(event) => handleDrop(event, photoFile)}
                                    key={index}>
                                    {photoFile?.existed ?
                                        <AnalizeImgElement rotation={-photoFile.rotation} imgSrc={photoFile?.url} fullImgSrc={photoFile?.existedOriginalUrl} />
                                        :
                                        <Box sx={{
                                            width: "100%",
                                            height: "100%",
                                            position: "absolute",
                                            borderRadius: 1,
                                            backgroundImage: `url(${photoFile.url && photoFile.url})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center center",
                                            transform: `rotate(${-photoFile.rotation}deg)`,
                                        }} />
                                    }
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "start", zIndex: 10 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", width: { xs: "100%", md: "100%" } }}>
                                            <Box sx={{ display: { xs: "block", md: "none" } }}>
                                                <Box sx={{ bgcolor: "primary.halfBlack", borderRadius: 1, display: "flex", flexDirection: "column" }}>
                                                    <IconButton onClick={() => storeAnalsies.setReplacePhotoTop(index)} sx={{ color: "primary.main" }}>
                                                        <ExpandLessIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => storeAnalsies.setReplacePhotoDown(index)} size="small" sx={{ color: "primary.main" }}>
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "100%", justifyContent: { xs: "end", sm: "space-between" }, flexDirection: { xs: "column-reverse", md: "row" }, alignItems: { xs: "flex-end", md: "start" }, }}>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <IconButton onClick={() => storeAnalsies.setResetPhotosByIndex(index)} size="small" sx={{ color: "primary.main", ":hover": { bgcolor: "primary.light2" } }}>
                                                        <ClearIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => storeAnalsies.setRotationForOne(index)} size="small" sx={{ color: "primary.main", ":hover": { bgcolor: "primary.light2" } }}>
                                                        <RotateRightIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                        {!photoFile.url && <Typography>{photoFile.photo?.name ? photoFile.photo?.name : photoFile?.fileName}</Typography>}

                                    </Box>
                                </Box>
                        )
                    }
                    )}
                </Box>
            </Box>
        </>
    );
});

export default AnalysisPhoto;