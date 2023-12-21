import React from "react";
import { Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" sx={{ marginBottom: 3, textAlign: "center", marginTop:5 }}>
        Welcome to the Chat App
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, textAlign: "center", marginTop:5 }}>
        Connect with people and start chatting in real-time. Join existing rooms
        or create your own!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ display: "block", margin: "0 auto" }}
      >
        Start Chat
      </Button>
    </Container>
  );
};

export default Home;
