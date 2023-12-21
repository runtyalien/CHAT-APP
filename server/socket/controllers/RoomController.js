import Room from "../../models/Room.js";

const createRoomHandlers = (socket) => {
  const createRoom = ({ roomId }) => {
    console.log("Joining room");
    socket.join(roomId);
    //socket.broadcast.emit("new-room-created");
  };

  const newRoomCreated = ({ roomId, userId }) => {
    const room = new Room({
        name:'Test',
        roomId
    });
    room.save();
    socket.emit("new-room-created", { room });
  };

  const roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId });
    socket.broadcast.emit("room-removed", { roomId });
  }

  return { createRoom, newRoomCreated, roomRemoved };
};

export default createRoomHandlers;
