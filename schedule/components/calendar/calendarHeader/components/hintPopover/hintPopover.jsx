import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material"
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import SheduleHintList from "./hintList";
import CloseIcon from '@mui/icons-material/Close';


const SheduleHintPopover = (() => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <Button variant="outlined" size="small" aria-describedby={anchorEl ? `shedule-popover-hint` : undefined} onClick={handleClick}>
                <Typography variant="button">
                    Подсказка
                </Typography>
            </Button>
            <Popover
                id={anchorEl ? `shedule-popover-hint` : undefined}
                open={anchorEl ? true : false}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <IconButton
                    sx={{ float: "right", display: { xs: "block", md: "none" } }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <SheduleHintList />
            </Popover>
        </>

    )

});

export default SheduleHintPopover