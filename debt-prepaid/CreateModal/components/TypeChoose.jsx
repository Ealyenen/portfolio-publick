import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, Typography, Select, FormControl, InputLabel, MenuItem, IconButton } from "@mui/material";
import CreteModalStore from '../store/createModal.store';
import { observer } from 'mobx-react-lite';
import CloseIcon from '@mui/icons-material/Close';

const TypeChoose = observer(() => {
    const store = useInstance(CreteModalStore)

    const handleStatusChange = (event) => {
        store.setType(event?.target?.value || '')
    }

    return (
        <FormControl size="small" focused fullWidth error={store.getTypeError()}>
            <InputLabel id="tabSelect" >Тип</InputLabel>
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
    );
});

export default TypeChoose;