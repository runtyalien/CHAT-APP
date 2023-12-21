import Room from "../../models/Room.js";

const createRoomHandlers = (socket) => {
  // The createRoom function joins a room with a given ID
  const createRoom = ({ roomId }) => {
    console.log("Joining room");
    socket.join(roomId);
    //socket.broadcast.emit("new-room-created");
  };

  // The newRoomCreated function creates a new room and emits a 'new-room-created' event
  const newRoomCreated = ({ roomId, userId }) => {
    const room = new Room({
        name:'Test',
        roomId
    });
    room.save();
    // Emitting a 'new-room-created' event with the room data
    socket.emit("new-room-created", { room });
  };

  // The roomRemoved function removes a room with a given ID and emits a 'room-removed' event
  const roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId });
    // Broadcasting a 'room-removed' event with the room ID
    socket.broadcast.emit("room-removed", { roomId });
  }

  return { createRoom, newRoomCreated, roomRemoved };
};

export default createRoomHandlers;
