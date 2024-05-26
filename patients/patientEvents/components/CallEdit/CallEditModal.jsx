import * as React from 'react';
import { useEffect } from 'react';
import { Box, FormControl, Typography } from "@mui/material";
import { useInstance } from 'react-ioc';
import CallEditModalStore from './store/callEdit.store';
import SlideUpModal from '../../../../../_components/UI/modals/SlideUpModal';
import TextField from '@mui/material/TextField';
import CallCommentList from './components/CallCommentList';
import { observer } from 'mobx-react-lite';
import Switch from "@mui/material/Switch"
import { styled } from '@mui/material/styles';
import PatientEventsStore from '../../../store/patinetEvents.store';
import ButtonMainTimered from "../../../../../_components/UI/Buttons/ButtonMainTimered"

const CustomTextField = styled(TextField)({
    '& textarea': {
      padding: 16
    },
    '.MuiInputBase-multiline': {
        padding: 0
    }
  });

const CallEditModal = observer(() => {

  const callEditModalStore = useInstance(CallEditModalStore)
  const patientEventsStore = useInstance(PatientEventsStore)

  useEffect(() => {
    callEditModalStore.setAllReasons()
    callEditModalStore.setRender(false)
  }, [callEditModalStore])

  const handleClose = () => {
    callEditModalStore.setOpenPhoneCommentModal(false)
  }

  const handleSave = () => {
    const callId = callEditModalStore.getId()
    callEditModalStore.updateCallReasons().then(()=>{
      patientEventsStore.updateCallEvent(callId)
    })
  }


  return (
    <SlideUpModal
      open={callEditModalStore.openModal}
      title={'Информация по звонку'}
      closeClick={handleClose}
      // saveClick={handleSave}

      customBtn={<ButtonMainTimered
        color={"contrastLight"}
        title={"Сохранить"}
        timerTitle={"Ожидайте"}
        onClick={handleSave} />}
    >
      <Box sx={{p: 2, mt: 2, display: "flex", alignItems: "center", flexDirection: "row", gap: 2}}>
        <Box sx={{width: {xs: "100%", sm: 300, md: 500}, maxWidth: 500}}>
          <CustomTextField
            fullWidth
            value={callEditModalStore.comment}
            id="outlined-multiline-static"
            label="Комментарий"
            multiline
            minRows={1}
            inputProps={{ maxLength: 600 }}
            focused
            size="small"
            onChange={(value) => callEditModalStore.setComment(value.target.value)}
          />
        </Box>
      {callEditModalStore.direction==="outgoing" && 
        <FormControl fullWidth focused sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <label htmlFor="switch-create-patient-in-calls">
            <Switch checked={callEditModalStore.notReached} sx={{width: 60}} id="switch-create-patient-in-calls"
                    onChange={() => callEditModalStore.setSwitchNotReached()} />
            <Typography sx={{display: "inline"}} variant={"subtitle2"}>Не удалось дозвониться</Typography>
          </label>
        </FormControl>
        }
      </Box>

      <Box sx={{width: '100%', p: 2, pt: 0}}>
        <CallCommentList />
      </Box>
    </SlideUpModal>
  )
});

export default CallEditModal;