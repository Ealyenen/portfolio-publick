import React from 'react';
import { Box, Grid, Paper, Typography } from "@mui/material";
import AnalisisBlock from './components/AnalisisBlock';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import PatientViewStore from '../../store/patientInfo.view.store';
import StatusesHint from './components/StatusesHint';

const Research = observer(() => {
  const patientViewStore = useInstance(PatientViewStore)


  return (
    <Grid id={"researches-block"} item xs={12} sm={4} sx={{alignSelf: "strech"}}>
      <Paper sx={{bgcolor: "primary.light3", height: "100%"}}>
        <Box sx={{
          bgcolor: "primary.light2",
          p: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Typography variant="subtitle1" sx={{fontSize: 18}}>
            Исследования
          </Typography>
          <StatusesHint />
        </Box>
        <Box sx={{
          height: {xs: 250, sm: patientViewStore.researchBlockHeight || "100%"},
          overflowY: "scroll",
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}>
          <AnalisisBlock />
        </Box>
      </Paper>
    </Grid>
  );
});

export default Research;