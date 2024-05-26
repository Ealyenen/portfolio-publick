import * as React from 'react';
import { useInstance } from 'react-ioc';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import CreteModalStore from '../store/createModal.store';

const Amount = observer(() => {
    const store = useInstance(CreteModalStore)

    const handleChange = (newValue) => {
        const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/
        if (newValue?.length <= 15 && regex.test(newValue)) {
            store.setAmount(newValue)
        } else store.setAmount("")
    }

    return (
        <TextField
            fullWidth
            error={store.getAmountError()}
            value={store.getAmount()}
            onChange={(e) => handleChange(e.target.value)}
            size="small"
            label={"сумма"}
            focused
            type="number"
            onKeyPress={(e) => {
                if (!/[0-9.,]/.test(e.key) ||
                    (e.key === ',' && e.target.value.includes(','))
                    ||
                    (e.key === '.' && e.target.value.includes('.'))
                ) {
                    e.preventDefault();
                }
            }}
        />
    )
});

export default Amount;