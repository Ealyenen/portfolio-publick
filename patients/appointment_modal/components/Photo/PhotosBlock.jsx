import React, { useEffect, useState } from "react";
import { Box, Button, Typography, } from "@mui/material";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import PhotoStore from "../../stores/photo.store";
import { useInstance } from "react-ioc";
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from "@mui/material/styles";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RotateRightIcon from "@mui/icons-material/RotateRight";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StoreAppointmentModal from "../../stores/store";
import DataStoreAppointmentModal from "../../stores/data.store";
import { theme } from "../../../../../_common/theme/theme";
import PhotoElement from "./PhotoElement";

const InputHiden = styled('input')({
  display: 'none',
});

const PhotoBlock = observer(() => {
  const photoStore = useInstance(PhotoStore)
  const viewStore = useInstance(StoreAppointmentModal)
  const [hoverImgIndex, setHoverImgIndex] = useState(null)

  const originalExtension = (src) => {
    if (src) {
      const filename = src.substring(src.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop();
      return extension;
    } else {
      return null;
    }
  }

  const getFile = (event) => {
    viewStore.setActionWait(true)
    let photoArray = []
    for (let i = 0; i < event.target.files.length; i++) {
      if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(event.target.files[i].type)) {
        photoArray.push(event.target.files[i])
      } else {
        photoStore.setAddIncorrectPhoto(event.target.files[i])
      }
    }
    photoStore.setAddPhotos(photoArray)
  }

  const preventDefaultBehaviour = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const dropUpload = (event) => {
    viewStore.setActionWait(true)
    preventDefaultBehaviour(event)
    photoStore.setAddPhotos(event.dataTransfer.files)
  }

  const NoFilesBlock = () => {
    return (
      <label htmlFor="files-upload-addition-modal-test">
        <InputHiden accept="image/*,.png,.jpg" id="files-upload-addition-modal-test" multiple type="file"
          onChange={getFile} />
        <Box
          onDrop={dropUpload}
          onDragEnter={preventDefaultBehaviour}
          onDragOver={preventDefaultBehaviour}
          sx={{
            p: 1,
            width: "100%",
            height: 100,
            bgcolor: "primary.light2",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Typography>Перетащите файлы в эту облать</Typography>
        </Box>
      </label>
    )
  }


  const handleDragStart = (event, photoFile) => {
    photoStore.setDropingPhoto(photoFile)

  }
  const handleDragEnd = (event) => {
    photoStore.setResetDroppingPhotoCard()
  }
  const handleDragOver = (event, photoFile) => {
    if (photoStore.photos.length > 1) {
      event.preventDefault()
      photoStore.setVoidPhoto(photoFile)
    }
  }
  const handleDrop = (event, photoFile) => {
    event.preventDefault()
    photoStore.setDropCard(photoFile)

  }

  const handleOutDropEnd = (event) => {
    photoStore.setResetDroppingPhotoCard()
  }

  const getWrite = (writes) => {
    let fullWrite = ""
    const writesLength = writes.length
    writes.forEach((write, index) => {
      fullWrite += write.name + (index + 1 < writesLength ? ", " : "")
    })
    return fullWrite
  }

  const genShortWrite = (writes) => {
    let shortWrite = ""
    let fullWrite = ""
    const writesLength = writes.length
    if (writesLength > 0) {
      writes.forEach((write, index) => {
        fullWrite += write.name + (index + 1 < writesLength ? ", " : "")
      })
      shortWrite = fullWrite.length <= 85 ? fullWrite : fullWrite.slice(0, 85) + "..."
      return shortWrite
    } else return ""
  }


  const handleRemovePhoto = (index) => {
    viewStore.setDeletePhotoModalOpen(true)
    photoStore.setDeleteOnePhoto(index)
  }

  const setEnterImg = (index) => {
    setHoverImgIndex(index)
  }
  const setLeaveImg = () => {
    setHoverImgIndex(null)
  }

  return (
    <>
      <Box>
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
              <Button variant="outlined" onClick={() => photoStore.setResetIncorectPhotos()}>
                <Typography>Понятно</Typography>
              </Button>
            </>
          }
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {photoStore.photos.length === 0 && NoFilesBlock()}
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: { xs: "center", sm: "start" } }}>
          {photoStore.photos.length > 0 && photoStore.photos.map((photoFile, index) => {
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
                    // cursor: "grab",
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
                    border: "1px solid",
                    borderColor: "primary.light2"
                  }}
                  draggable={true}
                  onDragStart={(event) => handleDragStart(event, photoFile)}
                  onDragLeave={(event) => handleDragEnd(event)}
                  onDragEnd={(event) => handleDragEnd(event)}
                  onDragOver={(event) => handleDragOver(event, photoFile)}
                  onDrop={(event) => handleDrop(event, photoFile)}
                  onMouseEnter={() => setEnterImg(index)}
                  onMouseLeave={setLeaveImg}
                  key={index}>
                  {photoFile?.existed ?
                    <PhotoElement rotation={-photoFile?.rotation} imgSrc={photoFile?.url} fullImgSrc={photoFile?.existedOriginalUrl} />
                    :
                    <Box sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: 1,
                      backgroundImage: `url(${photoFile?.url && photoFile?.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      transform: `rotate(${-photoFile?.rotation}deg)`,
                    }} />
                  }
                  <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "start",
                    zIndex: 10
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: { xs: "100%", md: "100%" } }}>
                      <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <Box sx={{
                          bgcolor: "primary.halfBlack",
                          borderRadius: 1,
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          <IconButton onClick={() => photoStore.setReplacePhotoTop(index)} sx={{ color: "primary.light3" }}>
                            <ExpandLessIcon />
                          </IconButton>
                          <IconButton onClick={() => photoStore.setReplacePhotoDown(index)} size="small"
                            sx={{ color: "primary.light3" }}>
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: { xs: "end", md: hoverImgIndex === index ? "space-between" : "end" },
                        flexDirection: { xs: "column-reverse", md: "row" },
                        alignItems: { xs: "flex-end", md: "start" },
                      }}>
                        <Box sx={{
                          display: { xs: "flex", md: hoverImgIndex === index ? "flex" : "none" },
                          flexDirection: "column",
                          bgcolor: "primary.halfBlack",
                          borderRadius: 1,
                          borderTopLeftRadius: { xs: 0, md: 10 },
                          borderTopRightRadius: { xs: 0, md: 10 },
                          p: 0.5
                        }}>
                          <IconButton onClick={() => handleRemovePhoto(index)} size="small"
                            sx={{ color: "primary.light3", ":hover": { bgcolor: "primary.light3", color: "primary.main" } }}>
                            <ClearIcon />
                          </IconButton>
                          <IconButton onClick={() => { photoStore.setRotationForOne(index) }} size="small"
                            sx={{ color: "primary.light3", ":hover": { bgcolor: "primary.light3", color: "primary.main" } }}>
                            <RotateRightIcon />
                          </IconButton>
                          <IconButton onClick={() => {
                            photoStore.setOneForWrite(index)
                            photoStore.changePhotWriteModeOpene()
                          }}
                            size="small" sx={{ color: "primary.light3", ":hover": { bgcolor: "primary.light3", color: "primary.main" } }}>
                            <FactCheckIcon />
                          </IconButton>
                        </Box>
                        <Box sx={{
                          bgcolor: "primary.halfBlack",
                          borderRadius: 1,
                          borderBottomLeftRadius: { xs: 0, md: 10 },
                          borderBottomRightRadius: { xs: 0, md: 10 },
                          p: 0.5
                        }}>
                          <Checkbox
                            sx={{
                              p: 0.64,
                              color: "primary.light3",
                              '&.Mui-checked': {
                                color: "primary.light3",
                              }
                            }}
                            checked={photoFile.checked}
                            onChange={() => photoStore.setCheckedPhoto(index)}
                          />
                        </Box>
                      </Box>
                    </Box>
                    {!photoFile.url &&
                      <Typography>{photoFile.photo?.name ? photoFile.photo?.name : photoFile?.fileName}</Typography>}
                    {photoFile.writes.length > 0 &&
                      <Box sx={{
                        width: "100%",
                        bgcolor: "primary.halfBlack",
                        color: "primary.light2",
                        borderRadius: 1,
                        p: 0.5,
                        pr: { xs: 0.5, md: hoverImgIndex === index && 2 },
                        overflow: "hidden",
                        lineHeight: 0.2,
                        overflowY: hoverImgIndex === index && "scroll",
                        textAlign: { xs: "auto", md: hoverImgIndex === index && "justify" }
                      }}>
                        <Typography sx={{
                          display: { xs: "none", md: "inline" },
                          // whiteSpace: "nowrap",
                          width: "96%",
                          overflow: "hidden",
                          fontSize: 12,
                          wordBreak: "break-all",
                        }}>
                          {hoverImgIndex === index ? getWrite(photoFile.writes) : genShortWrite(photoFile.writes)}
                        </Typography>
                        <Typography sx={{
                          display: { xs: "inline", md: "none" },
                          // whiteSpace: "nowrap",
                          width: "96%",
                          overflow: "hidden",
                          fontSize: 12
                        }}>
                          {getWrite(photoFile.writes)}
                        </Typography>
                      </Box>
                    }

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

export default PhotoBlock;