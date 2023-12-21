const createMessageHandler = (socket) => {
    const sendMessage = ({ message, roomId }) =>{
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", { message });
    };
    return { sendMessage };
}

export default createMessageHandler;