import React from "react";
import { Box } from "@mui/material"
import Time from "./components/time";
import Comment from "./components/comment";

const InfoEvent = (({ eventData }) => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "primary.halfYellow",
                borderRadius: 0.2,
                color: "primary.main",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                p: 0,
                pl: 0.5,
                pr: 0.5,
                ':hover':{
                    bgcolor: "primary.orange",
                    color: "primary.white",
                }
            }}>
            <Time timeStart={eventData.timeStart} timeEnd={eventData.timeEnd} />
            <Comment comment={eventData.description} />
        </Box>
    )

});

export default InfoEvent