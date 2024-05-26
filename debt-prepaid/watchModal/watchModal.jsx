import React from 'react';
import { useInstance } from "react-ioc";
import { Box, Typography, IconButton } from "@mui/material";
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import WatchModalStore from './store/watchModal.store';
import SimpleModal from '../../../_components/UI/modals/SimpleModal';
import CloseIcon from '@mui/icons-material/Close';
import { fullNameString, SurnameAndInitialsString } from '../../../_common/helpers/nameGenerationString';
import { Link as RouterLink } from "react-router-dom";
import { PATIENTS_ROUTE } from '../../../_common/router/routes';

const WatchModal = observer(() => {
    const store = useInstance(WatchModalStore)

    const handleCloseModal = () => {
        store.setData(null)
        store.setOpenModal(false)
    }

    if (!store.getData()) {
        return (
            <SimpleModal
                open={store.getOpenModal()}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ m: 4 }}>
                    <Typography id="modal-modal-title" variant="h6">
                        Данные отсутствуют
                    </Typography>
                </Box>
            </SimpleModal>
        )
    }

    const outputData = (title, text) => {
        return (
            <Box sx={{ mt: 2 }}>
                <Typography sx={{ display: "inline", fontSize: 18, mr: 1 }} variant="subtitle1">
                    {title}:{" "}
                </Typography>
                <Typography sx={{ display: "inline" }} component="span">
                    {text}
                </Typography>
            </Box>
        )
    }

    return (
        <SimpleModal
            open={store.getOpenModal()}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ mt: { xs: 2, sm: 5 }, mb: 4, ml: { xs: 2, sm: 1 }, mr: { xs: 2, sm: 1 } }}>
                <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "end" }}>
                    <IconButton onClick={handleCloseModal} >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box>
                    <Typography id="modal-modal-title" variant="h5" sx={{ textAlign: "center" }}>
                        {store.getData()?.operationTypeShow}
                    </Typography>
                    <Box sx={{mt: 4}}>
                        {store.getData()?.status === "DEBT_NOT_REPAYED" &&
                            <Typography sx={{ mt: 1, fontSize: 18, color: "primary.deepred" }} variant="subtitle1">
                                Долг не возвращен
                            </Typography>
                        }
                        {!store.getData()?.isActive &&
                            <Typography sx={{ mt: 1, fontSize: 18, color: "primary.deepred" }} variant="subtitle1">
                                Удалено
                            </Typography>
                        }
                        {outputData("Пациент",
                            <Typography sx={{ color: "primary.main" }} component={RouterLink} to={`${PATIENTS_ROUTE}/${store.getData()?.patient?.id}`}>
                                {fullNameString(store.getData()?.patient?.lastName, store.getData()?.patient?.firstName, store.getData()?.patient?.patronymic)}
                            </Typography>
                        )}
                        {outputData("Сумма", `${store.getData()?.amount}\u20BD`)}
                        {outputData("Тип расчета", store.getData()?.paymentTypeShow)}
                        {outputData(
                            "Создание",
                            moment(store.getData()?.created).format("DD.MM.YYYY HH:mm")
                            + " " +
                            SurnameAndInitialsString(store.getData()?.userCreated?.lastName, store.getData()?.userCreated?.firstName, store.getData()?.userCreated?.patronymic)
                        )}
                        {outputData(
                            "Изменение",
                            moment(store.getData()?.modified).format("DD.MM.YYYY HH:mm")
                            + " " +
                            SurnameAndInitialsString(store.getData()?.userModified?.lastName, store.getData()?.userModified?.firstName, store.getData()?.userModified?.patronymic)
                        )}
                        {store.getData()?.comment && outputData("Комментарий", store.getData()?.comment)}
                    </Box>
                </Box>
            </Box>
        </SimpleModal>
    )
});

export default WatchModal;