import React, { useEffect } from 'react';
import { Box, Button, LinearProgress, Link, Pagination, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Add } from "@mui/icons-material";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";
import { PATIENTS_ROUTE } from "../../_common/router/routes";
import { observer } from "mobx-react-lite";
import { provider, useInstance } from "react-ioc";
import StoreNewPatientCardModal from "./new_patient_card/stores/store";
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import { useQuery } from "@apollo/client";
import { SEARCH_PATIENT } from "./_queries/patients.queries";
import { FullPageFallbackProgress } from "../../_components/UI/preloaders/FullPageFallbackProgress";
import moment from "moment";
import PersonIcon from '@mui/icons-material/Person';
import AddNewPatientCardModal from "./new_patient_card/AddNewPatientCardModal";
import StorePatientDiseases from "./new_patient_card/stores/storePatientDiseases";
import { NameAndPatronymicString } from '../../_common/helpers/nameGenerationString';


// function calculateAge(birthday) {
//   if (birthday) {
//     Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)
//     return Math.floor((new Date() - new Date(birthday).getTime()) / 3.15576e+10)
//   } else {
//     return '--'
//   }
// }






function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);


  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter placeholder={'фио или email ...'} />
    </Box>
  );
}

const PatientsPage = provider(StoreNewPatientCardModal, StorePatientDiseases)(observer(() => {
  const storeModal = useInstance(StoreNewPatientCardModal)
  const nav = useInstance(NavStore)
  const disStore = useInstance(StorePatientDiseases)

  const { pathname } = useLocation();

  const [sortModel, setSortModel] = React.useState([
    {
      field: 'created',
      sort: 'desc',
    },
  ]);



  const columns = [
    {
      field: 'lastName', headerName: 'ФИО', flex: 0.1, renderCell: (params) => (
        <Link component={RouterLink} to={`${PATIENTS_ROUTE}/${params.row.id}`}
          state={{ isRedirectFromPatientsPage: pathname }}
          sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 1, color: params.row.isPatient ? 'gray' : 'lightgray' }} />
          <Typography 
          // sx={{ textTransform: params.row.isPatient && "uppercase" }}
          variant={params.row.isPatient && "button"}
          >
            {params.value}
            </Typography>
            {"\u00A0"}{NameAndPatronymicString(params.row?.firstName, params.row?.patronymic)}
        </Link>
      ),
    },
    { //params?.value ? `${moment(params?.value).format("DD.MM.YYYY")} (${params?.row.firstName})` : 'нет данных'
      field: 'formatBirthday', headerName: 'Дата рождения', flex: 0.1, renderCell: params => {
        if (params?.value) return (`${params?.value} (${params?.row.age})`)
        else return ('нет данных')
      }
    },
    // {
    //   field: 'email', headerName: 'E-mail', flex: 0.1, valueFormatter: params =>
    //     params?.value ? params?.value : 'нет данных'
    // },
    {
      field: 'created', headerName: 'Дата регистрации', width: 150, align: 'right', valueFormatter: params =>
        moment(params?.value).format("DD.MM.YYYY HH:mm "),
    },
  ];

  useEffect(() => {
    document.title = 'Пациенты'
    nav?.setHeaderTitle('Пациенты')
    nav?.setSelectedIndex(1)
    disStore.setDiseasesList()

    // localStorage.setItem('appointmentsList', JSON.stringify([]));
  }, [nav])

  const {data, loading, refetch} = useQuery(SEARCH_PATIENT, {
    variables: {q: "", isActive: true}
  })

  if (loading) {
    return (<FullPageFallbackProgress />)
  }

  const onFilterChange = (filterModel) => {
    //window.location.reload()
    refetch({ q: String(filterModel.quickFilterValues) })
  }


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant={'h5'}>Поиск пациента</Typography>
        </Box>
        <Button variant="outlined" size="small" onClick={() => {
          storeModal.setOpenModal(true)

        }}>
          <Typography sx={{ mr: 1, display: { xs: 'none', md: 'block' } }}>Создать новую карту</Typography>
          <Add />
        </Button>
      </Box>
      <Box id={'RRRR'} sx={{ mt: 2, height: '70vh' }}>
        <DataGrid
          //autoHeight
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          rows={data.searchPatient}
          columns={columns}
          // checkboxSelection
          pagination
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{
            LoadingOverlay: LinearProgress,
            Pagination: CustomPagination,
            Toolbar: QuickSearchToolbar
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          loading={loading}
          filterMode="server"
          onFilterModelChange={onFilterChange}
        //{...data.searchPatient}
        />
      </Box>
      {/*{storeModal.openModal && <NewPatientCardModal/>}*/}
      {storeModal.openModal && <AddNewPatientCardModal />}
    </>
  );
}));

export default PatientsPage;