import React from 'react';
import { useInstance } from "react-ioc";
import { Box, TextField, IconButton } from "@mui/material";
import { SEARCH_PATIENT } from '../../query/debtPrepaid.queries';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { fullNameString } from '../../../../_common/helpers/nameGenerationString';
import { useLazyQuery } from "@apollo/client";
import Autocomplete from '@mui/material/Autocomplete';
import DebtPrepaidStore from '../../store/debtPrepaid.store';
import CloseIcon from '@mui/icons-material/Close';

const Patient = observer(() => {
    const store = useInstance(DebtPrepaidStore)

    const [getPatient, { data, loading }] = useLazyQuery(SEARCH_PATIENT, {
        variables: {
            q: "",
            isActive: true,
        }
    })

    const getOption = (item) => {
        return fullNameString(item?.lastName, item?.firstName, item?.patronymic)
    }

    const handleChangePatient = (newPatient) => {
        store.setPatient(newPatient || null)
    }

    let timeout = null;

    const handleSearchPatient = (strFind) => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            const findStr = String(strFind.replace(/ /g, ","))
            getPatient({
                variables: {
                    q: findStr.startsWith(',') ? findStr.substring(1) : findStr,
                    isActive: true,
                    isPatient: false,
                }
            })
        }, 200)

    }

    const isOptionEqualToValue = (option, value) => {
        return option.id === value.id
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Autocomplete
                value={store.getPatient() || null}
                size="small"
                disablePortal
                loading={loading}
                loadingText={"Загружается..."}
                noOptionsText={"Уточните поиск"}
                options={data?.searchPatient || []}
                id="patient-search"
                getOptionLabel={(option) => getOption(option)}
                onChange={(event, value) => {
                    handleChangePatient(value)
                }}
                isOptionEqualToValue={isOptionEqualToValue}
                filterOptions={() => { return data?.searchPatient || [] }}
                renderOption={(props, option) => (
                    <Box {...props} key={`patient-search-${option?.id}`} sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <Box sx={{ width: "100%" }}>
                            {fullNameString(option?.lastName, option?.firstName, option?.patronymic)}
                        </Box>
                        <Box sx={{ width: 130, textAlign: "end" }}>
                            {option?.birthday && moment(option?.birthday).format("DD.MM.YYYY")}
                        </Box>
                    </Box>
                )}
                renderInput={(params) => {
                    return (
                        <TextField
                            sx={{ minWidth: { xs: 240, md: 300 } }}
                            onChange={(event) => {
                                handleSearchPatient(event.target.value)
                            }}
                            {...params}
                            label={"Пациент"}
                            variant="outlined"
                            focused={true}
                            size={"small"}
                        />
                    );
                }}
            />
            {store.getPatient() &&
                <IconButton size="small" onClick={() => handleChangePatient(null)}>
                    <CloseIcon />
                </IconButton>
            }
        </Box>
    );
});

export default Patient;