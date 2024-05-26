import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormControl, FormHelperText } from "@mui/material";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite"
import PasswordStore from '../../../store/password.store';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const OldPassword = observer(() => {
    const passwordStore = useInstance(PasswordStore)
    const [showPassword, setShowPassword] = useState(false)

    const handleChangeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleChangeOldPassword = (str) => {
        passwordStore.setOldPassword(str)
    }

    return (
        <>
            <FormControl sx={{ minWidth: 260 }}>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label={"Старый пароль*"}
                    value={passwordStore.getOldPassword() || ''}
                    size="small"
                    onChange={(e) => handleChangeOldPassword(e.target.value)}
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
            </FormControl>
        </>

    );
});

export default OldPassword;