import React, { useEffect } from 'react';
import { useInstance, provider } from "react-ioc";
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import Header from './deptprepaidHeader/Header';
import TableBlock from './deptPrepaidTable/Table';
import DebtPrepaidStore from './store/debtPrepaid.store';
import WatchModalStore from './watchModal/store/watchModal.store';
import WatchModal from './watchModal/watchModal';
import { observer } from 'mobx-react-lite';
import DeleteDialogStore from './deleteDialog/store/deleteDialog.store';
import DeleteDialog from './deleteDialog/DeleteDialog';
import CreteModalStore from './CreateModal/store/createModal.store';
import CreateModal from './CreateModal/CreateModal';
import EditModalStore from './EditModal/store/editModal.store';
import EditModal from './EditModal/EditModal';
import DebtCanceledModalStore from './debtCanceled/store/debtCanceled.store';
import DebtCanceledModal from './debtCanceled/DebtCanceledModal';

const DebtPrepaidPage = provider(DebtPrepaidStore, WatchModalStore, DeleteDialogStore, CreteModalStore, EditModalStore, DebtCanceledModalStore)(observer(() => {
    const nav = useInstance(NavStore)
    const watchModalStore = useInstance(WatchModalStore)
    const deleteDialogStore = useInstance(DeleteDialogStore)
    const creteModalStore = useInstance(CreteModalStore)
    const editModalStore = useInstance(EditModalStore)
    const debtCanceledModalStore = useInstance(DebtCanceledModalStore)

    useEffect(() => {
        document.title = 'Долг аванс'
        nav?.setHeaderTitle('Долг аванс')
        nav?.setSelectedIndex(5)
    }, [nav])

    return (
        <>
            <Header />
            <TableBlock />
            {watchModalStore.getOpenModal() && <WatchModal/>}
            {deleteDialogStore.getOpenModal() && <DeleteDialog/>}
            {creteModalStore.getOpenModal() && <CreateModal/>}
            {editModalStore.getOpenModal() && <EditModal/>}
            {debtCanceledModalStore.getOpenModal() && <DebtCanceledModal/>}
        </>
    );
}));

export default DebtPrepaidPage;