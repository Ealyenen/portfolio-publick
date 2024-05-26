import React from 'react';
import { Box } from "@mui/material";
import PatientName from './components/PatientName';
import PatientBreadCrumbs from './components/PatientBreadCrumbs';


const PatientHeader = () => {

  return (
    <Box>
      <PatientName />
      <PatientBreadCrumbs />
    </Box>
  );
};

export default PatientHeader;