import * as React from 'react';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useInstance } from 'react-ioc';
import ButtonMain from '../../../../../_components/UI/Buttons/ButtonMain';
import { ANALISIS_NAME_HINTS } from '../../_queries/Appointment.queries';
import { useLazyQuery, useQuery } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';

const NamesHintPopover = ({ onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null)


    const { data, loading, error, refetch } = useQuery(ANALISIS_NAME_HINTS)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleNameClick = (text) => {
        onClick(text)
        handleClose()
    }

    const nameBtnText = () => {
        if (error) {
            return "Произошла ошибка загрузки названий"
        } else if (data?.analyzePatterns?.length === 0) {
            return "Названия отсутствуют"
        } else return "Выбрать название"
    }

    return (
        <div>
            <Button
                disabled={loading || error || data?.analyzePatterns?.length === 0}
                aria-describedby={anchorEl ? `analisis-name-hint` : undefined}
                variant="outlined"
                onClick={handleClick}
                size="small"
            >
                <Typography variant="button">
                    {nameBtnText()}
                </Typography>
                {/* {loading && !data && <CircularProgress size={25}/>} */}
            </Button>
            <Popover
                id={anchorEl ? `analisis-name-hint` : undefined}
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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1, maxHeight: 200, overflow: "scroll" }}>
                    {data?.analyzePatterns?.length > 0 &&
                        data?.analyzePatterns?.map((pattern) => {
                            return (
                                <Button
                                    key={pattern.id}
                                    size="small"
                                    onClick={() => handleNameClick(pattern.text)}
                                >
                                    <Typography>{pattern.text}</Typography>
                                </Button>
                            )
                        })
                    }

                </Box>
            </Popover>
        </div>
    );
}

export default NamesHintPopover