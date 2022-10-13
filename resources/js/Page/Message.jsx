import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Badge from "@mui/material/Badge";

export default function Message(props) {
    // State used for storing conversation names and ids
    const [conversations, setConversations] = useState(
        props.data.conversations || []
    );
    // State used for storing the current conversation id
    const [currentConversationId, setCurrentConversationId] = useState(
        conversations.length > 0
            ? props.data.conversationId != undefined
                ? props.data.conversationId
                : 0
            : null
    );
    const currentConversation = () => {
        if (currentConversationId == null) return null;
        return conversations[currentConversationId];
    };
    const currentApplicationId = () => {
        if (currentConversation() == null || currentConversationId == -1)
            return null;
        return currentConversation().id;
    };

    // State used for storing the current conversation's messages, and the input field of the user
    const initialInputMessages = () => {
        let array = new Array(conversations.length).fill("");
        if (props.data.icebreaker) array[0] = props.data.icebreaker;
        return array;
    };
    const [messages, setMessages] = useState([]);
    const [inputMessages, setInputMessages] = useState(initialInputMessages());

    function updateInputMessage(id, value) {
        const newInputMessages = inputMessages.map((item, i) => {
            if (i === id) return value;
            return item;
        });

        setInputMessages(newInputMessages);
    }
    const inputMessage = () => {
        return inputMessages[currentConversationId];
    };

    // Function to fetch all messages for a conversation
    function getMessages() {
        setMessages([]);
        if (currentApplicationId() == null) return;
        fetch(
            "/api/applications/" +
                currentApplicationId() +
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
    }, [currentConversationId]);

    const send = () => {
        if (inputMessage().trim() == "") return;
        if (currentApplicationId() == null) {
            fetch("/api/applications", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": props.csrf_token,
                },
                body: JSON.stringify({
                    post_id: currentConversation().post_id,
                    user_id: props.data.user,
                }),
            })
                .then((res) => res.json())
                .then((newApplication) => {
                    currentConversation().id = newApplication.id;
                    send();
                })
                .catch((err) => {
                    console.log("Failed to apply to post: ", err);
                });
            return;
        }

        fetch("/applications/" + currentApplicationId() + "/send-message", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": props.csrf_token,
            },

            body: JSON.stringify({
                message: inputMessage().trim(),
            }),
        })
            .then((res) => {
                if (currentConversation().new) window.location.href = "/chat";

                getMessages();
                updateInputMessage(currentConversationId, "");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container sx={{ mb: "20px" }}>
            {props.data.isCompany
                ? groupByPostId(conversations).map((convGroup, i) => {
                      // open application group
                      const [open, setOpen] = React.useState(false);

                      const handleClick = () => {
                          setOpen(!open);
                      };
                      return (
                          <div
                              key={i}
                              style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginBottom:'3vh'
                              }}
                          >
                              <Button
                                  onClick={handleClick}
                                  variant="outlined"
                                  style={{
                                      color: "black",
                                      borderColor: "black",
                                      backgroundColor:'lightgrey'
                                  }}
                              >
                                  {convGroup.title}
                                  <Badge
                                  style={{margin:'1em', color:'white'}}
                                      badgeContent={
                                          convGroup.applications.length
                                      }
                                      color="grey"
                                  >
                                  </Badge>
                              </Button>

                              <Collapse in={open} timeout="auto" unmountOnExit>
                                  {convGroup.applications.map((conv, i) => {
                                      return (
                                          <Button
                                              sx={{ m: 1 }}
                                              variant="contained"
                                              key={i}
                                              onClick={() =>
                                                  setCurrentConversationId(
                                                      i + convGroup.start_id
                                                  )
                                              }
                                              style={{
                                                  backgroundColor: conv.new
                                                      ? "var(--accent)"
                                                      : "var(--accent2)",
                                                  borderColor: "var(--dark)",
                                                  border:
                                                      i + convGroup.start_id ==
                                                      currentConversationId
                                                          ? "solid 1px"
                                                          : 0,
                                              }}
                                          >
                                              {conv.new && "NEW: "}{" "}
                                              {conv.applicant}
                                          </Button>
                                      );
                                  })}
                              </Collapse>
                          </div>
                      );
                  })
                : conversations.map((conv, i) => {
                      return (
                          <Button
                              sx={{ m: 1 }}
                              variant="contained"
                              key={i}
                              onClick={() => setCurrentConversationId(i)}
                              style={{
                                  backgroundColor: conv.new
                                      ? "var(--accent)"
                                      : "var(--accent2)",
                                  borderColor: "var(--dark)",
                                  border:
                                      i == currentConversationId
                                          ? "solid 1px"
                                          : 0,
                              }}
                          >
                              {conv.new && "NEW: "} {conv.title}
                          </Button>
                      );
                  })}

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
                    <Button variant="contained" href="/" sx={{ margin: "3%" }}>
                        Find offers?
                    </Button>
                </Container>
            ) : (
                <></>
            )}

            {currentConversationId === null ? (
                <></>
            ) : (
                <div
                    style={{
                        backgroundColor: "var(--dark)",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    {/* if not apply -> find offer else -> click offer */}
                    <Grid>
                        <div>
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
                                                conv.id ==
                                                currentApplicationId()
                                        )[0]?.title[0]
                                    }
                                </Avatar>
                                {
                                    conversations.filter(
                                        (conv) =>
                                            conv.id == currentApplicationId()
                                    )[0]?.title
                                }
                            </div>
                        </div>
                    </Grid>
                    {/* content */}

                    <Grid>
                        <div>
                            {currentConversationId === null ? (
                                <></>
                            ) : messages.length === 0 ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "20vh",
                                        backgroundColor: "white",
                                    }}
                                >
                                    <h2>Send a message to apply to the job!</h2>
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
                                                        props.data.account_id ==
                                                        message.sender_account_id
                                                            ? "var(--accent2)"
                                                            : "var(--background)",
                                                    marginTop: "20px",
                                                    marginLeft:
                                                        props.data.account_id ==
                                                        message.sender_account_id
                                                            ? "10%"
                                                            : 0,
                                                    marginRight:
                                                        props.data.account_id ==
                                                        message.sender_account_id
                                                            ? 0
                                                            : "10%",
                                                    borderRadius: "6px",

                                                    padding: "5px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {message.sender_name}
                                                </span>
                                                <br />
                                                <div
                                                    style={{
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                >
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
                    {currentConversationId === null ? (
                        <></>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "end",
                                justifyContent: "center",
                                width: "100%",
                                padding: 0,
                            }}
                        >
                            <TextField
                                multiline
                                placeholder="Send a message"
                                value={inputMessage()}
                                onChange={(e) =>
                                    updateInputMessage(
                                        currentConversationId,
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    borderColor: "black",
                                    backgroundColor: "lightgrey",
                                    border: "0",
                                    textJustify: "center",
                                    marginTop: "20px",
                                }}
                            />

                            {/* input */}

                            <IconButton
                                sx={{ color: "orange" }}
                                onClick={() => send()}
                            >
                                <SendIcon />
                            </IconButton>
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
}

// group application by post in a company chat
function groupByPostId(data) {
    const result = [];
    let start_id = 0;

    data.forEach((e) => {
        const postGroup = result.find((p) => p.post_id === e.post_id);

        if (postGroup) {
            postGroup.applications.push(e);
        } else {
            result.push({
                post_id: e.post_id,
                title: e.title,
                applications: [e],
                start_id: start_id,
            });
        }
        start_id += 1;
    });

    return result;
}
