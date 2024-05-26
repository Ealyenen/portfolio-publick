import React from 'react';
import { Grid, ImageList } from "@mui/material"
import AccordionCastom from '../../../../../../../_components/UI/accordions/AccordionCastom';
import AddIcon from "@mui/icons-material/Add"
import Box from "@mui/material/Box"
import ImageListItem from "@mui/material/ImageListItem"
import { useInstance } from "react-ioc"
import StoreGalleryModal from '../../../GalleryModal/store/galleryModal.store';
import AdditionStore from '../../../../../AdditionalModal/store/additionalModal.store';
import { StoreDownLoadModal } from '../../../DownloadInfoRecordImgModal/store/download.photo.store';
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DownloadIcon from '@mui/icons-material/Download';
import htmlToBlock from '../../../../../../../_common/helpers/htmlToBlock';
import InfoIcon from '@mui/icons-material/Info';
import InfoRecordImg from './InfoRecordImg';

const InfoRecord = ({ infoRecord }) => {
    const additionStore = useInstance(AdditionStore)
    const storeImageModal = useInstance(StoreGalleryModal)
    const storeDownloadPhotoModal = useInstance(StoreDownLoadModal)

    const getSortedImages = () => {
        const images = infoRecord?.images?.sort((a,b) => {
            if (a?.order > b?.order) return 1
            else if (a?.order < b?.order) return -1
            else return 0
        })
        return images || null
    }

    const imageClick = (index) => {
        const images = getSortedImages()?.filter((e)=>e?.image1600Link).map((item) => {
            return {
                id: item?.id,
                imageLink: item?.image1600Link,
                miniLink: item?.image300Link
            }
        })
        storeImageModal.setOpenModal(images, index)
    }

    const handleEditClick = (event) => {
        event.stopPropagation()
        additionStore.setOpenRedactionAddition(infoRecord?.id)
    }

    return (
        <Grid item xs={12} lg={7}>
            <AccordionCastom
                panelName={`record${infoRecord?.id}`}
                title={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <InfoIcon />
                        <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                            Информационный блок
                        </Typography>
                    </Box>
                }
                expandIcon={<AddIcon />}
                detailsSX={{ p: 2, bgcolor: 'primary.light3' }}
                titleWithEditButton
                RedButtonClick={handleEditClick}
            >
                {infoRecord?.text &&
                    <Box sx={{
                        p: 1,
                        pl: 4,
                        bgcolor: "primary.white",
                        border: "1px solid",
                        borderColor: "primary.light4",
                        borderRadius: 1,
                        wordWrap: "break-word"
                    }}>
                        {htmlToBlock(infoRecord?.text)}
                    </Box>
                }

                {infoRecord?.images?.length > 0 && <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    onClick={() => {
                        storeDownloadPhotoModal.setOpenDownLoadAddition(infoRecord?.id)
                    }}>
                    <Typography sx={{ display: { xs: "none", sm: "inline" }, mr: 1 }}>
                        Скачать фото
                    </Typography>
                    <DownloadIcon />
                </Button>}
                <Box
                    sx={{
                        width: '100%',
                        mt: 2,
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: {xs: "center", sm: "start"}
                    }}
                >
                    {getSortedImages()?.map((image, index) => {
                        return (
                            <Box 
                            key={image?.id} 
                            onClick={() => imageClick(index)} 
                            sx={{
                                width: {xs: "90%", sm: "24%"},
                                maxWidth: "300px",
                                aspectRatio: "1 / 1",
                            }}
                            >
                                <InfoRecordImg
                                    imgSrc={image?.image300Link}
                                    fullImgSrc={image?.imageLink}
                                />
                            </Box>
                        )
                    })}
                </Box>
            </AccordionCastom>
        </Grid>
    );
};

export default InfoRecord;