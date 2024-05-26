import React from 'react';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import PatientStore from "../../../../../store/patient.store"
import htmlToBlock from '../../../../../../../_common/helpers/htmlToBlock';


const Comment = observer(() => {
  const patientStore = useInstance(PatientStore)

  return (
    <Box sx={{
      pb: 1,
      borderBottom: patientStore.getParents()?.length > 0 ? "1px solid" : "none",
      borderColor: "primary.light4"
    }}>
      <Typography variant="subtitle1" sx={{mt: 2, mb: 1, fontSize: 16}}>
        Примечания:
      </Typography>
      <Box sx={{pl: 2}}>
        {patientStore.getComment() && htmlToBlock(patientStore.getComment())}
      </Box>
    </Box>
  );
});

export default Comment;