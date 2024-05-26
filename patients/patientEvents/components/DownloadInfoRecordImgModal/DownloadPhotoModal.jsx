import React, { useEffect, useState } from 'react';
import DialogModal from '../../../../../_components/UI/modals/DialogModal';
import { useInstance } from "react-ioc"
import { StoreDownLoadModal } from './store/download.photo.store';
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { FullPageFallbackProgress } from '../../../../../_components/UI/preloaders/FullPageFallbackProgress';
import { observer } from "mobx-react-lite";

const DownloadPhotoModal = observer(() => {

  const storeDownloadPhotoModal = useInstance(StoreDownLoadModal)
  const [photosSelected, setPhotosSelected] = useState(0)

  const [photosSelectedOne, setPhotosSelectedOne] = useState(true)

  const isPhotoChecked = []

  storeDownloadPhotoModal.photos?.forEach((el) => {

    if (el.checked === true) {
      isPhotoChecked.push({
        id: el.id,
        fileName: el.fileName,
      })
    }
  })

  useEffect(() => {

  }, [photosSelected, photosSelectedOne])

  const closeModal = (event, reason) => {
    storeDownloadPhotoModal.setCloseModal()
    storeDownloadPhotoModal.setPhotosClear()
    storeDownloadPhotoModal.setPhotosToDownloadToClear()
    storeDownloadPhotoModal.setPatientNameClear()
    storeDownloadPhotoModal.setCreatedArchiveClear()
  }
  if (storeDownloadPhotoModal.preloader === true) {
    return (
      <DialogModal
        title={'Скачать фото'}
        open={storeDownloadPhotoModal.modal}
        hideSave
        hideClose
        // onClose={(event, reason) => closeModal(event, reason)}
        // saveClick={() => {
        //   storeDownloadPhotoModal.setDownloadFiles()
        // }}
        saveTitle={"Загрузить"}
        maxWidth={'md'}
      >
        <FullPageFallbackProgress />
      </DialogModal>
    )
  }

  return (
    <DialogModal
      title={'Скачать фото'}
      open={storeDownloadPhotoModal.modal}
      onClose={(event, reason) => closeModal(event, reason)}
      saveClick={() => {
        storeDownloadPhotoModal.setDownloadFiles()
      }}
      saveTitle={"Загрузить"}
      maxWidth={'md'}
      disabledPhotoDownload={!isPhotoChecked.length}
      downloadPhotoMod
    >
      <Box sx={{ ml: 2, mt: 2 }}>
        <Button
          sx={{ mb: 2, textTransform: 'uppercase', mr: 2 }}
          variant="outlined"
          onClick={() => {
            storeDownloadPhotoModal.setAllImagesToSelect()
            setPhotosSelected(1)
          }}
        >
          <Typography
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Выделить все
          </Typography>
          <CheckBoxIcon />
        </Button>
        <Button
          sx={{ mb: 2, textTransform: 'uppercase' }}
          variant="outlined"
          onClick={
            () => {
              storeDownloadPhotoModal.setAllImagesToUnSelect()
              setPhotosSelected(2)
            }
          }
        >
          <Typography
            sx={{ display: { xs: "none", sm: "inline" } }}
          >
            Сбросить все
          </Typography>
          <CheckBoxOutlineBlankIcon />
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: { xs: "center", sm: "start" } }}>
        {storeDownloadPhotoModal.photos.length > 0 && storeDownloadPhotoModal.photos.map((photoFile, index) => {
          return (
            <Box
              sx={{
                width: { xs: "100%", md: 305 },
                height: 300,
                backgroundImage: `url(${photoFile.url && photoFile.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: "flex",
                justifyContent: "end",
                borderRadius: 1,
                filter: photoFile.styles.filter,
                border: photoFile.styles.border,
                borderColor: "primary.violetDeep2",
                transform: photoFile.styles.transform,
                transitionDuration: ".5s"
              }}
              key={photoFile.id}
              onClick={() => {
                storeDownloadPhotoModal.setStyledCheckedImage(index)
                setPhotosSelected(0)
                setPhotosSelectedOne(!photosSelectedOne)
              }}>
            </Box>
          )
        }
        ).sort((a, b) => {

          if (a.order > b.order) {
            return 1
          } if (a.order < b.order) {
            return - 1
          } else return 0
        })}
      </Box>

    </DialogModal>
  );
});

export default DownloadPhotoModal;