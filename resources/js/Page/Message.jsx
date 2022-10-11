import React, { useState } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

export default function Message() {
    const [currentConversations, setCurrentConversations] = useState(0);

    const [conversations, setConversations] = useState([
        {
            user: "user1",
            messages: [
                {
                    content: "1 - Bonjour je suis un message",
                    timestamp: "2022-10-10T12:45:27+00:00",
                    in: true,
                },
                {
                    content: "1 - Bonjour je suis un autre message",
                    timestamp: "2022-10-10T12:46:36+00:00",
                    in: false,
                },
            ],
        },
        {
            user: "user2",
            messages: [
                {
                    content:
                        "2 - AAAAAA AAAAAA AAAAAA AAAAAA AAAA AAAAAAAA AAAAAA AAAAAA",
                    timestamp: "2022-10-10T12:45:27+00:00",
                    in: true,
                },
                {
                    content: "2 - Bonjour je suis un autre message",
                    timestamp: "2022-10-10T12:46:36+00:00",
                    in: false,
                },
            ],
        },
    ]);

    const [message, setMessage] = useState("Hello");
    const send = () => {
      const newConversations = [...conversations]; 
      newConversations[currentConversations].messages.push({
        content: message, 
        timestamp: new Date().toISOString(),
        in: false 
      });
      setConversations(newConversations);
    }

    return (
        <Container>
            <div>
                {conversations.map((conv, i) => {
                    return (
                        <h3
                            key={conv.user}
                            onClick={() => setCurrentConversations(i)}
                        >
                            {conv.user}
                        </h3>
                    );
                })}
            </div>
            <Grid>
                {/* header */}
                <div
                    style={{
                        backgroundColor: "var(--dark)",
                        color: "var(--light)",
                        display: "flex",
                        textAlign: "center",
                        alignItems: "center",
                        gap: "3%",
                        padding: "3vh",
                    }}
                >

                  {/* Todo: adapt avatar */}
                    <Avatar sx={{ bgcolor: "orange" }}>
                        {conversations[currentConversations].user[0]}
                    </Avatar>
                    {conversations[currentConversations].user}
                </div>
            </Grid>
            {/* content */}

            <Grid sx={{ bgcolor: "white" }}>
                <ul>
                    {conversations[currentConversations].messages.map(
                        (message, i) => {
                            return (
                                <li key={i}>
                                    ({message.timestamp}) - {message.content}
                                </li>
                            );
                        }
                    )}
                </ul>
            </Grid>

            {/* sub */}
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    <TextField
                        multiline
                        placeholder="Send a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        style={{
                            borderColor: "black",
                            backgroundColor: "lightgrey",
                            border: "0",
                            textJustify: "center",

                        }}
                    />
                </div>

                {/* input */}
                <div>
                    <IconButton sx={{ color: "orange" }} onClick={() => send()}>
                        <SendIcon />
                    </IconButton>
                </div>
            </Container>
        </Container>
    );
}
