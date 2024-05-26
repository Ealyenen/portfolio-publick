import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import AdditionStore from './store/additionalModal.store';
import RichTextEditor from '../../../_components/UI/rich-text/rich.text-editor';
import { styled } from "@mui/material/styles";
import UploadIcon from "@mui/icons-material/Upload";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { FullPageFallbackProgress } from "../../../_components/UI/preloaders/FullPageFallbackProgress";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BaseModal from '../../../_components/UI/modals/BaseModal';
import ButtonMain from '../../../_components/UI/Buttons/ButtonMain';
import PatientStore from '../store/patient.store';
import PatientEventsStore from '../store/patinetEvents.store';
import ImageItem from './ImageItem';

const InputHiden = styled('input')({
  display: 'none',
});

const AdditionModal = observer(() => {
  const store = useInstance(AdditionStore)
  const patientStore = useInstance(PatientStore)
  const patientEventsStore = useInstance(PatientEventsStore)
  store.setPatientId(patientStore?.getPatientId())

  const getFile = (event) => {
    let photoArray = []
    for (let i = 0; i < event.target.files.length; i++) {
      if (['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(event.target.files[i].type)) {
        photoArray.push(event.target.files[i])
      } else {
        store.setAddIncorrectPhoto(event.target.files[i])
      }
    }
    store.setAddPhotos(photoArray)

  }

  const preventDefaultBehaviour = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  const dropUpload = (event) => {
    preventDefaultBehaviour(event)
    store.setAddPhotos(event.dataTransfer.files)
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

  const handleSave = () => {
    if (store.text || store.photos.length > 0) {
      store.setSave().then((infoBlockId) => {
        if (infoBlockId) {
          patientEventsStore.updatePaginationByInfoBlock(infoBlockId)
        }
        store.setResetStore()
        store.setOpenModal(false)
      })
    } else alert("Заполните данные")
  }

  const handleSaveOnOut = (event, reason) => {
    if (reason && reason === "backdropClick") {
      handleSave()
    } else {
      store.setOpenModal(false)
    }
  }

  if (store.preloader === true) {
    return (
      <BaseModal title={'Дополнительно'}
        open={store.openModal}
        hideSave
        hideClose
        maxWidth={'md'}
      >
        <FullPageFallbackProgress />
      </BaseModal>

    )
  }

  const handleDragStart = (event, photoFile) => {
    store.setDropingPhoto(photoFile)
  }
  const handleDragEnd = (event) => {
    store.setResetDroppingPhotoCard()
  }
  const handleDragOver = (event, photoFile) => {
    if (store.photos.length > 1) {
      event.preventDefault()
      store.setVoidPhoto(photoFile)
    }
  }
  const handleDrop = (event, photoFile) => {
    event.preventDefault()
    store.setDropCard(photoFile)

  }

  const handleOutDropEnd = (event) => {
    store.setResetDroppingPhotoCard()
  }

  const handleOpenDeleteDialog = () => {
    store.setOpenedDeleteDialog()
  }

  return (
    <BaseModal
      castomTitle={
        <Box sx={{
          borderBottom: "1px solid",
          borderColor: "primary.light",
          pb: 1,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Typography variant="h6">
            Информационный блок
          </Typography>
          <ButtonMain
            onClick={handleOpenDeleteDialog}
            title="Удалить"
          />
        </Box>
      }
      open={store.openModal}
      onClose={(event, reason) => handleSaveOnOut(event, reason)}
      saveClick={handleSave}
      maxWidth={'md'}
    >
      <Box>
        <RichTextEditor initialValue={store.text} getValue={(value) => store.setText(value)} />
        <Box>
          <Box sx={{ pt: 1, pb: 1, display: "flex", gap: 1, position: "sticky", top: -1, bgcolor: "white", zIndex: 2 }}>
            <label htmlFor="files-upload-addition-modal">
              <InputHiden accept="image/*,.png,.jpg" id="files-upload-addition-modal" multiple type="file"
                onChange={getFile} />
              <Button variant="outlined" component="span">
                <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                  Загрузить
                </Typography>
                <UploadIcon />
              </Button>
            </label>
            <Button variant="outlined" onClick={() => store.setResetPhotos()}>
              <Typography sx={{ display: { xs: "none", sm: "inline" } }}>
                Очистить
              </Typography>
              <DeleteIcon />
            </Button>
          </Box>
          <Box sx={{ pb: 2 }}>
            {store.incorrectPhotos.length > 0 &&
              <>
                <Box>
                  <Typography>Файлы не подходят по типу и не будут загружены:</Typography>
                  {store.incorrectPhotos.map((item, index) => {
                    return (
                      <Typography key={index} variant={'body2'}>
                        Название файла: {item.name}
                      </Typography>
                    )
                  })}
                  <Box sx={{ mb: 1 }}>подходящие файлы: <Typography sx={{ color: "primary.main" }}>jpg, jpeg,
                    png</Typography></Box>
                </Box>
                <Button variant="outlined" onClick={() => store.setResetIncorectPhotos()}>
                  <Typography>Понятно</Typography>
                </Button>
              </>
            }
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {store.photos.length === 0 && NoFilesBlock()}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: { xs: "center", md: "start" } }}>
            {store.photos.length > 0 && store.photos.map((photoFile, index) => {
              return (
                photoFile?.superpose ?
                  <Box
                    sx={{
                      width: { xs: "100%", md: "23%" },
                      maxWidth: "300px",
                      aspectRatio: "1 / 1",
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
                      width: { xs: "100%", md: "23%" },
                      maxWidth: "300px",
                      aspectRatio: "1 / 1",
                      display: "flex",
                      justifyContent: "end",
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "grab",
                      position: "relative"
                    }}
                    draggable={true}
                    onDragStart={(event) => handleDragStart(event, photoFile)}
                    onDragLeave={(event) => handleDragEnd(event)}
                    onDragEnd={(event) => handleDragEnd(event)}
                    onDragOver={(event) => handleDragOver(event, photoFile)}
                    onDrop={(event) => handleDrop(event, photoFile)}
                    key={index}>
                    {photoFile?.existed ?
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "absolute"
                        }}
                      >
                        <ImageItem imgSrc={photoFile?.url} fullImgSrc={photoFile?.existedUrl} />
                      </Box>
                      :
                      <Box
                        sx={{
                          backgroundImage: `url(${photoFile.url && photoFile.url})`,
                          width: "100%",
                          height: "100%",
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                          position: "absolute",
                          cursor: "pointer",
                          "&:hover": {
                            opacity: 0.8
                          },
                        }}
                      />
                    }
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: { xs: "100%", md: "auto" } }}>
                      <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <Box sx={{
                          bgcolor: "primary.halfBlack",
                          borderRadius: 1,
                          display: "flex",
                          flexDirection: "column"
                        }}>
                          <IconButton onClick={() => store.setReplacePhotoTop(index)} sx={{ color: "primary.main" }}>
                            <ExpandLessIcon />
                          </IconButton>
                          <IconButton onClick={() => store.setReplacePhotoDown(index)} size="small"
                            sx={{ color: "primary.main" }}>
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box>
                        <IconButton onClick={() => store.setResetPhotosByIndex(index)} size="small"
                          sx={{ color: "primary.main", ":hover": { bgcolor: "primary.light2" } }}>
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    {!photoFile.url &&
                      <Typography>{photoFile.photo?.name ? photoFile.photo?.name : photoFile?.fileName}</Typography>}
                  </Box>
              )
            }
            )}
          </Box>
        </Box>
      </Box>
    </BaseModal>
  );
});

export default AdditionModal;