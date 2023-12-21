const createTypinghandlers = (socket) => {
    const typingStarted = ({ roomId }) =>{
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-started-from-server");
    };
    
    const typingStopped = ({ roomId }) =>{
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-stopped-from-server");
    };

    return {typingStarted,typingStopped};
}



export default createTypinghandlers;
