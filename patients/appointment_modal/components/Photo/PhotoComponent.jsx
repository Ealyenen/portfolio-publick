import React, { useEffect } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import ButtonGroup from "@mui/material/ButtonGroup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CachedIcon from "@mui/icons-material/Cached";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoBlock from './PhotosBlock'
import { useInstance } from "react-ioc";
import PhotoStore from "../../stores/photo.store";
import UploadIcon from "@mui/icons-material/Upload";
import { styled } from "@mui/material/styles";
import PhotoWrite from "./PhotoWrite";
import StoreAppointmentModal from "../../stores/store";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Tooltip from '@mui/material/Tooltip';
import FastPhotoLoadAndWrite from "./FastPhotoLoadAndWrite";

const InputHiden = styled('input')({
  display: 'none',
});

const PhotoComponent = observer(() => {
  const photoStore = useInstance(PhotoStore)
  const viewStore = useInstance(StoreAppointmentModal)
  useEffect(()=>{
    if (!photoStore?.photoWrites || photoStore?.photoWrites?.length===0){
      photoStore.setPhotoWrites()
    }
  },[])
  

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

  const getFileWithWrite = (event) => {
    viewStore.setActionWait(true)
    let photoArray = []
    for (let i = 0; i < event.target.files.length; i++) {
      if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(event.target.files[i].type)) {
        photoArray.push(event.target.files[i])
      } else {
        photoStore.setAddIncorrectPhoto(event.target.files[i])
      }
    }
    photoStore.setAddPhotosForFastWrite(photoArray)
  }

  const photoBlockDisplay = "block"

  const removeAllPhotos = () => {
    photoStore.setDeleteAllPhotos(true)
    viewStore.setDeletePhotoModalOpen(true)
  }

  const removeCheckedPhotos = () => {
    photoStore.setDeleteCheckedPhotos(true)
    viewStore.setDeletePhotoModalOpen(true)
  }

  return (
    <>
      <Box sx={{ display: photoBlockDisplay, }}>
        {photoStore.baseModeOn &&
          <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Box sx={{ display: "inline-block" }}>
                <label htmlFor="files-upload-modal">
                  <InputHiden accept="image/*,.png,.jpg" id="files-upload-modal" multiple type="file" onChange={getFile} />
                  <Tooltip title="Загрузить фото">
                    <Button size="small" variant="outlined" component="span" sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                      <UploadIcon />
                    </Button>
                  </Tooltip>
                </label>
                <label htmlFor="files-upload-with-text-modal">
                  <InputHiden accept="image/*,.png,.jpg" id="files-upload-with-text-modal" multiple type="file" onChange={getFileWithWrite} />
                  <Tooltip title="Загрузить фото и сразу подписать">
                    <Button size="small" variant="outlined" component="span" sx={{ borderRadius: 0, borderLeft: 0, "&:hover": { borderLeft: 0 } }}>
                      <UploadFileIcon />
                    </Button>
                  </Tooltip>
                </label>
                <Tooltip title="Удалить все фото">
                  <Button
                    size="small"
                    sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 0, ':hover': { borderLeft: 0 } }}
                    variant="outlined"
                    onClick={() => removeAllPhotos()}>
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </Box>
              <ButtonGroup variant="outlined" size="small">
                <Tooltip title="Выделить все фото">
                  <Button onClick={() => photoStore.checkAllPhotos()}>
                    <CheckCircleOutlineIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Убрать выделение со всех фото">
                  <Button onClick={() => photoStore.unCheckAllPhotos()}>
                    <CheckBoxOutlineBlankIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Поменять выделенные и не выделенные фото">
                  <Button onClick={() => photoStore.changeCheckPositionForAll()}>
                    <CachedIcon />
                  </Button>
                </Tooltip>
              </ButtonGroup>
              <ButtonGroup variant="outlined" size="small" disabled={photoStore.anyChecked ? false : true}>
                <Tooltip title="Подписать выделенные фото">
                  <span>
                    <Button onClick={() => {
                      photoStore.setPhotosForWrite()
                      photoStore.changePhotWriteModeOpene()
                    }}>
                      <FactCheckIcon />
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip title="Перевернуть выделенные фото">
                  <span>
                    <Button onClick={() => photoStore.setRotationForAll()}>
                      <RotateRightIcon />
                    </Button>
                  </span>
                </Tooltip>
                <Tooltip title="Удалить выделенные фото">
                  <span>
                    <Button onClick={() => removeCheckedPhotos()}>
                      <DeleteForeverIcon />
                    </Button>
                  </span>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <PhotoBlock />
          </>
        }
        {photoStore.fastLoadModeOn && <FastPhotoLoadAndWrite />}
        {photoStore.photWriteModeOpene && <PhotoWrite />}

      </Box>
    </>
  );
});

export default PhotoComponent;
