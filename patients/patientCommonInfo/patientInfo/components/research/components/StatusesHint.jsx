import React, { useState } from "react";
import { IconButton } from "@mui/material"
import Popover from '@mui/material/Popover';
import HelpIcon from '@mui/icons-material/Help';
import HintList from "./HintList";


const StatusesHint = (() => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


    return (
        <>
            <IconButton
                size="small"
                aria-describedby={anchorEl ? `shedule-popover-hint` : undefined}
                onClick={handleClick}
                sx={{
                    color: "primary.main",
                    ":hover": {
                        color: { xs: "primary.main", md: "primary.light3" },
                        bgcolor: {xs: "none", md: "primary.main"}
                    }
                }}
            >
                <HelpIcon />
            </IconButton>
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
                <HintList />
            </Popover>
        </>

    )

});

export default StatusesHint