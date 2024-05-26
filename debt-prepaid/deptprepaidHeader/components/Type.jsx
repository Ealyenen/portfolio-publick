import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, Typography, Select, FormControl, InputLabel, MenuItem, IconButton } from "@mui/material";
import DebtPrepaidStore from '../../store/debtPrepaid.store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const Type = observer(() => {
    const store = useInstance(DebtPrepaidStore)

    const handleStatusChange = (event) => {
        store.setType(event?.target?.value || '')
    }

    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <FormControl size="small" focused sx={{ minWidth: 150 }}>
                <InputLabel id="tabSelect">Тип</InputLabel>
                <Select
                    labelId="tabSelect"
                    id="tabSelect"
                    value={store.getType() || ""}
                    label="Тип"
                    onChange={handleStatusChange}
                >
                    {store.getTypes().map((item, index) =>
                        <MenuItem key={index} value={item.type}>{item.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {store.getType() &&
                <IconButton size="small" onClick={() => handleStatusChange('')}>
                    <CloseIcon />
                </IconButton>
            }
        </Box>
    );
});

export default Type;