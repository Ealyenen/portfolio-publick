import React from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SheduleSmsTemplatesStore from './store/sheduleSmsTemplates.store';
import SmsSendDataCreateWrite from '../CreateWrite/store/smsSendData.store';
import SmsTemplates from '../../../../_components/smsTemplates/smsTemplates';
import SmsSendDataChangeWriteStore from '../ChangeWrite/store/SmsSendModalChangeWriteData.data.store';


const SheduleSmsTemplates = (observer(() => {
  const store = useInstance(SheduleSmsTemplatesStore)
  const smsSendDataCreateWrite = useInstance(SmsSendDataCreateWrite)
  const smsSendDataChangeWriteStore = useInstance(SmsSendDataChangeWriteStore)

  const handleClose = () => {
    store.setOpenModal(false)
  }

  const handleChangeDataAndClose = (text) => {
    if (store.writeType === "new") {
      smsSendDataCreateWrite.changeSmsText(store.smsBlockIndex, store.textIndex, text)
    }else if (store.writeType === "old") {
      smsSendDataChangeWriteStore.changeSmsText(store.smsBlockIndex, store.textIndex, text)
    }
    handleClose()
  }


  return (
    <Dialog
      onClose={handleClose}
      open={store.openModal}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ECEDFF',
        p: 1, pl: 2
      }}>
        <Box>Смс шаблоны</Box>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 1 }}>
        <Box sx={{p: 2}}>
          <SmsTemplates dataForTextConvert={store.writeData} onChooseTemplate={(value)=>handleChangeDataAndClose(value)}/>
        </Box>
      </DialogContent>
      <Button onClick={handleClose}>Отмена</Button>
    </Dialog>
  );
}));

export default SheduleSmsTemplates;

