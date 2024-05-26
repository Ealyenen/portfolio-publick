import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography } from "@mui/material";
import Registration from './components/Registration';
import Communication from './components/Communication';
import Questionary from './components/Questionary';
import Comment from './components/Comment';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientViewStore from '../../store/patientInfo.view.store';
import Connetions from './components/Connections';
import PatientStore from '../../../../store/patient.store';


const Info = observer(() => {
  const patientViewStore = useInstance(PatientViewStore)
  const patientStore = useInstance(PatientStore)

  const updateHeight = () => {
    const block = document.getElementById("info-data");
    const title = document.getElementById("info-title");
    if (block && title) {
      patientViewStore.setInfoBlockHeight(block.getBoundingClientRect().height)
      patientViewStore.setInfoTitleHeight(title.getBoundingClientRect().height)
    }
  }


  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    }
  }, [patientStore.getIsLoadingQuestionary(), patientStore.getPhones(), patientStore.getComment(), patientStore.getParents()]);

  return (
    <Grid item xs={12} sm={patientStore.getIsPatient() ? 5 : 12} sx={{ alignSelf: "stretch" }}>
      <Paper sx={{ bgcolor: "primary.light3", height: "100%" }}>
        <Box
          id={"info-title"}
          sx={{
            bgcolor: "primary.light2",
            p: 1,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap"
          }}>
          <Typography variant="subtitle1" sx={{ fontSize: 18 }}>
            Информация о пациенте
          </Typography>
          <Registration />
        </Box>
        <Box id={"info-data"} sx={{ pl: 2, pr: 2, pb: 2, maxHeight: { xs: "auto", sm: 500 }, overflowY: "scroll" }}>
          <Communication />
          <Questionary />
          {patientStore.getComment()?.length > 0 &&
            <Comment />
          }
          {patientStore.getParents()?.length > 0 &&
            <Connetions />
          }
        </Box>
      </Paper>
    </Grid>
  );
});

export default Info;