import React, { useEffect } from "react";
import { Routes, Route, useParams, useOutletContext } from "react-router-dom";
import { socket, io } from "socket.io-client";
import ChatWindow from "../components/ChatWindow";
import { Typography } from "@mui/material";

const Room = () => {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", { roomId: params.roomId });
  }, [socket]);

  return <ChatWindow />;
};

export default Room;
