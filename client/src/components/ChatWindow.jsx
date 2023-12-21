import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const ChatWindow = () => {
  // Using the socket from the OutletContext
  const { socket } = useOutletContext();

  // State variables for handling messages, chat history and typing status
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  // Getting the roomId from the URL parameters
  const { roomId } = useParams();

  const navigate = useNavigate();

  // useEffect hook to perform side effects
  useEffect(() => {
    if (!socket) return;

    // Listening for 'message-from-server' event from the server and updating the chat
    socket.on("message-from-server", (data) => {
      setChat((prev) => [
        ...prev,
        { message: data.message, received: true },
      ]);
    });

    // Listening for 'typing-started-from-server' and 'typing-stopped-from-server' events from the server
    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]); 

  // Function to handle form submission
  function handleForm(e) {
    e.preventDefault();
    // Emitting 'send-message' event to the server
    socket.emit("send-message", { message, roomId });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  }

  // Function to handle room removal
  async function removeRoom() {
    // Emitting 'room-removed' event to the server
    socket.emit("room-removed", { roomId });
    navigate("/");
  }

  // State variable for the typing timeout
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Function to handle input changes
  function handleInput(e) {
    setMessage(e.target.value);
    // Emitting 'typing-started' event to the server
    socket.emit("typing-started", { roomId });

    // If there's a typing timeout, clear it
    if (typingTimeout) clearTimeout(typingTimeout);

    // Setting a new typing timeout to emit 'typing-stopped' event to the server
    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped", { roomId });
      }, 1000)
    );
  }

  return (
    <Card
      sx={{
        padding: 3,
        marginTop: 5,
        width: "70%",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, color: "#333" }}>
        Let's Chat!
      </Typography>

      {roomId && (
        <Typography variant="subtitle1" sx={{ color: "#555" }}>
          Room: {roomId}
        </Typography>
      )}

      <Box sx={{ marginBottom: 3 }}>
        {chat.map((data, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: data.received ? "left" : "right",
              backgroundColor: data.received ? "#e0e0e0" : "#3f51b5",
              color: data.received ? "#333" : "#fff",
              padding: 2,
              borderRadius: "8px",
              marginBottom: 2,
            }}
          >
            {data.message}
          </Typography>
        ))}
      </Box>

      <Box component="form" onSubmit={handleForm}>
        {typing && (
          <InputLabel sx={{ color: "#777", marginBottom: 1 }} shrink htmlFor="message-input">
            Someone is typing...
          </InputLabel>
        )}

        <OutlinedInput
          fullWidth
          size="small"
          id="message-input"
          value={message}
          placeholder="Write your message"
          sx={{ backgroundColor: "#fff" }}
          onChange={handleInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end" sx={{ color: "#3f51b5" }}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>

      {roomId && (
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={removeRoom}
          sx={{ marginTop: 3 }}
        >
          Delete Room
        </Button>
      )}
    </Card>
  );
};

export default ChatWindow;
