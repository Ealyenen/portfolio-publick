import React from 'react';
import { Typography } from '@mui/material';
import { fullNameString } from '../../../_common/helpers/nameGenerationString';
import { Link as RouterLink } from "react-router-dom";
import { PATIENTS_ROUTE } from '../../../_common/router/routes';


const NameCell = ({rowData}) => {

    return (
      <Typography sx={{ color: "primary.main" }} component={RouterLink} to={`${PATIENTS_ROUTE}/${rowData.id}`}>
        {fullNameString(rowData.lastName, rowData.firstName, rowData.patronymic)}
      </Typography>
    )
  }

export default NameCell;