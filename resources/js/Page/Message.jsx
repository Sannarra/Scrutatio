import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function Message(props) {
    // State used for storing conversation names and ids
    const [conversations, setConversations] = useState(
        props.data.conversations || []
    );
    // State used for storing the current conversation id
    const [currentConversation, setCurrentConversation] = useState(null);
    // State used for storing the current conversation's messages
    const [messages, setMessages] = useState([]);

    // Function to fetch all messages for a conversation
    function getMessages() {
        if (currentConversation == null) return;
        fetch(
            "/api/applications/" +
                currentConversation +
                "/messages?include_sender_name",
            {
                method: "get",
            }
        )
            .then((res) => res.json())
            .then((res) => {
                setMessages(res);
            });
    }

    // Effect to fetch all messages for a conversation when the current conversation changes
    useEffect(() => {
        getMessages();
    }, [currentConversation]);

    const [message, setMessage] = useState("Hello");

    const send = () => {
        fetch("/applications/" + currentConversation + "/send-message", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": props.csrf_token,
            },
            body: JSON.stringify({
                message: message,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((json) => {
                        console.log(json);
                    });
                } else {
                    console.log(res.status);
                    console.log(res.statusText);
                }
                getMessages();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <div>
                {
                    // Display a list of all conversations with a button to select each conversation
                    conversations.map((conv) => {
                        return (
                            <Button
                                sx={{ m: 1 }}
                                variant="contained"
                                key={conv.id}
                                onClick={() => setCurrentConversation(conv.id)}
                            >
                                {conv.title}
                            </Button>
                        );
                    })
                }
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
                    {currentConversation != null ? (
                        <Avatar sx={{ bgcolor: "orange" }}>
                            {
                                conversations.filter(
                                    (conv) => conv.id == currentConversation
                                )[0]?.title[0]
                            }
                        </Avatar>
                    ) : null}
                    {
                        conversations.filter(
                            (conv) => conv.id == currentConversation
                        )[0]?.title
                    }
                </div>
            </Grid>
            {/* content */}

            <Grid sx={{ bgcolor: "white" }}>
                <ul>
                    {currentConversation === null ? (
                        <></>
                    ) : messages.length === 0 ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "20vh",
                            }}
                        >
                            <h1>Send a message to get started!</h1>
                        </div>
                    ) : (
                        messages.map((message) => {
                            return (
                                <li key={message.id}>
                                    {message.sender_name} (
                                    {new Date(
                                        message.created_at
                                    ).toLocaleString("fr-FR")}
                                    ) : {message.content}
                                </li>
                            );
                        })
                    )}
                </ul>
            </Grid>

            {/* sub */}
            {currentConversation === null ? (
                <></>
            ) : (
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
                        <IconButton
                            sx={{ color: "orange" }}
                            onClick={() => send()}
                        >
                            <SendIcon />
                        </IconButton>
                    </div>
                </Container>
            )}
        </Container>
    );
}
