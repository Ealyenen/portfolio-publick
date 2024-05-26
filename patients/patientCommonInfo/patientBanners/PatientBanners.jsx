import React from 'react';
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import QuestionaryBanner from './components/QuestioneryBanner';
import PatientStore from '../../store/patient.store'
import { useInstance } from "react-ioc";


const PatientBanners = observer(() => {
  const patientStore = useInstance(PatientStore)

  return (
    <Box>
      {!patientStore.getIsQuestionary() && patientStore.getIsQuestionary() !== null &&
        <QuestionaryBanner />
      }
      {/* <AnalisisBanner /> */}
    </Box>
  );
});

export default PatientBanners;