import React from 'react';
import { Typography } from '@mui/material';
import { fullNameString } from '../../../../_common/helpers/nameGenerationString';
import { Link as RouterLink } from "react-router-dom";
import { PATIENTS_ROUTE } from '../../../../_common/router/routes';


const NameCell = ({patient}) => {
    return (
      <Typography sx={{ color: "primary.main" }} component={RouterLink} to={`${PATIENTS_ROUTE}/${patient?.id}`}>
        {fullNameString(patient?.lastName, patient?.firstName, patient?.patronymic)}
      </Typography>
    )
  }

export default NameCell;