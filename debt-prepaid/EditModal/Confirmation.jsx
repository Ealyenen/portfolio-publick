import * as React from "react";
import { Button } from "@mui/material";
import { useInstance } from "react-ioc";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { observer } from "mobx-react-lite"
import EditModalStore from "./store/editModal.store";
import moment from "moment"
import { useMutation } from "@apollo/client";
import { UPDATE_DUTY } from "../mutation/debtPrepaid.mutations";
import DebtPrepaidStore from "../store/debtPrepaid.store";

const SaveDialog = observer(() => {
    const store = useInstance(EditModalStore)
    const debtPrepaidStore = useInstance(DebtPrepaidStore)

    const [updateDuty] = useMutation(UPDATE_DUTY)


    const close = () => {
        store.setOpenConfirmation(false)
    }

    const save = () => {
        updateDuty({
            variables: {
                comment: store.getComment(),
                dutyId: store.getData()?.id,
                paymentType: store.getPayType() || undefined,
                status: store.status,
            }
        }).catch((err) => {
            console.log("err in updateDuty", err)
        }).then((data) => {
            if (data?.data?.updateDuty?.success) {
                //not handleUpdateFunction as there is field account what changes in all patient's operations...
                debtPrepaidStore.requestAllDebt()
                store.reset()
                store.setOpenModal(false)
            } else {
                alert(data?.data?.updateDuty?.msg || "Произошла ошибка при изменении данных")
            }
        })
        close()
    }

    return (
        <div>
            <Dialog
                open={store.getOpenConfirmation()}
                onClose={() => close()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ minWidth: { xs: 250, sm: 400, md: 600 } }}>
                    Подтвердите действие
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        после сохранения вы не сможете отменить изменения?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Нет</Button>
                    <Button onClick={save} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})

export default SaveDialog;