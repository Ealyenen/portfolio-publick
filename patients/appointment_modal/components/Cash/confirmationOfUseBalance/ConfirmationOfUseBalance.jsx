import * as React from 'react';
import { useInstance } from "react-ioc";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import StoreConfirmationOfUseBalanceForCheque from './store/confirmationOfUseBalance.store';

export default function ConfirmationOfUseBalance() {
    const store = useInstance(StoreConfirmationOfUseBalanceForCheque)

    const handleClose = () => {
        store.setReset()
    };

    const handleSave = () => {
        store.setConfirmed(true)
        store.setOpenModal(false)
    }

    return (
        <Dialog
            open={store.openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Списать
                {store?.summ}{'\u20BD'}{" "}
                с баланса и отправить чек
                #{store?.cheque}{" "}
                на терминал?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Отмена</Button>
                <Button onClick={handleSave} autoFocus>
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    );
}