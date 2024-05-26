import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from "mobx-react-lite"
import QuestionaryModalViewStore from "../store/questionaryModal.view.store";
import QuestionaryModalStore from "../store/questionaryModal.store";
import CircularProgress from '@mui/material/CircularProgress';
import PatientStore from "../../store/patient.store";

const DeleteChousenDialog = observer(() => {
    const questionaryModalViewStore = useInstance(QuestionaryModalViewStore)
    const questionaryModalStore = useInstance(QuestionaryModalStore)
    const patientStore = useInstance(PatientStore)
    const [isLoading, setIsloading] = useState(false)

    const close = () => {
        questionaryModalViewStore.setOpenDeleteChousen(false)
    }

    const deleteAndClose = () => {
        setIsloading(true)
        questionaryModalStore.deleteChousenFiles(patientStore.getPatientId(), patientStore.getLastName(), patientStore.getFirstName()).then(() => {
            setIsloading(false)
            close()
        })
    }

    return (
        <Dialog
            open={questionaryModalViewStore.getOpenDeleteChousen()}
            onClose={() => close()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ minWidth: 250 }}>
                {`Удалить выбранные файлы?`}
            </DialogTitle>

            {isLoading ?
                <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                    <CircularProgress/>
                </Box>
                :
                <DialogActions>
                    <Button onClick={close}>Нет</Button>
                    <Button onClick={deleteAndClose} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            }
        </Dialog>
    );
})

export default DeleteChousenDialog;