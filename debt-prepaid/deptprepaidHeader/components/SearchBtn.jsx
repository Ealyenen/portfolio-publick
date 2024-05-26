import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import ButtonMain from '../../../../_components/UI/Buttons/ButtonMain';
import DebtPrepaidStore from '../../store/debtPrepaid.store';


const SearchBtn = observer(() => {
    const store = useInstance(DebtPrepaidStore)
    const [btnClicked, setBtnClicked] = useState(false)
    const [timer, setTimer] = useState(0)

    const timerProcess = () => {
        setTimer(5)
        let timer = setInterval(() => setTimer(prev => prev - 1), 1000)
        setTimeout(() => {
            clearInterval(timer)
            setTimer(0)
            setBtnClicked(false)
        }, 5000)
    }

    useEffect(() => {
        if (btnClicked) {
            timerProcess()
        }
    }, [btnClicked])

    async function handleSearchClick() {
        setBtnClicked(true)
        store.resetPagination()
        store.requestAllDebt()
    }

    return (
        <ButtonMain
            disabled={btnClicked}
            title={btnClicked ? `повторить ${timer}` : "Поиск"}
            onClick={handleSearchClick}
        />
    );
});

export default SearchBtn;