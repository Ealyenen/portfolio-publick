import React from 'react';
import { useInstance } from "react-ioc";
import { Box, FormControl, TextField, IconButton } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import DebtPrepaidStore from '../../store/debtPrepaid.store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const DatesRange = observer(() => {
    const store = useInstance(DebtPrepaidStore)

    const handleChangeDateFrom = (newDate) => {
        store.setDateFrom(newDate)
    }

    const handleChangeDateTo = (newDate) => {
        store.setDateTo(newDate)
    }

    return (
        <>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FormControl size="small" focused sx={{ width: 150 }} >
                    <MobileDatePicker
                        label="от"
                        inputFormat="DD.MM.yyyy"
                        value={store.getDateFrom() || null}
                        onChange={(newValue) => handleChangeDateFrom(newValue)}
                        views={['year', 'month', 'day']}
                        closeOnSelect={true}
                        renderInput={(params) => <TextField {...params} size="small" focused />}
                    />
                </FormControl>
                {store.getDateFrom() &&
                    <IconButton size="small" onClick={() => handleChangeDateFrom(null)}>
                        <CloseIcon />
                    </IconButton>
                }
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <FormControl size="small" focused sx={{ width: 150 }}>
                    <MobileDatePicker
                        label="до"
                        inputFormat="DD.MM.yyyy"
                        value={store.getDateTo() || null}
                        onChange={(newValue) => handleChangeDateTo(newValue)}
                        views={['year', 'month', 'day']}
                        closeOnSelect={true}
                        renderInput={(params) => <TextField {...params} size="small" focused />}
                    />
                </FormControl>
                {store.getDateTo() &&
                    <IconButton size="small" onClick={() => handleChangeDateTo(null)}>
                        <CloseIcon />
                    </IconButton>
                }
            </Box>
        </>
    );
});

export default DatesRange;