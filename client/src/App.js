import { Box, Container, Typography } from "@mui/material";
import "./App.css";
import Cookies from "js-cookies";
import ChatWindow from "./components/ChatWindow";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    const _userId = Cookies.getItem('userId');
    if(_userId) setUserId(_userId);
  }, []);

  return (
    <Container>
      <Header socket={socket} userId={userId} setUserId={setUserId}/>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Outlet context={{socket, userId}}/>
      </Box>
    </Container>
  );
}

export default App;
