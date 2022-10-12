import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

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
        if (message.trim() == "") return;
        fetch("/applications/" + currentConversation + "/send-message", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": props.csrf_token,
            },
            body: JSON.stringify({
                message: message.trim(),
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
                setMessage("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
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
{conversations.length == 0 ? (
            <div
                style={{
                    backgroundColor: "var(--dark)",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                {/* if not apply -> find offer else -> click offer */}
                {conversations.length == 0 ? (
                    <Container
                        sx={{
                            bgcolor: "white",
                            fontSize: "2em",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "5%",
                            textAlign: "center",
                        }}
                    >
                        <div>You have not applied to any job offers yet!</div>
                        <Button
                            variant="contained"
                            href="/"
                            sx={{ margin: "3%" }}
                        >
                            Find offers?
                        </Button>
                    </Container>
                ) : (
                    <></>
                )}

                {/* if not apply -> find offer else -> click offer */}
                <Grid>
                    <div>
                        {currentConversation != null ? (
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
                                    {
                                        conversations.filter(
                                            (conv) =>
                                                conv.id == currentConversation
                                        )[0]?.title[0]
                                    }
                                </Avatar>
                                {
                                    conversations.filter(
                                        (conv) => conv.id == currentConversation
                                    )[0]?.title
                                }
                            </div>
                        ) : null}
                    </div>
                </Grid>
                {/* content */}

                <Grid>
                    <div>
                        {currentConversation === null ? (
                            <></>
                        ) : messages.length === 0 ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "20vh",
                                    backgroundColor:"white"
                                }}
                            >
                                <h1>Send a message to get started!</h1>
                            </div>
                        ) : (
                            messages.map((message, i) => {
                                return (
                                    <div
                                        key={message.id}
                                        style={{ width: "100%" }}
                                    >
                                        <Grid
                                            style={{
                                                backgroundColor:
                                                    i % 2 == 0
                                                        ? "var(--accent2)"
                                                        : "var(--background)",
                                                marginTop: "20px",
                                                marginLeft:
                                                    i % 2 == 0 ? "10%" : 0,
                                                marginRight:
                                                    i % 2 == 0 ? 0 : "10%",
                                                borderRadius: "6px",

                                                padding: "5px",
                                            }}
                                        >
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                {message.sender_name}
                                            </span>
                                            <br /> 
                                            <div style={{whiteSpace:'pre-wrap'}}>
                                            {message.content}
                                            </div>
                                            <br />
                                            <Typography
                                                color="text.secondary"
                                                style={{ fontSize: ".7em" }}
                                            >
                                                {new Date(
                                                    message.created_at
                                                ).toLocaleString("fr-FR")}
                                            </Typography>
                                        </Grid>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </Grid>

                {/* sub */}
                {currentConversation === null ? (
                    <></>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "end",
                            justifyContent:'center',
                            width: "100%",
                            padding: 0,
                        }}
                    >
                        <TextField
                            multiline
                            placeholder="Send a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{
                                width: "100%",
                                borderColor: "black",
                                backgroundColor: "lightgrey",
                                border: "0",
                                textJustify: "center",
                                marginTop: '20px'
                            }}
                        />

                        {/* input */}

                        <IconButton
                            sx={{ color: "orange", mt: '20px'}}
                            onClick={() => send()}
                        >
                            <SendIcon />
                        </IconButton>
                    </div>
                )}
            </div>
        </Container>
    );
}
