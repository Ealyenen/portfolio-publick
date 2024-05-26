import React, { useState, useEffect } from 'react';
import { useInstance } from "react-ioc";
import StoreOtherCommunicationsModal from "./stores/store";
import BaseModal from "../../../_components/UI/modals/BaseModal";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";
import { SEND_SMS } from '../_mutations/patients.mutations';
import { useMutation } from "@apollo/client";
import SmsTemplates from '../../../_components/smsTemplates/smsTemplates';
import moment from "moment";
import authStore from '../../../_common/stores/auth.store';
import PatientStore from '../store/patient.store';

const OtherCommunicationsModal = observer(() => {
  const store = useInstance(StoreOtherCommunicationsModal)
  const patientStore = useInstance(PatientStore)
  const [chousenPhone, setChousenPhone] = useState()
  const [smsText, setSmsText] = useState("")
  const [phones, setPhones] = useState([])
  
  const smsTemplatesData = {
    specialist: {
      surname: authStore.user.lastName ? authStore.user.lastName : "",
      name: authStore.user.firstName ? authStore.user.firstName : "",
      patronymic: authStore.user.patronymic ? authStore.user.patronymic : "",
    },
    patient: {
      surname: patientStore.getLastName(),
      name: patientStore.getFirstName(),
      patronymic: patientStore.getPatronymic(),
    },
    date: moment(new Date()).format("DD.MM.YYYY"),
    time: moment(new Date()).format("HH:mm")
  }

  useEffect(() => {
    let newPhoneSet = []
    patientStore.getPhones()?.forEach((phone) => {
      if (phone.ruNumber && phone.isSms) {
        newPhoneSet.push(phone)
        if (phone.isDefault) {
          setChousenPhone(phone)
        }
      }
    })
    setPhones(newPhoneSet)
    if (!chousenPhone && newPhoneSet.length > 0) {
      setChousenPhone(newPhoneSet[0])
    }
  }, [])


  const [sendSMS] = useMutation(SEND_SMS);

  const handleChangeSmsText = (text) => {
    setSmsText(text)
  }

  const handleSetSmsTemplate = (text) => {
    setSmsText(text)
    store.setOpenMessages(false)
  }

  const handleChoosePhone = (id) => {
    for (let i = 0; i < phones.length; i++) {
      if (id === phones[i].id) {
        setChousenPhone(phones[i])
      }
    }
  }

  const handleSend = () => {
    if (chousenPhone?.id) {
      sendSMS({
        variables: {
          "input": {
            patient: patientStore.getPatientId(),
            phone: chousenPhone.id,
            text: smsText,
          }
        }
      });
    }

    store.setOpenModal(false)
  }

  if (patientStore.getSendSms() !== "YES") {
    return (
      <BaseModal title={'Иные средства связи...'}
        open={store.openModal}
        onClose={() => store.setOpenModal(false)}
        saveTitle={'Отправить'}
        hideSave
        closeTitle={'Закрыть'}
        maxWidth={'md'}
      >
        <Typography sx={{ textAlign: "center", width: "100%", p: 10 }} variant={"h6"}>
          Отправка смс пациенту не разрешена
        </Typography>
      </BaseModal>
    )
  }

  if (!phones?.length>0){
    return (
      <BaseModal title={'Иные средства связи...'}
        open={store.openModal}
        onClose={() => store.setOpenModal(false)}
        saveTitle={'Отправить'}
        hideSave
        closeTitle={'Закрыть'}
        maxWidth={'md'}
      >
        <Typography sx={{ textAlign: "center", width: "100%", p: 10 }} variant={"h6"}>
          Отсутствуют телефоны, на которые возможна отправка смс. Проверьте есть ли у пациента телефон с русским номером и разрешенной отправкой смс
        </Typography>
      </BaseModal>
    )
  }

  const phoneSelectItem = (phone) => {
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Typography>
          {phone.type.type}{" "}{phone.hasOrder && phone.order}
        </Typography>
        <Typography>
          {phone.comment}
        </Typography>
      </Box>
    )
  }

  return (
    <BaseModal title={'Иные средства связи...'}
      open={store.openModal}
      onClose={() => store.setOpenModal(false)}
      saveClick={() => handleSend()}
      saveTitle={'Отправить'}
      closeTitle={'Закрыть'}
      maxWidth={'md'}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ display: store.displayEditor, mt: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <FormControl focused fullWidth>
              <InputLabel id="demo-simple-select-label">Номер телефона</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Адрес отправки"
                value={chousenPhone?.id || ""}
                onChange={(e) => {
                  handleChoosePhone(e.target.value)
                }}
                size="small"
              >
                {
                  phones.map((phone) => {
                    return (
                      <MenuItem key={phone.id} value={phone.id}>
                        {phoneSelectItem(phone)}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Box>
          <Button sx={{ textTransform: 'uppercase', mt: 2, display: { xs: 'block', md: 'none' } }} variant="outlined"
            size="small" fullWidth onClick={() => store.setOpenMessages(true)}>
            <Typography>Выбрать вариант заполнения</Typography>
          </Button>
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            multiline
            rows={10}
            size="small"
            focused
            id="timeStart"
            label="Текст сообщения"
            value={smsText}
            onChange={(event) => handleChangeSmsText(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{
            display: {
              xs: store.displayMessages,
              md: 'flex',
              flexDirection: 'column',
              bgcolor: 'primary.light2',
              height: '100%'
            }
          }}>
            <Box sx={{ p: 2, display: { xs: 'block', md: 'none' } }}>
              <Button sx={{ textTransform: 'uppercase' }} variant="outlined" onClick={() => store.setOpenMessages(false)}
                size="small">
                <Typography>Назад</Typography>
              </Button>
            </Box>
            <Box sx={{
              height: '100%',
              minHeight: '200px',
              maxHeight: '427px',
              overflow: 'scroll',
            }}>
              <SmsTemplates onChooseTemplate={(e) => handleSetSmsTemplate(e)} dataForTextConvert={smsTemplatesData} />
            </Box>
          </Box>
        </Grid>
      </Grid>

    </BaseModal>
  );
});

export default OtherCommunicationsModal;