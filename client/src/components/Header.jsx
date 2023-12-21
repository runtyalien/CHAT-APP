import React, { useEffect, useState } from "react";
import { Card, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Importing UUID to generate unique IDs
import Cookies from "js-cookies"; // Importing js-cookies to handle cookies

const Header = ({ socket, userId, setUserId }) => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  // Function to create a new room
  function createNewRoom() {
    // Generating a unique room ID
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
    // Emitting 'new-room-created' event to the server
    socket.emit("new-room-created", { roomId, userId });
  }

  // Function to handle login
  function login() {
    // Generating a unique user ID
    const userId = uuidv4();
    setUserId(userId);
    // Storing the user ID in a cookie
    Cookies.setItem("userId", userId);
    navigate("/");
  }

  // Function to handle logout
  function logout() {
    // Clearing the user ID
    setUserId(null);
    // Removing the user ID cookie
    Cookies.removeItem("userId", userId);
    navigate("/");
  }

  // useEffect hook to fetch rooms
  useEffect(() => {
    async function fetchRooms() {
      // Fetching rooms from the server
      const res = await fetch("http://localhost:4000/rooms");
      const { rooms } = await res.json();
      setRooms(rooms);
    }
    fetchRooms();
  }, []);

  // useEffect hook to handle socket events
  useEffect(() => {
    if (!socket) return;

    // Listening for 'new-room-created' event from the server
    socket.on("new-room-created", ({ room }) => {
      setRooms([...rooms, room]);
    });

    // Listening for 'room-removed' event from the server
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
                  backgroundColor: "#1a237e", 
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
                    backgroundColor: "#1a237e", 
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
                    backgroundColor: "#1a237e", 
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
                    backgroundColor: "#1a237e", 
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
                  backgroundColor: "#1a237e", 
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
