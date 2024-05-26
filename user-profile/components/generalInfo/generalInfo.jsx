import React, { useEffect } from 'react';
import { Typography, Box } from "@mui/material";
import { useInstance } from "react-ioc";
import { USER } from '../../query/user.query';
import { useQuery } from "@apollo/client";
import authStore from '../../../../_common/stores/auth.store';
import { FullPageFallbackProgress } from '../../../../_components/UI/preloaders/FullPageFallbackProgress';
import StoreGeneralInfo from './store/generalnfo.store';
import GeneralViewStore from './store/generalInfo.view.store';
import { provider } from "react-ioc";
import Phone from './components/phone';
import Position from './components/position';
import Birthday from './components/birthday/birthday';
import Name from './components/name/name';

const GeneralInfo = provider(StoreGeneralInfo, GeneralViewStore)(() => {
  const storeGeneralInfo = useInstance(StoreGeneralInfo)

  const { data, loading, error } = useQuery(USER, {
    variables: {
      email: authStore.user.email
    }
  })

  useEffect(() => {
    if (data && !error && !loading) {
      storeGeneralInfo.setAllProfileData(data.userProfile)
    }
  }, [data])

  if (loading) {
    return (
      <Box>
        <Typography variant="h5">
          Общая информация...
        </Typography>
        <FullPageFallbackProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h5">
          Общая информация
        </Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Возникла ошибка при попытке загрузки данных
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h5">
        Общая информация
      </Typography>
      <Name />
      <Birthday />
      <Phone />
      <Position />
    </Box>
  );
});

export default GeneralInfo;