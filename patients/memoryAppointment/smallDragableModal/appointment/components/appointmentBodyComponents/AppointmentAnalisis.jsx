import React from 'react';
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import htmlToBlock from '../../../../../../../_common/helpers/htmlToBlock';
import moment from "moment"
import { parseAnalisisNamesAndDates } from '../../../../../../../_common/helpers/analisisParse';
import StoreGalleryModal from '../../../../GalleryModal/store/galleryModal.store';
import { useInstance } from "react-ioc";
import AnalisisImgElement from './AppointmentAnalisisImg';


const Analisis = observer(({
    title = "",
    text = "",
    shortData = false,
    images = [],
    datesJson = "",
    dateOfAnalize = ""
}) => {
    const storeGalleryModal = useInstance(StoreGalleryModal)

    //below is text converting functions for short text
    function convertNodeToText(node) {
        let text = '';

        if (node.nodeType === Node.TEXT_NODE) {
            text = node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const child of node.childNodes) {
                text += convertNodeToText(child);
            }

            if (node.nodeName === 'P' || node.nodeName === 'DIV' || node.nodeName === 'BR') {
                text += '\n'; // br for block elements
            } else if (node.nodeName === 'LI') {
                text = ' ' + text + '\n'; // list format markers
            }
        }

        return text;
    }


    function extractAndTrimText(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        let textContent = convertNodeToText(doc.body);

        // delete extra simbols and tabs
        textContent = textContent.replace(/\s+/g, ' ').trim();

        return textContent.length > 100 ? textContent.substring(0, 100) : textContent;
    }

    const getSortedImages = () => {
        const imagesArr = images?.sort((a,b) => {
            if (a?.order > b?.order) return 1
            else if (a?.order < b?.order) return -1
            else return 0
        })
        return imagesArr || null
    }

    const watchGallery = (index) => {
        const imgList = getSortedImages().map((item) => {
            return {
                id: item?.id,
                imageLink: item?.image1600Link,
                miniLink: item?.image300Link,
            }
        })
        storeGalleryModal.setOpenModal(imgList, index)
    }

    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "primary.light2",
                p: 2,
                ml: 1,
                mr: 1
            }}
        >
            <Typography sx={{ display: "block" }} variant="subtitle1">
                {title && title}
            </Typography>
            <Typography sx={{ display: "block", mb: 1, mt: 1 }}>
                Дата проведения:{" "}{moment(dateOfAnalize).format("DD.MM.YYYY") || "отсутствует"}
            </Typography>
            {parseAnalisisNamesAndDates(datesJson)?.map((dateAndName, index) => {
                return (
                    <Box key={index}>
                        <Typography sx={{ display: "inline" }}>
                            {moment(dateAndName?.date).format("DD.MM.YYYY")}:{" "}
                        </Typography>
                        <Typography sx={{ display: "inline" }}>
                            {dateAndName?.name}
                        </Typography>
                    </Box>

                )
            })}
            <Box
                sx={{
                    p: 1,
                    pl: 3,
                    bgcolor: "primary.white",
                    border: "1px solid",
                    borderColor: "primary.light4",
                    borderRadius: 1,
                    wordWrap: "break-word",
                    mt: 2
                }}
            >{shortData ?
                text && extractAndTrimText(text)
                :
                text && htmlToBlock(text)
                }
            </Box>
            {!shortData && images?.length > 0 &&
                <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    {getSortedImages()?.map((image, index) => {
                        return (
                            <Box
                                key={image?.id}
                                sx={{
                                    width: { xs: "100%", sm: "32%", md: "24%" },
                                    maxWidth: { xs: "300px", sm: "180px" },
                                    aspectRatio: "1 / 1",
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "primary.light2"
                                }}
                                onClick={() => watchGallery(index)}
                            >
                                <AnalisisImgElement imgSrc={image?.image300Link} fullImgSrc={image?.imageLink} />
                            </Box>
                        )
                    })}
                </Box>
            }
        </Box>
    );
});

export default Analisis;