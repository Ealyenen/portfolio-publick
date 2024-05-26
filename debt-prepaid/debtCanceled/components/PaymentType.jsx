import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, FormHelperText, Select, FormControl, InputLabel, MenuItem, IconButton } from "@mui/material";
import DebtCanceledModalStore from '../store/debtCanceled.store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const PayType = observer(() => {
    const store = useInstance(DebtCanceledModalStore)

    const handleStatusChange = (event) => {
        store.setPayType(event?.target?.value || '')
        store.setPayTypeError(false)
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
            <FormControl size="small" focused fullWidth error={store.getPayTypeError()}>
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