import { Router } from "express"; // Express router is used to create modular, mountable route handlers
import Room from "../models/Room.js"; // Importing the Room model

const router = new Router();
router.get("/rooms", async (req, res) => {
  // Using the Room model to find all rooms in the database
  const rooms = await Room.find();
  res.json({ rooms });
});

export default router;
