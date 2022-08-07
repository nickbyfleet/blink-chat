import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MessageIcon from "@mui/icons-material/Message";
import ListItemText from "@mui/material/ListItemText";
import {ListItem} from "@mui/material";
import React from "react";
import Thread from "../types/Thread";

export const ThreadButton = (props: { onClick: () => void, thread: Thread }) => {
    return <ListItem disablePadding>
        <ListItemButton onClick={props.onClick}>
            <ListItemIcon>
                <MessageIcon/>
            </ListItemIcon>
            <ListItemText primary={props.thread.name} secondary={props.thread.formattedDate()}/>
        </ListItemButton>
    </ListItem>;
}