import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import AppointmentStore from '../../store/appointment.store';
import StoreGalleryModal from '../../../../GalleryModal/store/galleryModal.store';
import ImgElement from './ImgElement';

const ImgBlock = observer(() => {
    const store = useInstance(AppointmentStore)
    const storeGalleryModal = useInstance(StoreGalleryModal)

    const getWrite = (writes) => {
        let fullWrite = ""
        const writesLength = writes?.length
        writes.forEach((write, index) => {
            fullWrite += write?.name + (index + 1 < writesLength ? ", " : "")
        })
        return fullWrite
    }

    const watchGallery = (index) => {
        const photos = store.sortedPhotos?.map((photo) => {
            return {
                id: photo?.id,
                imageLink: photo?.image1600Link,
                miniLink: photo?.image300Link,
                title: getWrite(photo?.photoType)
            }
        })
        storeGalleryModal.setOpenModal(photos, index)
    }

    return (
        <Box>
            {store.sortedPhotos?.length > 0 &&
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {store.sortedPhotos?.map((img, index) => (
                        <Box
                            key={img?.id}
                            sx={{
                                width: { xs: "48%", sm: "32%", md: "30%" },
                                aspectRatio: "1 / 1",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: 1,
                                border: "1px solid",
                                borderColor: "primary.light2"
                            }}
                        >
                            {getWrite(img?.photoType)?.length > 0 &&
                                <Box
                                    sx={{
                                        p: 0.5,
                                        bgcolor: "primary.halfBlack",
                                        color: "primary.white",
                                        position: "absolute",
                                        width: "100%",
                                        top: 0,
                                        zIndex: 1,
                                        "&:hover": {
                                            maxHeight: { xs: 25, lg: "100%" }
                                        },
                                        overflow: "hidden",
                                        maxHeight: { xs: 25, lg: 50 },
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ wordWrap: "break-word" }}
                                        component="span"
                                    >
                                        {getWrite(img?.photoType)}
                                    </Typography>
                                </Box>
                            }
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                onClick={() => watchGallery(index)}
                            >
                                <ImgElement imgSrc={img?.image300Link} fullImgSrc={img?.imageLink} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            }
        </Box>
    );
});

export default ImgBlock;