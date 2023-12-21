import createTypinghandlers from "./controllers/TypingController.js";
import createRoomHandlers from "./controllers/RoomController.js";
import createMessageHandler from "./controllers/MessageController.js";

const sockets = ( socket ) => {
    const { typingStarted, typingStopped } = createTypinghandlers(socket);
    const { createRoom, newRoomCreated, roomRemoved } = createRoomHandlers(socket);
    const { sendMessage } = createMessageHandler(socket);


    // When a 'send-message' event is received, call the sendMessage function
    socket.on("send-message", sendMessage);

    // When a 'typing-started' event is received, call the typingStarted function
    socket.on("typing-started", typingStarted);

    // When a 'typing-stopped' event is received, call the typingStopped function
    socket.on("typing-stopped", typingStopped);

    // When a 'join-room' event is received, call the createRoom function
    socket.on("join-room", createRoom);

    // When a 'new-room-created' event is received, call the newRoomCreated function
    socket.on("new-room-created", newRoomCreated);

    // When a 'room-removed' event is received, call the roomRemoved function
    socket.on("room-removed", roomRemoved);

    // When a 'disconnect' event is received, log that the user has left
    socket.on('disconnect', () => {
        console.log("User Left.");
    });
}

export default sockets;
