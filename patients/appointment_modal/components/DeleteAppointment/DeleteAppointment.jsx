import React from "react";
import { Button } from "@mui/material";
import { useInstance } from "react-ioc";
import StoreAppointmentModal from "../../stores/store";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DELETE_APPOINTMENT } from "../../_mutations/newAppointment.mutations";
import { useMutation } from "@apollo/client";
import DataStoreAppointmentModal from "../../stores/data.store";
import AllPatientCard from "../../../store/patientCard.store";
import PatientEventsStore from "../../../store/patinetEvents.store";

const DeleteAppointmentDialog = () => {
  const store = useInstance(StoreAppointmentModal)
  const dataStore = useInstance(DataStoreAppointmentModal);
  const allPatientCard = useInstance(AllPatientCard)
  const patientEventsStore = useInstance(PatientEventsStore)

  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT)

  const close = () => {
    store.setDeleteAppointmentModalOpen(false)
  }

  const deleteAndClose = () => {
    deleteAppointment({
      variables: {
        "input": {
          appointmentId: dataStore.appointmentId,
        }
      }
    });
    patientEventsStore.deleteAppointment(dataStore.appointmentId)
    dataStore.resetData()
    store.setOpenModal(false)
    allPatientCard.setRefetching(true)
    store.setTabValue(0)
    store.setDeleteAppointmentModalOpen(false)
  }

  return (
    <div>
      <Dialog
        open={store.deleteAppointmentModalOpen}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ minWidth: { xs: 250, sm: 400, md: 600 } }}>

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы подтверждаете удаление приема?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Нет</Button>
          <Button onClick={deleteAndClose} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAppointmentDialog;
