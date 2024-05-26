import * as React from 'react';
import { useInstance } from 'react-ioc';
import TextField from '@mui/material/TextField';
import { observer } from 'mobx-react-lite';
import DebtCanceledModalStore from '../store/debtCanceled.store';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';

const CustomTextField = styled(TextField)({
    '& textarea': {
        padding: 16
    },
    '.MuiInputBase-multiline': {
        padding: 0
    }
});

const Comment = observer(() => {
    const store = useInstance(DebtCanceledModalStore)

    const handleChange = (newValue) => {
        store.setComment(newValue)
    }

    const handleResetComment = () => {
        store.resetCommentToDataComment()
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, alignItems: "center", height: 40 }}>
                <Typography variant="subtitle1" sx={{fontSize: 16}}> Комментарий</Typography>
                {store.isCommentChanged() &&
                    <IconButton onClick={handleResetComment} size="small">
                        <ReplayIcon />
                    </IconButton>
                }
            </Box>
            <CustomTextField
                sx={{ mt: 1 }}
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
        </Box>
    )
});

export default Comment;