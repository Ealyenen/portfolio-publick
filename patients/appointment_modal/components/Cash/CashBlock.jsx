import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import CashStore from "../../stores/cash.store";
import CashGrid from "./CashDataGrid";
import CashCheques from "./CashCheques";
import UseBalance from "./UseBalance";

const CashBlock = observer(() => {
    const cashStore = useInstance(CashStore)

    useEffect(() => {
        cashStore.getAllAppointmentData()
        cashStore.getAllChequesData()
        cashStore.getTerminals()
    }, [cashStore])

    return (
        <>
            {cashStore.tableData?.length > 0 &&
                <CashGrid />
            }
            {cashStore.cheques?.length > 0 &&
                <>
                    <UseBalance />
                    <CashCheques />
                </>
            }
        </>
    );
});

export default CashBlock;