import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { provider } from "react-ioc";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

const AnalysisHint = provider()(observer(() => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <div>
                <Button variant="outlined" size="small" aria-describedby={anchorEl ? `analisis-hint` : undefined} onClick={handleClick}>
                    <Typography variant="button">
                        Подсказка
                    </Typography>
                </Button>
                <Popover
                    id={anchorEl ? `analisis-hint` : undefined}
                    open={anchorEl ? true : false}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography>
                            Краткие названия должны быть уникальны
                        </Typography>
                    </Box>
                </Popover>
            </div>

        </>
    )
}));

export default AnalysisHint