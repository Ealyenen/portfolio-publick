import * as React from 'react';
import { useInstance } from 'react-ioc';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import CreteModalStore from '../store/createModal.store';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
    '& textarea': {
        padding: 16
    },
    '.MuiInputBase-multiline': {
        padding: 0
    }
});

const Comment = observer(() => {
    const store = useInstance(CreteModalStore)

    const handleChange = (newValue) => {
        store.setComment(newValue)
    }

    return (
        <CustomTextField
            sx={{ mt: 2 }}
            label={"Комментарий"}
            value={store.getComment()}
            size="small"
            focused
            fullWidth
            inputProps={{ maxLength: 300 }}
            multiline
            minRows={2}
            maxRows={4}
            onChange={(e) => handleChange(e.target.value)}
        />
    )
});

export default Comment;