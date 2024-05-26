import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, Switch, FormControlLabel } from "@mui/material";
import EditModalStore from '../store/editModal.store';
import { observer } from 'mobx-react-lite';

const NotRepaid = observer(() => {
    const store = useInstance(EditModalStore)

    const handleStatusChange = () => {
        store.switchNotRepaid()
    }

    return (
        <Box>
           <FormControlLabel control={<Switch checked={store.getNotRepaid()} onChange={handleStatusChange}/>} label="Не возвращен" />
        </Box>
    );
});

export default NotRepaid;