import React, { useEffect } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box,
  FormControl,
  InputLabel, MenuItem, Select,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import AddIcon from "@mui/icons-material/Add";
import StoreAppointmentModal from "../stores/store";
import DataStoreAppointmentModal from "../stores/data.store";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { provider } from "react-ioc";
import { sortArrayOfSpecByAlphabetWithStore } from "../../../../_common/helpers/sortArrayOfSpecByAlphabet"
import MemoryAppointmentsBtn from './MemoryAppointmentsBtn';

const CommonInfoBlockNewAppointment = provider()(observer(() => {
  const store = useInstance(StoreAppointmentModal);
  const dataStore = useInstance(DataStoreAppointmentModal);

  useEffect(() => {
    dataStore.setInfo()
  }, [dataStore])

  const infoToggle = () => store.setInfoExpandToggle();

  const changeUserSelect = (id) => {
    dataStore.setUserId(id)
  }

  const changeCenterSelect = (id) => {
    dataStore.setCenterId(id)
  }

  return (
    <Accordion expanded={store.infoExpand} onChange={infoToggle} sx={{ boxShadow: 'none' }}>
      <AccordionSummary
        sx={{ bgcolor: 'primary.light2', flexDirection: 'row-reverse'}}
        expandIcon={<AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{flex: 1, display: "flex", alignItems: "center"}}>Информация о приеме</Typography>
        <MemoryAppointmentsBtn/>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 2, bgcolor: 'primary.light3', alignItems: 'center', display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box sx={{ alignItems: 'center', display: "flex", flexWrap: "wrap", gap: 1 }}>
          <FormControl sx={{ minWidth: 244 }} size="small" focused>
            <InputLabel id="userSelect">Специалист</InputLabel>
            <Select
              labelId="userSelect"
              id="userSelect"
              value={dataStore.userId}
              label="Специалист"
              disabled={dataStore.isExisted ? true : false}
              onChange={(e) => changeUserSelect(e.target.value)}
            >
              {dataStore.users.length > 0 && sortArrayOfSpecByAlphabetWithStore(dataStore.users).map((item, index) =>
                <MenuItem key={index} value={item.id}>
                  {item.lastName}{" "}{item.firstName}{item.patronymic ? ` ${item.patronymic}` : ""}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 244 }} size="small" focused>
            <InputLabel id="centerSelect">Центр</InputLabel>
            <Select
              labelId="centerSelect"
              id="centerSelect"
              value={dataStore.centerId}
              label="Центр"
              onChange={(e) => changeCenterSelect(e.target.value)}
            >
              {dataStore.centers.map((item, index) =>
                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 244 }} size="small" focused>
            <MobileDatePicker
              label="Дата"
              inputFormat="DD.MM.yyyy"
              value={dataStore.date}
              onChange={(newValue) => dataStore.setDate(newValue)}
              renderInput={(params) => <TextField {...params} size="small" focused />}
            />
          </FormControl>
          <Box sx={{ display: "inline-block", mr: 1 }}>
            <FormControl focused sx={{ mr: 1 }}>
              <TextField
                size="small"
                focused
                id="timeStart"
                label="от"
                type="time"
                value={dataStore.fromTime}
                onChange={(newValue) => {
                  dataStore.setFromTime(newValue.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </FormControl>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}));

export default CommonInfoBlockNewAppointment;