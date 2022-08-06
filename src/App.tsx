import React from 'react';
import {Divider, Grid, ListItem, TextField, Toolbar, Typography} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import {Send} from "@mui/icons-material";
import './App.css';

function App() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Toolbar/>
                    <Divider/>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <MessageIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={text} secondary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={8} className="chatSection">
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" paddingRight={5}>
                            Messages
                        </Typography>
                        <Typography noWrap component="div">
                            Conversation Name
                        </Typography>
                    </Toolbar>
                    <Divider/>
                    <Grid item xs={9} paddingTop={5}>
                        <List className="messageArea">
                            <ListItem key="1">
                                <Grid container className="received">
                                    <Grid item xs={12}>
                                        <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText className="" secondary="09:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="2">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText className=""
                                                      primary="Hey, Iam Good! What about you ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText className="" secondary="09:31"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText className=""
                                                      primary="Cool. i am good, let's catch up!"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText className="" secondary="10:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                        <Divider/>
                        <Grid container style={{padding: '20px'}}>
                            <Grid item xs={11} paddingRight={3}>
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth/>
                            </Grid>
                                <Button>
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
