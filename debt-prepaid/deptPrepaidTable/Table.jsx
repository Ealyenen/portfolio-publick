import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import { Box, Typography, LinearProgress, Pagination, IconButton } from "@mui/material";
import { observer } from 'mobx-react-lite';
import DebtPrepaidStore from '../store/debtPrepaid.store';
import {
    DataGrid,
    useGridApiContext,
    gridClasses,
} from "@mui/x-data-grid";
import { FullPageFallbackProgress } from '../../../_components/UI/preloaders/FullPageFallbackProgress';
import moment from "moment"
import { SurnameAndInitialsString } from '../../../_common/helpers/nameGenerationString';
import NameCell from './components/NameCell';
import CompletedCell from './components/CompletedCell';
import { styled } from '@mui/material/styles';
import WatchModalStore from '../watchModal/store/watchModal.store';
import EditModalStore from '../EditModal/store/editModal.store';
import DebtCanceledModalStore from '../debtCanceled/store/debtCanceled.store';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 'none',
    '& .deleted': {
        backgroundColor: theme.palette.primary.halfViolet,
        opacity: 0.5,
        '&:hover': {
            backgroundColor: theme.palette.primary.halfViolet,
            opacity: 0.5,
        },
    },
    '& .active-debt': {
        backgroundColor: theme.palette.primary.lightred4,
        '&:hover': {
            backgroundColor: theme.palette.primary.lightred2,
        },
    },
    '& .not-returned-debt': {
        backgroundColor: theme.palette.primary.yellow,
        '&:hover': {
            backgroundColor: theme.palette.primary.yellow2,
        },
    },
    '& .active-advance': {
        backgroundColor: theme.palette.primary.lightblue,
        '&:hover': {
            backgroundColor: theme.palette.primary.lightblue2,
        },
    },
    [`& .${gridClasses.columnHeader}`]: {
        '&:focus': {
            outline: 'none',
            boxShadow: 'none',
        },
    },
    '& .MuiDataGrid-cell:focus': {
        outline: 'none',
    },
    '& .MuiDataGrid-cell': {
        outline: 'none',
        padding: 0
    },
}));

const TableBlock = observer(() => {
    const store = useInstance(DebtPrepaidStore)
    const watchModalStore = useInstance(WatchModalStore)
    const editModalStore = useInstance(EditModalStore)
    const debtCanceledModalStore = useInstance(DebtCanceledModalStore)

    useEffect(() => {
        store.requestAllDebt()
    }, [])

    const handleOpenRowClick = (row) => {
        if (row?.row?.isClosed || !row?.row?.isActive) {
            watchModalStore.setOpenModal(true)
            watchModalStore.setData(row?.row)
        }else if (row?.row?.status==="DEBT_NOT_REPAYED"){
            debtCanceledModalStore.setOpenModal(true)
            debtCanceledModalStore.setData(row?.row)
        }else {
            editModalStore.setOpenModal(true)
            editModalStore.setData(row?.row)
        }
    }

    const handlePageChange = (pageIndex) => {
        if ((pageIndex || pageIndex === 0) && pageIndex !== store.getCurrentPage()) {
            store.setCurrentPage(pageIndex)
            store.setOffset(pageIndex * store.getLimit())
            store.requestAllDebt()
        }
    };

    function CustomPagination() {
        const apiRef = useGridApiContext()
        const pageCount = store.pagesQty

        return (
            <Pagination
                color="primary"
                count={pageCount}
                page={store.getCurrentPage() + 1}
                onChange={(event, value) => {
                    apiRef.current.setPage(value - 1)
                    handlePageChange(value - 1)
                }}
            />
        );
    }
    const columns = [
        {
            field: 'created',
            headerName: 'Дата',
            minWidth: 140,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box sx={{ pl: 1 }}>
                        {params.value ? moment(params.value).format("DD.MM.YYYY HH:mm") : "отсутствует"}
                    </Box>
                )
            }
        },
        {
            field: 'operationTypeShow',
            headerName: 'Тип',
            width: 100,
            sortable: false,
        },
        {
            field: 'patient.account',
            headerName: 'Текущий счет',
            width: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box>
                        {params.row.patient.account}
                    </Box>
                )
            }
        },
        {
            field: 'patient',
            headerName: 'Пациент',
            minWidth: 300,
            sortable: false,
            flex: 1,
            renderCell: (params) => { return (<NameCell patient={params.value} />) }
        },
        {
            field: 'amount',
            headerName: 'Сумма',
            width: 100,
            sortable: false,
        },
        {
            field: 'userCreated',
            headerName: 'Пользователь',
            width: 160,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box>
                        {params?.value?.lastName ? SurnameAndInitialsString(params?.value?.lastName, params?.value?.firstName, params?.value?.patronymic) : "отсутствует"}
                    </Box>
                )
            }
        },
        {
            field: 'id',
            headerName: 'Списание (дата и пользователь)',
            width: 340,
            sortable: false,
            renderCell: (params) => {
                return (
                    <CompletedCell row={params?.row} />
                )
            }
        },
    ];

    return (
        <>
            {store.getLoading() && <FullPageFallbackProgress />}
            {store.getError() &&
                <Typography sx={{ mt: 8, textAlign: "center" }} variant="h5">
                    Возникла ошибка при загрузке данных
                </Typography>
            }
            {!store.getLoading() && !store.getError() && store.debts?.length === 0 &&
                <Typography sx={{ mt: 8, textAlign: "center" }} variant="h5">
                    Нет подходящих результатов, уточните фильтры
                </Typography>
            }
            {!store.getLoading() && !store.getError() && store.debts?.length > 0 &&
                <Box sx={{
                    width: '100%',
                    mt: 5,
                }}>
                    <StripedDataGrid
                        rows={store.debts || []}
                        columns={columns}
                        onRowClick={handleOpenRowClick}
                        disableColumnSort
                        disableColumnMenu
                        disableColumnSelector
                        hideFooterSelectedRowCount
                        disableRowSelectionOnClick
                        disableSelectionOnClick
                        autoHeight
                        rowMouseEnter={() => console.log("test")}
                        getRowHeight={() => 50}
                        getRowClassName={(params) => {
                            if (params?.row?.isActive) {
                                switch (params?.row?.status) {
                                    case 'DEBT_ACTIVE':
                                        return 'active-debt'
                                    case 'DEBT_NOT_REPAYED':
                                        return 'not-returned-debt'
                                    case 'ADVANCE_ACTIVE':
                                        return 'active-advance'
                                    default: return ''
                                }
                            } else {
                                return 'deleted'
                            }
                        }
                        }

                        components={{
                            LoadingOverlay: LinearProgress,
                            Pagination: CustomPagination,
                        }}
                        pageSize={store.getLimit()}
                    />
                </Box>
            }
        </>
    );
});

export default TableBlock;