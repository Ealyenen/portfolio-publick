import React, { useEffect } from "react";
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import TableViewStore from "../table/stores/table.view-store"
import PrePaymentDataStore from "./stores/prePayment.data.store"
import Prepayment from "./components/Prepayment"
import CreateWriteViewStore from "./components/CreateWrite/store/CreateWriteView.view.store";
import ChangeWriteViewStore from "./components/ChangeWrite/store/ChangeWriteView.view.store";
import SheduleCalendarStore from "./components/calendar/store/sheduleCalendar.store";
import ScheduleCalendar from "./components/calendar/scheduleCalendar";
import CreateWrite from "./components/CreateWrite/CreateWrite"
import ChangeWrite from "./components/ChangeWrite/ChangeWrite"
import WriteLogModal from "./components/ChangeWrite/components/LogModal"
import DeleteDelayDialog from "./components/ChangeWrite/components/DeleteDeleyModal"
import NavStore from "../../_components/Layouts/auth-layout/stores/nav.store";
import EventPopperStore from "./components/calendar/store/eventPopper.store";
import WriteDetailsPopper from "./components/calendar/components/hoveredWritePopover/WriteDetailsPopper";

export const SchedulePage = provider(
  TableViewStore,
  PrePaymentDataStore,
  CreateWriteViewStore,
  ChangeWriteViewStore,
  SheduleCalendarStore,
  EventPopperStore
)(observer(() => {
  const nav = useInstance(NavStore)
  const createWriteViewStore = useInstance(CreateWriteViewStore)
  const changeWriteViewStore = useInstance(ChangeWriteViewStore)
  const prePaymentDataStore = useInstance(PrePaymentDataStore)
  const eventPopperStore = useInstance(EventPopperStore)

  useEffect(() => {
    document.title = 'Yutok CRM'
    nav?.setHeaderTitle('Расписание')
    nav?.setSelectedIndex(0)
  }, [])

  return (
    <>
      <ScheduleCalendar />
      {createWriteViewStore.openModal && <CreateWrite />}
      {changeWriteViewStore.openModal && <ChangeWrite />}
      {changeWriteViewStore.openLogModal && <WriteLogModal />}
      {changeWriteViewStore.openDeleteDelayModal && <DeleteDelayDialog />}
      {prePaymentDataStore.openModal && <Prepayment />}
      {eventPopperStore.getAnchorEl && <WriteDetailsPopper />}
    </>
  )
}));