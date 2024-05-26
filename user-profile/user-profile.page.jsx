import React, { useEffect } from 'react';
import { useInstance } from "react-ioc";
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import GeneralInfo from './components/generalInfo/generalInfo';
import PasswordChange from './components/changePassword/changePassword';

const UserProfilePage = () => {
  const nav = useInstance(NavStore)

  useEffect(() => {
    document.title = 'Мой профиль'
    nav?.setHeaderTitle('Мой профиль')
    nav?.setSelectedIndex(-1)
  }, [nav])

  return (
    <>
      <GeneralInfo />
      <PasswordChange/>
    </>
  );
};

export default UserProfilePage;