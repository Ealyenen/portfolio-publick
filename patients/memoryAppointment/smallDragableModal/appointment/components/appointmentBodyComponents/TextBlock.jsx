import React from 'react';
import { observer } from "mobx-react-lite";
import { Box, Typography, IconButton } from "@mui/material"
import htmlToBlock from '../../../../../../../_common/helpers/htmlToBlock';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButtonTimered from '../../../../../../../_components/UI/Buttons/IconButtonTimered';
import { handleCopyToClipBoard } from '../../../../../../../_common/helpers/copyToClipboard';

const TextBlock = observer(({ title = "", text = "", borderBottom = true }) => {

    //below is text converting functions for short text
    function convertNodeToText(node) {
        let text = '';

        if (node.nodeType === Node.TEXT_NODE) {
            text = node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const child of node.childNodes) {
                text += convertNodeToText(child);
            }

            if (node.nodeName === 'P' || node.nodeName === 'DIV' || node.nodeName === 'BR') {
                text += '\n'; // br for block elements
            } else if (node.nodeName === 'LI') {
                text = ' ' + text + '\n'; // list format markers
            }
        }

        return text;
    }


    function extractAndTrimText(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        let textContent = convertNodeToText(doc.body);

        // delete extra simbols and tabs
        textContent = textContent.replace(/\s+/g, ' ').trim();

        return textContent.length > 100 ? textContent.substring(0, 100) : textContent;
    }


    const handleCopyText = () => {
        handleCopyToClipBoard(text)
    }

    return (
        <Box
            sx={{
                borderBottom: borderBottom ? "1px solid" : "none",
                borderColor: "primary.light2",
                p: 2,
                ml: 1,
                mr: 1,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ display: "inline" }} variant="subtitle1">
                    {title && title}:{" "}
                </Typography>
                <IconButtonTimered
                    onClick={()=>handleCopyText()}
                    icon={<ContentCopyIcon />}
                    showSeconds={false}
                    timerSeconds={2}
                />
            </Box>
            <Box
                sx={{
                    p: 1,
                    pl: 3,
                    bgcolor: "primary.white",
                    border: "1px solid",
                    borderColor: "primary.light4",
                    borderRadius: 1,
                    wordWrap: "break-word",
                    mt: 2
                }}
            >{text && htmlToBlock(text)}
            </Box>
        </Box>
    );
});

export default TextBlock;