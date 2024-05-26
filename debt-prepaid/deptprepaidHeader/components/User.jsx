import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, TextField, IconButton } from "@mui/material";
import { USERS } from '../../query/debtPrepaid.queries';
import { useQuery } from "@apollo/client";
import { SurnameAndInitialsString } from '../../../../_common/helpers/nameGenerationString';
import Autocomplete from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import DebtPrepaidStore from '../../store/debtPrepaid.store';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { sortArrayOfSpecByAlphabetWithStore } from '../../../../_common/helpers/sortArrayOfSpecByAlphabet'

const User = observer(() => {
    const store = useInstance(DebtPrepaidStore)

    const { data, loading, error } = useQuery(USERS)

    const handleChangeUser = (v) => {
        store.setUser(v || null)
    }

    const users = () => {
        return sortArrayOfSpecByAlphabetWithStore(data?.allUsers)?.map((user) => {
            return {
                id: user.id,
                label: SurnameAndInitialsString(user?.lastName, user?.firstName, user?.patronymic)
            }
        }) || []
    }

    const isOptionEqualToValue = (option, value) => {
        return option.id === value.id
    };


    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Autocomplete
                value={store.getUser() || null}
                disabled={error}
                loading={loading}
                loadingText={"Загружается..."}
                noOptionsText={"Нет опций"}
                disablePortal
                id="combo-box-demo"
                options={!loading ? users() : []}
                onChange={(event, value) => {
                    handleChangeUser(value)
                }}
                isOptionEqualToValue={isOptionEqualToValue}
                renderInput={(params) => {
                    return (
                        <TextField
                            sx={{ minWidth: { xs: 240, md: 300 } }}
                            {...params}
                            label={"Пользователь"}
                            variant="outlined"
                            focused={true}
                            size={"small"}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Box sx={{ mr: 3, display: "flex", alignItems: "center" }}>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </Box>
                                ),
                            }}
                        />
                    );
                }}
            />
            {store.getUser() &&
                <IconButton size="small" onClick={() => handleChangeUser(null)}>
                    <CloseIcon />
                </IconButton>
            }
        </Box>
    );
});

export default User;