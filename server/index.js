import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import sockets from "./socket/sockets.js";
import mongoose from "mongoose";
import router from "./api/routes.js";
import cors from "cors";

// Connecting to the MongoDB database
await mongoose.connect(
  "mongodb+srv://omgadkar:Rajgad11@cluster0.a2cnemm.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
const PORT = 4000;

const httpServer = http.createServer(app);
// Creating a new Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"], // Allowing CORS from localhost:3000
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Using the router for all paths
app.use("/", router);

// Setting up a connection event listener for the Socket.IO server
io.on("connection", sockets);

httpServer.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
