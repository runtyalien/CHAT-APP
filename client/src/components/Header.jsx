import React, { useEffect, useState } from "react";
import { Card, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookies";

const Header = ({ socket, userId, setUserId }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  function createNewRoom() {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    socket.emit("new-room-created", { roomId, userId });
  }

  function login() {
    const userId = uuidv4();
    setUserId(userId);
    Cookies.setItem("userId", userId);
    navigate("/");
  }

  function logout() {
    setUserId(null);
    Cookies.removeItem("userId", userId);
    navigate("/");
  }

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("http://localhost:4000/rooms");
      const { rooms } = await res.json();
      setRooms(rooms);
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-room-created", ({ room }) => {
      console.log(room);
      //setRooms([...rooms, room]);
    });

    socket.on("room-removed", ({ roomId }) => {
      setRooms(rooms.filter((room) => room.roomId !== roomId));
    });
  }, [socket]);

  return (
    <Card sx={{ padding: 2, marginTop: 5, backgroundColor: "#3f51b5" }} raised>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#1a237e", // Adjust hover background color
                },
              }}
              variant="text"
            >
              Home
            </Button>
          </Link>

          {rooms.map((room) => (
            <Link
              key={room._id}
              to={`/room/${room.roomId}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1a237e", // Adjust hover background color
                  },
                }}
                variant="text"
              >
                {room.name}
              </Button>
            </Link>
          ))}
        </Box>
        <Box>
          {userId && (
            <>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1a237e", // Adjust hover background color
                  },
                }}
                variant="text"
                onClick={createNewRoom}
              >
                New Room
              </Button>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#1a237e", // Adjust hover background color
                  },
                }}
                variant="text"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}

          {!userId && (
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "#1a237e", // Adjust hover background color
                },
              }}
              variant="text"
              onClick={login}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Header;

