import React from 'react';
import { Typography } from '@mui/material';


const BalanceCell = ({balance}) => {
    const color = balance?.value > 0 ? "primary.deepblue" : "primary.lightred"

    return (
      <Typography sx={{ color: color }} variant="subtitle1">
        {balance?.value}
      </Typography>
    )
  }

export default BalanceCell;