import React from "react";
import {Grid, TextField} from "@mui/material";

export const MessageInput = (
    props: {
        currentMessageId: string | null,
        value: string,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
        currentThreadId: string | null
    }
) => {
    return (
        <Grid item xs={11} paddingRight={3}>
            <TextField label={props.currentMessageId ? "Edit your reply" : "Type a reply"}
                       fullWidth
                       value={props.value}
                       onChange={props.onChange}
                       onKeyUp={props.onKeyUp}
                       disabled={props.currentThreadId === null}
            />
        </Grid>
    );
};