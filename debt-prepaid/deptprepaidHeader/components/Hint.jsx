import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material"
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


const HintPopover = (() => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const hint = (color, text) => {
        return (
            <Box sx={{ mt: 1 }}>
                <Box
                    sx={{
                        display: "inline-block",
                        bgcolor: color,
                        width: 14,
                        height: 14,
                        borderRadius: 10,
                        border: "1px solid",
                        borderColor: "primary.light",
                    }}
                />
                <Typography sx={{ display: "inline", ml: 1 }}>
                    - {text}
                </Typography>
            </Box>
        )
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
                <Box sx={{ pl: 3, pr: 3, mt: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                        Цвета интерфейса
                    </Typography>
                    {hint("primary.lightred4", "Активный долг")}
                    {hint("primary.yellow", "Не возвращенный долг")}
                    {hint("primary.lightblue", "Активный аванс")}
                    {hint("primary.white", "Списанная операция")}
                    {hint("primary.halfViolet", "Удаленная операция")}
                </Box>
                <Box sx={{ display: { xs: "none", md: "block" }, pl: 3, pr: 3, mt: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                        Использование интерфейса
                    </Typography>
                    {hint("primary.light", 'Для удаления наведите на последнюю колонку и нажмите на иконку "корзины"')}
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" }, pl: 3, pr: 3, mt: 2, mb: 2 }}>
                    <Typography variant="subtitle1">
                        Использование интерфейса
                    </Typography>
                    {hint("primary.deepGreen", 'Для создания нажмите на круглую кнопку с плюсом слева внизу"')}
                </Box>
            </Popover>
        </>

    )

});

export default HintPopover