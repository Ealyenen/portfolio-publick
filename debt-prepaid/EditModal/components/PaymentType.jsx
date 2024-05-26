import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, FormHelperText, Select, FormControl, InputLabel, MenuItem, IconButton } from "@mui/material";
import EditModalStore from '../store/editModal.store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const PayType = observer(() => {
    const store = useInstance(EditModalStore)

    const handleStatusChange = (event) => {
        store.setPayType(event?.target?.value || '')
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <FormControl size="small" focused fullWidth disabled={store.getNotRepaid()} sx={{minWidth: 200}}>
                <InputLabel id="tabSelect">Тип рассчета</InputLabel>
                <Select
                    labelId="tabSelect"
                    id="tabSelect"
                    value={store.getPayType() || ""}
                    label="Тип рассчета"
                    onChange={handleStatusChange}
                >
                    {store.getPayTypes().map((item, index) =>
                        <MenuItem key={index} value={item.type}>{item.name}</MenuItem>
                    )}
                </Select>
                {store.getNotRepaid() &&
                 <FormHelperText>Долг не возвращен, невозможно указать тип оплаты</FormHelperText>
                }
            </FormControl>
            {store.getPayType() &&
                <IconButton size="small" onClick={() => handleStatusChange('')}>
                    <CloseIcon />
                </IconButton>
            }
        </Box>
    );
});

export default PayType;