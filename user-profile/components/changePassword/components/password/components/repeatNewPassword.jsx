import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormControl, FormHelperText } from "@mui/material";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite"
import PasswordStore from '../../../store/password.store';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const RepeatNewPassword = observer(() => {
    const passwordStore = useInstance(PasswordStore)
    const [showPassword, setShowPassword] = useState(false)

    const handleChangeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChangeRepeatNewPassword = (str) => {
        passwordStore.setRepeatNewPassword(str)
    }

    return (
        <>
            <FormControl sx={{ minWidth: 260 }}>
                <TextField
                    error={!passwordStore.getIsSameNewPassword()}
                    type={showPassword ? 'text' : 'password'}
                    label={"Повторите новый пароль*"}
                    value={passwordStore.getRepeatNewPassword() || ''}
                    size="small"
                    onChange={(e) => handleChangeRepeatNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleChangeShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                {!passwordStore.getIsSameNewPassword() &&
                    <FormHelperText>Пароли должны совпадать</FormHelperText>
                }
            </FormControl>
        </>

    );
});

export default RepeatNewPassword;