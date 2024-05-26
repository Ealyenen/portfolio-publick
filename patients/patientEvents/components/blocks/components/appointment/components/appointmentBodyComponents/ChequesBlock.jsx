import React from 'react';
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material"
import AppointmentStore from '../../store/appointment.store';
import ChequeAndChequeUnitTable from './ChequeAndChequeUnitTable';

const ChequesBlock = observer(() => {
    const store = useInstance(AppointmentStore)

    const servicesAmount = () => {
        const amount = store?.getAppointment()?.chequeUnits?.reduce((accumulator, unit) => accumulator + unit.totalPrice, 0,);
        return (amount || amount === 0) ? amount : "отсутствует"
    }

    const chequeAmount = () => {
        const amount = store?.getAppointment()?.activeCheques?.reduce((accumulator, unit) => accumulator + unit.totalChequePrice, 0,);
        return (amount || amount === 0) ? amount : "отсутствует"
    }

    const chequeTableBlock = (cheque) => {
        return (
            <Box sx={{ mt: 2 }}>
                <Box sx={{
                    bgcolor: cheque?.payed ? "primary.lightGreen2" : "primary.white",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    p: { xs: 1, sm: 2 },
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1
                }}>
                    {cheque?.payed ?
                        <Box>
                            <Typography variant="subtitle1" sx={{ display: "inline" }}>
                                Оплаченный чек{" "}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ display: "inline" }}>
                                №{cheque?.pId}
                            </Typography>
                        </Box>
                        :
                        <Box>
                            <Typography variant="subtitle1" sx={{ display: "inline" }}>
                                Чек{" "}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ display: "inline" }}>
                                №{cheque?.id}
                            </Typography>
                        </Box>
                    }
                    <Box >
                        <Typography variant="body1" sx={{ display: "inline" }}>
                            Терминал:{" "}
                        </Typography>
                        <Typography variant="body1" sx={{ display: "inline" }}>
                            {cheque?.terminal?.name || "отсутствует"}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ bgcolor: "primary.white", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Box sx={{ overflowX: "scroll", p: 1 }}>
                        <ChequeAndChequeUnitTable units={cheque?.units} totalAmount={cheque?.totalChequePrice} />
                    </Box>
                    <Box sx={{ p: { xs: 1, sm: 2 } }}>
                        <Typography>Итог: {cheque?.totalChequePrice}{'\u20BD'}</Typography>
                        {cheque?.prepayment && cheque?.prepayment !== "0.00" && <Typography>Списано со счета: {cheque?.prepayment}{'\u20BD'}</Typography>}
                    </Box>
                </Box>

            </Box>
        )
    }

    return (
        <>
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                position: "sticky",
                top: 0,
                bgcolor: "primary.light3",
                pt: 1,
                pb: 1
            }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Сумма услуг:{" "}
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {servicesAmount()}{'\u20BD'}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Сумма чеков:{" "}
                    </Typography>
                    <Typography sx={{ display: "inline" }}>
                        {chequeAmount()}{'\u20BD'}
                    </Typography>
                </Box>
            </Box>
            {store?.getAppointment()?.chequeUnits?.length > 0 &&
                <Box sx={{ mt: 2, bgcolor: "primary.white", borderRadius: 1, p: { xs: 1, sm: 2 } }}>
                    <Typography variant="subtitle1" sx={{ display: "inline" }}>
                        Услуги
                    </Typography>
                    <Box sx={{ overflowX: "scroll" }}>
                        <ChequeAndChequeUnitTable units={store?.getAppointment()?.chequeUnits} />
                    </Box>
                    <Typography>Итог: {servicesAmount()}{'\u20BD'}</Typography>
                </Box>
            }
            {store?.getAppointment()?.activeCheques?.map((cheque) => {
                return (
                    <Box key={cheque.id}>
                        {chequeTableBlock(cheque)}
                    </Box>
                )
            })}

        </>
    );
});

export default ChequesBlock;