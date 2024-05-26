import React from "react";
import { Box, Typography } from "@mui/material"
import { hintList } from "../../../store/sheduleHintList"
import SheduleHintListItem from "./hintListItem";


const SheduleHintList = (() => {

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
            {hintList?.map((block, index) => {
                return (
                    <Box key={index}
                        sx={{
                            display: {
                                xs: block?.onlyDesktop ? "none" : "block",
                                md: block?.onlyMobile ? "none" : "block"
                            }
                        }}>
                        <Typography variant="subtitle1">
                            {block.title}
                        </Typography>
                        {block.hints?.map((hint, index) => {
                            return (
                                <SheduleHintListItem
                                    name={hint.name}
                                    isSign={hint?.isSign}
                                    itemComponent={hint?.sign}
                                    color={hint.color}
                                    circle={hint.circle}
                                    key={`hint-${index}`}
                                />
                            )
                        })}
                    </Box>
                )
            })}
        </Box>

    )

});

export default SheduleHintList