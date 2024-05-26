import React from 'react';
import { Grid } from "@mui/material";
import Info from './components/info/Info';
import Research from './components/research/Research';
import Illneses from './components/illneses/Illneses';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from '../../store/patient.store';

const PatientInfo = observer(() => {
  const patientStore = useInstance(PatientStore)

  return (
    <Grid container spacing={2} sx={{mt: 2}}>
      <Info />
      {patientStore.getIsPatient() &&
        <>
          <Research />
          <Illneses />
        </>
      }
    </Grid>
  );
});

export default PatientInfo;