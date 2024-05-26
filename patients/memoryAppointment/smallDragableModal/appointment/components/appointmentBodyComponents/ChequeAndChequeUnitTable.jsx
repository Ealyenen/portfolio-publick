import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material"

const ChequeAndChequeUnitTable = ({ units = null, totalAmount = null }) => {

    const sum = totalAmount

    return (
        <>
            <Table aria-label="simple table">
                <TableHead sx={{ bgcolor: "inherit" }}>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <Typography variant="caption">
                                Наименование
                            </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: 45 }}>
                            <Typography variant="caption" sx={{ lineHeight: 1 }}>
                                Кол-во
                            </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: 60 }}>
                            <Typography variant="caption">
                                Цена
                            </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: 60 }}>
                            <Typography variant="caption">
                                Скидка
                            </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: 60 }}>
                            <Typography variant="caption">
                                Итог
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {units?.map((row, index) => {

                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ mr: 2, pr: 1, }}
                                    align="center">
                                    <Typography
                                        component={"span"}
                                        sx={{
                                            display: "inline-block",
                                            fontSize: "7px",
                                            width: "12px",
                                            height: "12px",
                                            textAlign: "center",
                                            borderRadius: "50%",
                                            background: `#${row?.service?.color}`,
                                            verticalAlign: "middle",
                                        }} />
                                </TableCell>
                                <TableCell sx={{ pl: 0, pr: 2 }} scope="row">
                                    <Box>
                                        <Typography sx={{color: "primary.main"}} variant="subtitle2">
                                            {row?.service?.parent?.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {row?.service?.name}
                                        </Typography>
                                        <Typography variant="caption">
                                            {row?.additionalComment ? `- ${row?.additionalComment}` : ""}
                                        </Typography>
                                        <Typography variant="caption">
                                            {row?.comment ? `- ${row?.comment}` : ""}
                                        </Typography>

                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="caption">
                                        {row?.amount}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="caption">
                                        {row?.price}{'\u20BD'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="caption">
                                        {row?.priceDiscount && `${row?.priceDiscount}${'\u20BD'} (${row?.percentDiscount}%)`}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="caption">
                                        {row?.totalPrice}{'\u20BD'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }

                </TableBody>
            </Table>

        </>
    );
};

export default ChequeAndChequeUnitTable;