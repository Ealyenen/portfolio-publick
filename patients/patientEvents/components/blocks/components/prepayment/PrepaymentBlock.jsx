import React, { useEffect } from "react";
import {
    useMediaQuery,
    useTheme
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { provider, useInstance } from "react-ioc";
import StorePrepayment from "./store/PrepaymentStore";
import Prepayment from "./components/Prepayment";
import AddIcon from "@mui/icons-material/Add"
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import PrepaymentHeader from "./components/PrepaymentHeader";
import PrepaymentMobileHeader from "./components/PrepaymentMobileHeader";
import PrepaymentMobile from "./components/PrepaymentMobile";
import PrepaymentComment from "./components/PrepaymentComment";


const PrepaymentBlock = provider(StorePrepayment)(observer((prepayment) => {
    const storePrepayment = useInstance(StorePrepayment)


    useEffect(() => {
        storePrepayment.setPrepayment(prepayment.prepayment)
    }, [storePrepayment,prepayment.prepayment])

    const mainTheme = useTheme();
    const mobileBreakpoint = useMediaQuery(mainTheme.breakpoints.down("sm"));

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: theme.palette.primary.light2,
        flexDirection: 'row-reverse',
        paddingTop: 0,
        marginTop: 0,
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
            marginTop: 0,
            marginBottom: 0
        },
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: mobileBreakpoint ? theme.spacing(1) : theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        backgroundColor: theme.palette.primary.light3,
    }))

    if (storePrepayment?.prepayment) {
        return (
            <>
                <Accordion sx={{ width: "100%" }}>
                    <AccordionSummary
                        expandIcon={<AddIcon />}
                    >
                        {mobileBreakpoint ?
                            <PrepaymentMobileHeader />
                            :
                            <PrepaymentHeader />
                        }
                    </AccordionSummary>

                    <AccordionDetails>
                        {mobileBreakpoint ?
                            <PrepaymentMobile />
                            :
                            <Prepayment />
                        }
                        {storePrepayment?.prepayment?.comment?.length > 0 &&
                            <PrepaymentComment />
                        }
                    </AccordionDetails>
                </Accordion>
            </>
        );
    }


}));

export default PrepaymentBlock;