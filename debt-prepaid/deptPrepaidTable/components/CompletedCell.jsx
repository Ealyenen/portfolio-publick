import React, { useState } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { SurnameAndInitialsString } from '../../../../_common/helpers/nameGenerationString';
import { useInstance } from "react-ioc";
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialogStore from '../../deleteDialog/store/deleteDialog.store';

const CompletedCell = ({ row }) => {
    const deleteDialogStore = useInstance(DeleteDialogStore)
    const user = SurnameAndInitialsString(row?.userModified?.lastName, row?.userModified?.firstName, row?.userModified?.patronymic)
    const date = row?.modified

    const [btnOutput, setBtnOutput] = useState(false)

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        deleteDialogStore.handleOpenModal(row?.id, row?.created, row?.operationTypeShow)
    }

    const deleteBtn = () => {
        return (
            <IconButton onClick={handleDeleteClick} size="small" sx={{ display: { xs: "block", md: btnOutput ? "block" : "none" } }}>
                <DeleteIcon color="primary" />
            </IconButton>
        )
    }
    
    if (row?.status!=="DEBT_ACTIVE" && row?.status!=="ADVANCE_ACTIVE") {
        return (
            <Box
                onMouseEnter={() => setBtnOutput(true)}
                onMouseLeave={() => setBtnOutput(false)}
                sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                    borderLeft: "1px solid",
                    borderColor: "primary.light4",
                    pl: 1,
                    pr: 1,
                    bgcolor: "primary.halfViolet2",
                    height: "100%"
                }}>
                <Box>
                    <Typography variant="body" sx={{ display: "inline", color: "primary.violetDeep" }}>
                        {date ? moment(date).format("DD.MM.YYYY") : "дата отсутствует"}{" "}
                    </Typography>
                    <Typography variant="body" sx={{ display: "inline", color: "primary.violetDeep" }}>
                        {date ? moment(date).format("HH:mm") : "время отсутствует"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <Typography variant="subtitle2" sx={{ display: "block", color: "primary.main", textAlign: "end" }}>
                            {user || "пользователь отсутствует"}
                        </Typography>
                        {row?.status === "DEBT_NOT_REPAYED" ?
                            <Typography variant="body2" sx={{ display: "block", textAlign: "end" }}>
                                долг не возвращен
                            </Typography>

                            :
                            <Typography variant="body2" sx={{ display: "block" }}>
                                {row?.paymentTypeShow ? row.paymentTypeShow : "тип оплаты отсутствует"}
                            </Typography>
                        }
                    </Box>
                    {row?.isActive && deleteBtn()}
                </Box>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: row?.isActive ? "flex" : "none",
                justifyContent: "end",
                width: "100%",
                pr: 1,
                height: "100%"
            }}
            onMouseEnter={() => setBtnOutput(true)}
            onMouseLeave={() => setBtnOutput(false)}
        >
            {row?.isActive && deleteBtn()}
        </Box>
    )

}

export default CompletedCell;