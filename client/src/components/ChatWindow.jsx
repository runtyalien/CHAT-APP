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
  const { socket } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [
        ...prev,
        { message: data.message, received: true },
      ]);
    });

    socket.on("typing-started-from-server", () => setTyping(true));
    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message, roomId });
    setChat((prev) => [...prev, { message, received: false }]);
    setMessage("");
  }

  async function removeRoom() {
    socket.emit("room-removed", { roomId });
    navigate("/");
  }

  const [typingTimeout, setTypingTimeout] = useState(null);

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started", { roomId });

    if (typingTimeout) clearTimeout(typingTimeout);

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
