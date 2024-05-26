import * as React from "react";
import { Button } from "@mui/material";
import { useInstance } from "react-ioc";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from "mobx-react-lite"
import deleteDialogStore from './store/deleteDialog.store'
import moment from "moment"
import { useMutation } from "@apollo/client";
import { DELETE_DUTY } from "../mutation/debtPrepaid.mutations";
import DebtPrepaidStore from "../store/debtPrepaid.store";

const DeleteDialog = observer(() => {
  const store = useInstance(deleteDialogStore)
  const debtPrepaidStore = useInstance(DebtPrepaidStore)

  const [deleteDuty] = useMutation(DELETE_DUTY)

  const close = () => {
    store.resetAndClose()
  }

  const deleteAndClose = () => {
    deleteDuty({
      variables: {
        dutyId: store.getId()
      }
    }).catch((err) => {
      if (err) {
        alert("Не удалось удалить")
      }
    }).then((data) => {
      if (data?.data?.deleteDuty?.success) {
        //not handleDelete as there is field account what changes in all patient's operations...
        debtPrepaidStore.requestAllDebt()
      } else {
        alert(data?.data?.deleteDuty?.msg)
      }
      close()
    })
  }

  return (
    <div>
      <Dialog
        open={store.getOpenModal()}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ minWidth: { xs: 250, sm: 400, md: 600 } }}>
          Удалить?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {store.getType() || ""} от {store.getCreated() ? moment(store.getCreated()).format("DD.MM.YYYY HH:mm") : ""}
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
})

export default DeleteDialog;