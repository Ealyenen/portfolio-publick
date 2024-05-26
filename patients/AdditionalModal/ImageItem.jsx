import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Tooltip } from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const ImageItem = ({ imgSrc, fullImgSrc }) => {
    const [imageLoaded, setImageLoaded] = useState(true)
    const [triesQty, setTriesQty] = useState(0)
    const maxTries = 10
    const interval = 5000

    useEffect(() => {
        if (!imageLoaded && triesQty <= maxTries) {
            const timer = setTimeout(() => {
                if (!imageLoaded) {
                    setImageLoaded(true)
                    setTriesQty(prev => prev + 1)
                }
            }, interval);
            return () => clearTimeout(timer)
        }
    }, [imageLoaded])

    const originalExtension = () => {
        if (fullImgSrc) {
            const filename = fullImgSrc.substring(fullImgSrc.lastIndexOf('/') + 1);
            const extension = filename.split('.').pop();
            return extension;
        } else {
            return null;
        }
    }

    const generateTitleName = () => {
        if (!imgSrc && originalExtension() !== "pdf") {
            return "нет миниатюры"
        }
        if (imgSrc && !imageLoaded) {
            return "конвертируется"
        }
        if (originalExtension() === "pdf") {
            return "документ пдф"
        }
    }

    const handleOnLoad = () => {
        setImageLoaded(true)
    }

    const handleError = () => {
        setImageLoaded(false)
    }

    const handleOpenFullImg = (e) => {
        e.stopPropagation()
        window.open(fullImgSrc)
    }

    return (
        <>
            {(imageLoaded && imgSrc && originalExtension() !== "pdf") ?
                <Box
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            opacity: 0.8
                        },
                        borderRadius: 1,
                        overflow: "hidden",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <picture>
                        <source srcSet={imgSrc} media="(orientation: portrait)" />
                        <img
                            style={{ objectFit: "cover", maxWidth: "100%", height: "100%" }}
                            src={imgSrc}
                            alt="no img"
                            onLoad={() => handleOnLoad()}
                            onError={handleError}
                        />
                    </picture>
                </Box>

                :
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        gap: {xs: 0, lg: 1},
                        overflow: "hidden",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Typography variant='caption'>
                        {generateTitleName()}
                    </Typography>
                    <Tooltip title={generateTitleName()}>
                        <Button size="small" onClick={handleOpenFullImg}>
                            <Typography variant='caption' sx={{display: {xs: "none", sm: "inline", md: "none", lg: "inline"}, mr: 1}}>
                                оригинал
                            </Typography>
                            <RemoveRedEyeIcon fontSize='small'/>
                        </Button>
                    </Tooltip>
                </Box>
            }
        </>

    );
};

export default ImageItem;
