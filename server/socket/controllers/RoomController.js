import Room from "../../models/Room.js";

const createRoomHandlers = (socket) => {
  const createRoom = ({ roomId }) => {
    console.log("Joining room");
    socket.join(roomId);
    //socket.broadcast.emit("new-room-created");
  };

  const newRoomCreated = ({ roomId }) => {
    const room = new Room({
        name:'Test',
        roomId
    });
    room.save();
    socket.broadcast.emit("new-room-created", { roomId });
  };

  return { createRoom, newRoomCreated };
};

export default createRoomHandlers;
