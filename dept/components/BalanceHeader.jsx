import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';


const BalanceHeader = ({ sortModel, sortFunction }) => {

    const handleSortClick = () =>{
        sortFunction()
    }
    
    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <IconButton
                onClick={handleSortClick}
                size="small"
            >
                {
                    sortModel === "desc" ?
                        <SouthIcon />
                        :
                        <NorthIcon/>
                }
            </IconButton>
            <Typography>
                Баланс
            </Typography>
        </Box>
    )
}

export default BalanceHeader;