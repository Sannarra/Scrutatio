import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";

export default function Chat(props) {
    const [currentConversation, setCurrentConversation] = useState(0);
    const [messages, setMessages] = useState([
        {
            user: "conv1",
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
            user: "conv2",
            messages: [
                {
                    content: "2 - AAAAAA AAAAAA AAAAAA AAAAAA AAAAAA",
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

    return (
        <Container>
            <div>
                {messages.map((conv, i) => {
                    return (
                        <h3
                            key={conv.user}
                            onClick={() => setCurrentConversation(i)}
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
                    <Avatar sx={{ bgcolor: "orange" }}>AA</Avatar>
                    {messages[currentConversation].user}
                </div>
            </Grid>
            {/* content */}

            <Grid sx={{ bgcolor: "white" }}>
                <ul>
                    {messages[currentConversation].messages.map(
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
                        defaultValue="Hello"
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
                    <IconButton
                        sx={{ color: "orange" }}
                        onClick={() => AAAAAAAAA(i)}
                    >
                        <SendIcon />
                    </IconButton>
                </div>
            </Container>
        </Container>
    );
}
