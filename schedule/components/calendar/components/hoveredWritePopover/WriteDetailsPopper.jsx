import React, { useEffect, useMemo } from "react";
import { Typography, Popper, Box, Paper } from "@mui/material"
import { useInstance } from "react-ioc";
import { observer } from "mobx-react-lite";
import EventPopoverStore from "../../store/eventPopper.store";
import { getNewPatientIconColor } from "../../store/schedulePatientRecordColor"

const WriteDetailsPopper = observer(() => {

    const eventPopoverStore = useInstance(EventPopoverStore)
    const anchorEl = eventPopoverStore.getAnchorEl

    const time = eventPopoverStore.getTime(),
        comment = eventPopoverStore.getComment(),
        isInfo = eventPopoverStore.getIsInfo(),
        name = eventPopoverStore.getPatientFullName(),
        age = eventPopoverStore.getPatientAge(),
        source = eventPopoverStore.getPatientNewSource(),
        balance = eventPopoverStore.getPatientBalance(),
        isPrepaidService = eventPopoverStore.getIsPrepaidService();

    return (
        <>
            <Popper
                id={anchorEl ? "shedule-popover-hint" : undefined}
                open={!!anchorEl}
                anchorEl={anchorEl}
                sx={{ zIndex: 5 }}
                placement="bottom-start"
            >
                <Paper sx={{ p: 1, maxWidth: {xs: 300, sm: 320, md: 350, lg: 400} }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        {time ?
                            <Typography sx={{ width: 110 }}>
                                {time}
                            </Typography>
                            :
                            ""
                        }

                        <Box sx={{ flex: 1, textAlign: "right" }}>
                            {isInfo ?
                                "Информационная запись"
                                :
                                <>
                                    <Typography sx={{ display: "inline" }}>
                                        {name ? name : ""} {age ? ` ${age}` : ""}
                                    </Typography>
                                    {source ?
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                display: "inline",
                                                color: getNewPatientIconColor(source),
                                            }}
                                        >
                                            {" "}{source}
                                        </Typography>
                                        : ""
                                    }
                                    {balance ?
                                        <Typography>
                                            Баланс: {balance}{'\u20BD'}
                                        </Typography>
                                        : ""
                                    }
                                    {isPrepaidService ?
                                        <Typography sx={{color: "primary.lightred"}}>
                                            По предоплате
                                        </Typography>
                                        : ""
                                    }
                                </>
                            }
                        </Box>

                    </Box>

                    {comment ?
                        <Typography sx={{ mt: 1 }}>
                            {comment}
                        </Typography>
                        : ""}
                </Paper>
            </Popper >

        </>
    )

});

export default WriteDetailsPopper