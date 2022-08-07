import {Grid, ListItem} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import Message from "../types/Message";
import Button from '@mui/material/Button';

export const MessageCard = (props: {message: Message, setCurrentMessageId: (id: string) => void}) => {
    return(
        <ListItem key={props.message.id}>
            <Grid container className={props.message.sentByCurrentUser ? "received" : ""}>
                <Grid item xs={12}>
                    <ListItemText secondary={props.message.formattedDate()}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText primary={props.message.text}></ListItemText>
                </Grid>
                { props.message.sentByCurrentUser ? (
                    <Grid item xs={12}>
                        <Button size="small" onClick={() => {props.setCurrentMessageId(props.message.id); }}>Edit Message</Button>
                    </Grid>
                ) : ''}

            </Grid>
        </ListItem>
    );
}