import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useInstance } from "react-ioc";
import PhotoStore from "../../stores/photo.store";
import StoreAppointmentModal from "../../stores/store";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import ButtonMain from "../../../../../_components/UI/Buttons/ButtonMain";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeAutoObservable } from "mobx";

class FastWriteStore {
    currentPhotoIndex = 0

    get getCurrentPhotoIndex() {
        return this.currentPhotoIndex
    }

    setCurrentPhotoIndex(index) {
        this.currentPhotoIndex = index
    }

    incCurrentPhotoIndex() {
        this.setCurrentPhotoIndex(this.currentPhotoIndex + 1)
    }

    decrCurrentPhotoIndex() {
        const newIndex = this.currentPhotoIndex - 1
        this.setCurrentPhotoIndex(newIndex > 0 ? newIndex : 0)
    }

    constructor() {
        makeAutoObservable(this)
    }
}

const fastPhotosStore = new FastWriteStore()

const FastPhotoLoadAndWrite = observer(() => {
    const photoStore = useInstance(PhotoStore)
    const viewStore = useInstance(StoreAppointmentModal)

    const disableNextPhotoClick = () => {
        return photoStore.photosLoadedForComment?.length - 1 <= fastPhotosStore.getCurrentPhotoIndex
    }

    const handleGoPrevPhoto = () => {
        fastPhotosStore.decrCurrentPhotoIndex()
    }

    const handleGoNextPhoto = () => {
        fastPhotosStore.incCurrentPhotoIndex()
    }

    const handleFinish = () => {
        photoStore.addPhotosAfterFastCommentLoad()
        fastPhotosStore.setCurrentPhotoIndex(0)
    }

    const getWrites = () => {
        const checked = photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex]?.writes?.map((write) => {
            return write?.id
        }) || []
        const writes = photoStore?.photoWrites?.map((write) => {
            const types = write?.types?.map((type) => {
                if (checked.includes(type?.id)) {
                    return {
                        checked: true,
                        id: type?.id,
                        name: type?.name
                    }
                } else return {
                    checked: false,
                    id: type?.id,
                    name: type?.name
                }
            })
            return {
                groupName: write?.groupName,
                id: write?.id,
                types: types
            }
        })
        return writes
    }

    const handleCheckWriteSwitch = (write) => {
        photoStore.switchWriteCheckInFastLoadComment(fastPhotosStore.getCurrentPhotoIndex, write)
    }

    return (
        <>
            <Box sx={{ pb: 2 }}>
                {photoStore.incorrectPhotos.length > 0 &&
                    <>
                        <Box>
                            <Typography>Файлы не подходят по типу и не будут загружены:</Typography>
                            {photoStore.incorrectPhotos.map((item, index) => {
                                return (
                                    <Typography key={index} variant={'body2'}>
                                        Название файла: {item.name}
                                    </Typography>
                                )
                            })}
                            <Box sx={{ mb: 1 }}>подходящие файлы: <Typography sx={{ color: "primary.main" }}>jpg, jpeg, png</Typography></Box>
                        </Box>
                        <ButtonMain
                            onClick={() => photoStore.setResetIncorectPhotos()}
                            title="Понятно"
                        />
                    </>
                }
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <ButtonGroup>
                    <ButtonMain
                        icon={<ArrowBackIosIcon />}
                        onClick={handleGoPrevPhoto}
                        disabled={!fastPhotosStore.getCurrentPhotoIndex}
                    />
                    <ButtonMain
                        icon={<ArrowForwardIosIcon />}
                        onClick={handleGoNextPhoto}
                        disabled={disableNextPhotoClick()}
                    />
                </ButtonGroup>
                <Typography variant="h6">
                    № {fastPhotosStore.getCurrentPhotoIndex + 1} из {photoStore.photosLoadedForComment?.length || ""}
                </Typography>
                <ButtonMain
                    title={"Готово"}
                    onClick={handleFinish}
                />
            </Box>
            <Box sx={{ mt: 6, display: "flex", alignItems: "start", justifyContent: "space-between", gap: 2, flexDirection: {xs: "column", md: "row"} }}>
                <Paper sx={{ width: { xs: "100%", md: "30%", lg: "30%" }, position: "relative", overflow: "hidden" }}>
                    <Box
                        sx={{
                            aspectRatio: "1 / 1",
                            display: "flex",
                            justifyContent: "end",
                            borderRadius: 1,
                            position: "relative",
                            backgroundImage: `url(${photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex].url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            transform: `rotate(${-photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex].rotation}deg)`,
                        }}
                    />
                    {photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex]?.writes?.length > 0 &&
                        <Box sx={{ position: { xs: "absolute", md: "relative" }, bottom: 0, bgcolor: { xs: "primary.white", md: "transparent" }, width: "100%" }}>
                            <Box sx={{ p: 1, display: "flex", flexWrap: "wrap" }}>
                                {photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex].writes.map((write, index) => {
                                    const writesAmmount = photoStore.photosLoadedForComment[fastPhotosStore.getCurrentPhotoIndex].writes.length
                                    return (
                                        <Typography variant="body2" key={write.id + "" + index} sx={{ mr: 1, ":last-of-type": { ml: 0 } }}>
                                            {write.name}
                                            {index + 1 < writesAmmount ? "," : ""}
                                        </Typography>
                                    )
                                })}
                            </Box>
                        </Box>
                    }
                </Paper>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: {xs: "start", md: "end"} }}>
                    {getWrites()?.map((group) => {
                        return (
                            <Box key={group.id} sx={{ mb: 2, mt: 2, p: 1 }}>
                                <Typography variant={"h6"} sx={{ mb: 2, width: 280, borderBottom: "1px solid", borderBottomColor: "primary.light", pb: 1 }}>
                                    {group?.groupName}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap' }}>
                                    {group.types.map((type, typeIndex) => {
                                        return (
                                            <FormControlLabel
                                                sx={{ width: "100%", maxWidth: 200 }}
                                                key={type.id}
                                                control={<Checkbox
                                                    size="small"
                                                    sx={{ p: 0.8 }}
                                                    onClick={() => handleCheckWriteSwitch(type)}
                                                    checked={type?.checked}
                                                />}
                                                label={type?.name} />
                                        )
                                    })}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>


        </>
    );
});

export default FastPhotoLoadAndWrite;
