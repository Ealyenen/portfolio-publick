import React from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";
import PhotoStore from "../../stores/photo.store";
import { useInstance } from "react-ioc";
import FormControlLabel from '@mui/material/FormControlLabel';

const PhotoWrite = observer(() => {
    const photoStore = useInstance(PhotoStore)

    const finishWriting = () => {
        photoStore.changePhotWriteModeOpene()
        photoStore.resetPhotoWritesChecked()
    }

    photoStore.setCheckedPhotos()

    return (
        <>
            <Button onClick={() => finishWriting()} variant={"outlined"} size="small">
                <Typography variant={"button"}>
                    Завершить
                </Typography>
            </Button>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                {photoStore.photosForWrite.map((photoFile, index) => {
                    return (
                        <Paper key={index} sx={{ width: { xs: 200, sm: 150 } }}>
                            <Box
                                sx={{
                                    width: { xs: 200, sm: 150 },
                                    height: { xs: 200, sm: 150 },
                                    display: "flex",
                                    justifyContent: "end",
                                    borderRadius: 1,
                                    position: "relative",
                                    backgroundImage: `url(${photoFile.url && photoFile.url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center center",
                                    transform: `rotate(${-photoFile.rotation}deg)`,
                                }}
                            />

                            <Box sx={{ p: 1, display: "flex", flexWrap: "wrap" }}>
                                {photoFile.writes.map((write, index) => {
                                    const writesAmmount = photoFile.writes.length
                                    return (
                                        <Typography variant="body2" key={write.id + "" + index} sx={{ mr: 1, ":last-of-type": { ml: 0 } }}>
                                            {write.name}
                                            {index + 1 < writesAmmount ? "," : ""}
                                        </Typography>
                                    )
                                })}
                            </Box>
                        </Paper>
                    )
                })
                }

            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {photoStore?.photoWrites.map((group, groupIndex) => {
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
                                                onClick={() => photoStore.setChecked(groupIndex, typeIndex)}
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
        </>
    );
});

export default PhotoWrite;