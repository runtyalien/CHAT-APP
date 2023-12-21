import createTypinghandlers from "./controllers/TypingController.js";
import createRoomHandlers from "./controllers/RoomController.js";
import createMessageHandler from "./controllers/MessageController.js";

const sockets = ( socket ) => {
    const { typingStarted, typingStopped } = createTypinghandlers(socket);
    const { createRoom, newRoomCreated, roomRemoved } = createRoomHandlers(socket);
    const { sendMessage } = createMessageHandler(socket);


    socket.on("send-message", sendMessage);

    socket.on("typing-started", typingStarted);

    socket.on("typing-stopped", typingStopped);

    socket.on("join-room", createRoom);

    socket.on("new-room-created", newRoomCreated);

    socket.on("room-removed", roomRemoved);

    socket.on('disconnect', () => {
        console.log("User Left.");
    });
}

export default sockets;