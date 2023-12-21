const createTypinghandlers = (socket) => {
    // The typingStarted function emits a 'typing-started-from-server' event
    const typingStarted = ({ roomId }) => {
        // If a roomId is provided, the event will be emitted to that room only
        // If no roomId is provided, the event will be broadcasted to all connected sockets
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-started-from-server");
    };
    
    // The typingStopped function emits a 'typing-stopped-from-server' event
    const typingStopped = ({ roomId }) => {
        // If a roomId is provided, the event will be emitted to that room only
        // If no roomId is provided, the event will be broadcasted to all connected sockets
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-stopped-from-server");
    };

    return {typingStarted,typingStopped};
}

export default createTypinghandlers;
