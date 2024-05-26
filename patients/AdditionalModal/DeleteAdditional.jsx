import * as React from "react";
import { Button} from "@mui/material";
import { useInstance } from "react-ioc";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from "mobx-react-lite"
import AdditionStore from "./store/additionalModal.store";
import PatientEventsStore from "../store/patinetEvents.store";

const DeleteAddition = observer(() => {
    const additionStore = useInstance(AdditionStore)
    const patientEventsStore = useInstance(PatientEventsStore)

    const close = () =>{
        additionStore.setCloseDeleteDialog()
    }

    const deleteAndClose = () =>{
      const id = additionStore.getId()
        additionStore.setDeleteAddition().then(()=>{
          patientEventsStore.deleteInfoBlock(id)
        })
    }

  return (
    <div>
      <Dialog
        open={additionStore.openDeleteDialog}
        onClose={()=>close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{minWidth: 250}}>
          {`Удалить информационный блок?`}
        </DialogTitle>
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

export default DeleteAddition;