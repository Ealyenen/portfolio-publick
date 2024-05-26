import React, { useEffect, useState } from 'react';
import { useInstance } from "react-ioc";
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import { BALANCES } from './queries/dept.queries';
import { useQuery } from "@apollo/client";
import { FullPageFallbackProgress } from "../../_components/UI/preloaders/FullPageFallbackProgress"
import { Box, Typography, LinearProgress, Pagination } from '@mui/material';
import {
  DataGrid,
  useGridApiContext,
  gridClasses
} from "@mui/x-data-grid";
import NameCell from './components/NameCell';
import BalanceCell from './components/BalanceCell';
import { styled } from '@mui/material/styles';
import BalanceHeader from './components/BalanceHeader';


const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.columnHeader}`]: {
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  [`& .${gridClasses.row}.even`]: {
    '&.Mui-selected': {
      backgroundColor:
        theme.palette.primary.light2,
      '&:hover, &.Mui-hovered': {
        backgroundColor:
          theme.palette.primary.light2,
        '@media (hover: none)': {
          backgroundColor:
            theme.palette.primary.light2,
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.primary.light3,
    '&:hover, &.Mui-hovered': {
      backgroundColor: theme.palette.primary.light2,
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor:
        theme.palette.primary.light2,
      '&:hover, &.Mui-hovered': {
        backgroundColor:
          theme.palette.primary.light2,
        '@media (hover: none)': {
          backgroundColor:
            theme.palette.primary.light2,
        },
      },
    },
  },
}));


const DeptPage = () => {
  const nav = useInstance(NavStore)
  const [rows, setRows] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [sortModel, setSortModel] = useState("desc")
  const [totalItems, setTotalItems] = useState(10)
  const itemsPerPage = 10

  useEffect(() => {
    document.title = 'Баланс'
    nav?.setHeaderTitle('Баланс')
    nav?.setSelectedIndex(4)
  }, [nav])

  const { data, loading, error, refetch } = useQuery(BALANCES, {
    variables: {
      isActive: true,
      isPatient: true,
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
      ordering: `balance__value,${sortModel}`
    }
  })

  useEffect(() => {
    setRows(data?.balancePatients?.results || [])
    if (typeof (data?.balancePatients.totalCount) === "number") {
      setTotalItems(data?.balancePatients.totalCount)
    }
  }, [data])

  if (loading) {
    return (
      <FullPageFallbackProgress />
    )
  }

  if (error) {
    return (
      <Box>
        <Typography>
          Возникла ошибка
        </Typography>
      </Box>
    )
  }

  const handleSortChange = () => {
    const newModel = sortModel === "desc" ? "asc" : "desc"
    setSortModel(newModel);
    refetch({
      isActive: true,
      isPatient: true,
      limit: itemsPerPage,
      offset: currentPage * itemsPerPage,
      ordering: `balance__value,${newModel ? newModel : "desc"}`
    });
  };



  const handlePageChange = (pageIndex) => {
    if ((pageIndex || pageIndex === 0) && pageIndex !== currentPage) {
      setCurrentPage(pageIndex)
      refetch({
        isActive: true,
        isPatient: true,
        limit: itemsPerPage,
        offset: pageIndex * itemsPerPage,
        ordering: `balance__value,${sortModel}`
      });
    }
  };

  function CustomPagination() {
    const apiRef = useGridApiContext()
    const pageCount = Math.ceil(totalItems / itemsPerPage)

    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={currentPage + 1}
        onChange={(event, value) => {
          apiRef.current.setPage(value - 1)
          handlePageChange(value - 1)
        }}
      />
    );
  }

  const columns = [
    {
      field: 'lastName',
      headerName: 'ФИО',
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <NameCell rowData={params.row} />
        )
      }
    },
    {
      field: 'balance',
      headerName: 'Баланс',
      type: 'number',
      width: 110,
      sortable: false,
      renderCell: (params) => {
        return (
          <BalanceCell balance={params.row.balance} />
        )
      },
      renderHeader: () => {
        return (
          <BalanceHeader sortModel={sortModel} sortFunction={handleSortChange} />
        )
      },
    },
  ];


  return (
    <Box sx={{ width: '100%' }}>
      <StripedDataGrid
        rows={rows}
        columns={columns}
        pageSize={itemsPerPage}
        components={{
          LoadingOverlay: LinearProgress,
          Pagination: CustomPagination,
        }}
        autoHeight
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        disableColumnSelector
        disableColumnMenu
        disableColumnSort
        loading={loading}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </Box>
  );
};

export default DeptPage;