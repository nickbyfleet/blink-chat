import React, {useEffect, useState} from 'react';

import {Divider, Grid, Toolbar, Typography} from "@mui/material";
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import {Send} from "@mui/icons-material";
import Thread from "./app/types/Thread";
import Message from "./app/types/Message";
import {MessageInput} from "./app/components/MessageInput";
import {MessageCard} from "./app/components/MessageCard";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import EditMode from "./app/types/EditMode";
import './App.css';
import {loadMessages} from "./app/loadMessages";
import {scrollToBottom} from "./app/scrollToBottom";
import {sortThreads} from "./app/sortThreadList";
import {ThreadButton} from "./app/components/ThreadButton";

const App = () => {

    /** 1. State things **/
    const [threads, setThreads] = useState<{ [key: string]: Thread }>({});
    const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
    const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [editMode, setEditMode] = useState<EditMode>("NEW");

    /** 2. Initial data loading **/
    useEffect(() => {
        loadMessages().then((threads) => {
            setThreads(threads);
        });
    }, [])

    /** 3. Functions relating to adding and editing messages **/
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(event.target.value);

    const addEditMessage = () => {
        if (!currentThreadId) {
            return;
        }

        switch (editMode) {
            case "NEW":
                threads[currentThreadId].messages.push(
                    new Message(uuidv4(), currentMessage, moment().format(), true)
                );

                setTimeout(() => {
                    scrollToBottom(document.getElementById('messageArea'));
                }, 500);

                break;

            case "EDIT":
                const message = threads[currentThreadId].messages.find((message: Message) => {
                    return message.id === currentMessageId;
                });

                if (message !== undefined) {
                    message.text = currentMessage;
                }

                setEditMode("NEW");

                break;
        }

        setCurrentMessageId(null);
        setCurrentMessage('');
    };

    const addEditMessageOnPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // creates a new message or updates it by pressing the enter key
        if (event.keyCode === 13) {
            addEditMessage();
        }
    };

    useEffect(() => {
        if (!currentThreadId || !currentMessageId) {
            return;
        }

        const message = threads[currentThreadId].messages.find((message: Message) => {
            return message.id === currentMessageId;
        });

        if (message !== undefined) {
            setEditMode("EDIT");
            setCurrentMessage(message.text);
        }

    }, [currentMessageId, currentThreadId, threads]);

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Toolbar/>
                    <Divider/>
                    <List>
                        {Object.values(threads).sort(sortThreads).map((thread, index) => (
                            <ThreadButton key={index} onClick={() => {
                                setCurrentThreadId(thread.id);
                            }} thread={thread}/>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={9} className="chatSection">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" paddingRight={5}>
                            Messages
                        </Typography>
                        <Typography noWrap component="div">
                            {currentThreadId ? threads[currentThreadId].name : ''}
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <Grid item xs={9} paddingTop={5}>
                        <List id="messageArea">
                            {currentThreadId ? threads[currentThreadId].messages.map((message, index) => (
                                <MessageCard message={message} setCurrentMessageId={setCurrentMessageId} key={index}/>
                            )) : ''}
                        </List>
                        <Divider/>
                        <Grid container style={{padding: '20px'}}>
                            <MessageInput currentMessageId={currentMessageId} value={currentMessage}
                                          onChange={handleChange} onKeyUp={addEditMessageOnPressEnter}
                                          currentThreadId={currentThreadId}/>
                            <Button onClick={addEditMessage}>
                                <Send/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;