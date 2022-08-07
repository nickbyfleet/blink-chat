import React, {useEffect, useState} from 'react';

import {Divider, Grid, ListItem, TextField, Toolbar, Typography} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import {Send} from "@mui/icons-material";
import Thread from "./app/types/Thread";
import Message from "./app/types/Message";
import {MessageCard} from "./app/components/MessageCard";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import EditMode from "./app/types/EditMode";
import './App.css';

const App = () => {

    /** 1. State things **/
    const [threads, setThreads] = useState<{ [key: string]: Thread }>({});
    const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
    const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [editMode, setEditMode] = useState<EditMode>("NEW");

    /** 2. Initial data loading **/
    const loadMessages = () => {
        fetch('messages.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                return response.json();
            }).then((json) => {
            const threads: { [index: string]: Thread } = {};
            json.forEach((thread: { id: string; name: string; last_updated: string; messages: any[]; }) => {
                threads[thread.id] = new Thread(thread.id, thread.name, thread.last_updated, thread.messages.map((message) => {
                    return new Message(message.id, message.text, message.last_updated);
                }));
            });
            setThreads(threads);
        });
    }

    useEffect(() => {
        loadMessages()
    }, [])

    /** 3. Functions relating to adding and editing messages **/
    const scrollToBottom = (node: HTMLElement | null) => {
        if (node === null) {
            return;
        }

        node.scrollTop = node.scrollHeight;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(event.target.value);

    const addEditMessage = () => {
        if (!currentThreadId) {
            return;
        }

        switch (editMode) {
            case "NEW":
                if (!currentMessage) {
                    return;
                }

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
                        {Object.values(threads).sort((a: Thread, b: Thread) => {
                            if (a.lastUpdated.isAfter(b.lastUpdated)) {
                                return -1;
                            } else if (a.lastUpdated.isBefore(b.lastUpdated)) {
                                return 1;
                            }
                            return 0;
                        }).map((thread, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => {
                                    setCurrentThreadId(thread.id);
                                }}>
                                    <ListItemIcon>
                                        <MessageIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={thread.name} secondary={thread.formattedDate()}/>
                                </ListItemButton>
                            </ListItem>
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
                            <Grid item xs={11} paddingRight={3}>
                                <TextField label={currentMessageId ? "Edit your reply" : "Type a reply"}
                                           fullWidth value={currentMessage}
                                           onChange={handleChange}
                                           onKeyUp={addEditMessageOnPressEnter}
                                           disabled={currentThreadId === null}/>
                            </Grid>
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