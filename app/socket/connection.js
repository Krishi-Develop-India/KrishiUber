

module.exports = (socket, setConnect) => {
    socket.on('connect', () => {
        setConnect(true);
        console.log("Socket Connected");
    });
    socket.on('disconnect', () => {
        setConnect(false);
    });
};