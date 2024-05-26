import React from "react";
import { Button } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreAppointmentModal from "../../stores/store";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DataStoreAppointmentModal from "../../stores/data.store";
import PhotoStore from "../../stores/photo.store";

const DeletePhotoDialog = () => {
    const store = useInstance(StoreAppointmentModal)
    const photoStore = useInstance(PhotoStore)

    const isDeleteError = !((photoStore.deleteOnePhoto && photoStore.deleteOnePhoto!==null) || photoStore.deleteOnePhoto===0) && !photoStore.deleteAllPhotos && !photoStore.deleteCheckedPhotos

    const handleOnePhotoDelete = () => {
        photoStore.setResetPhotosByIndex(photoStore.deleteOnePhoto)
    }

    const handleAllPhotosDelete = () => {
        photoStore.setResetPhotos()
    }

    const handleCheckedPhotosDelete = () => {
        photoStore.setResetCheckedPhotos()
    }


    const close = () => {
        store.setDeletePhotoModalOpen(false)
        photoStore.setDeleteOnePhoto(null)
        photoStore.setDeleteAllPhotos(false)
        photoStore.setDeleteCheckedPhotos(false)
    }

    const deleteAndClose = () => {
        if ((photoStore.deleteOnePhoto && photoStore.deleteOnePhoto!==null) || photoStore.deleteOnePhoto===0){
            handleOnePhotoDelete()
        }else if (photoStore.deleteAllPhotos){
            handleAllPhotosDelete()
        }else if (photoStore.deleteCheckedPhotos){
            handleCheckedPhotosDelete()
        }
        close()
    }

    const modalTitle = () => {
        if ((photoStore.deleteOnePhoto && photoStore.deleteOnePhoto!==null) || photoStore.deleteOnePhoto===0){
            return "Удалить фотографию?"
        }else if (photoStore.deleteAllPhotos){
            return "Удалить все фотографии?"
        }else if (photoStore.deleteCheckedPhotos){
            return "Удалить выделенные фотографии?"
        }else {
            return "Ошибка удаления"
        }
    }

    return (
        <div>
            <Dialog
                open={store.deletePhotoModalOpen}
                onClose={() => close()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ minWidth: { xs: 250, sm: 400, md: 600 } }}>

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalTitle()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Нет</Button>
                    <Button onClick={deleteAndClose} autoFocus disabled={isDeleteError}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeletePhotoDialog;
