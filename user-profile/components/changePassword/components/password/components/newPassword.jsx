import React, { useState } from 'react';
import { Box, ButtonGroup, TextField, FormControl, FormHelperText } from "@mui/material";
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite"
import PasswordStore from '../../../store/password.store';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PasswordViewStore from '../../../store/password.view.store';


const NewPassword = observer(() => {
    const passwordViewStore = useInstance(PasswordViewStore)
    const passwordStore = useInstance(PasswordStore)
    const [showPassword, setShowPassword] = useState(false)

    const handleChangeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    const handleChangeNewPassword = (str) => {
        passwordStore.setNewPassword(str)
        passwordViewStore.setSaveClicked(false)
    }

    return (
        <>
            <FormControl sx={{ minWidth: 260 }}>
                <TextField
                    error={passwordViewStore.getSaveClicked() && !passwordStore.getIsNewPasswordSuitCharConditions()}
                    type={showPassword ? 'text' : 'password'}
                    label={"Новый пароль*"}
                    value={passwordStore.getNewPassword() || ''}
                    size="small"
                    onChange={(e) => handleChangeNewPassword(e.target.value)}
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
                 {passwordStore.getNewPassword().length>0 && !passwordStore.getIsNewPasswordSuitCharConditions() &&
                    <FormHelperText>Не соблюдены параметры пароля</FormHelperText>
                }
            </FormControl>
        </>

    );
});

export default NewPassword;