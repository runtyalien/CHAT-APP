const createMessageHandler = (socket) => {
    // The sendMessage function sends a message to a specific room or to all connected sockets
    const sendMessage = ({ message, roomId }) => {
        // If a roomId is provided, the message will be sent to that room only
        // If no roomId is provided, the message will be broadcasted to all connected sockets
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", { message });
    };
    return { sendMessage };
}

export default createMessageHandler;
