let io;

module.exports = {
  init: (httpServer, opts) => {
    io = require('socket.io')(httpServer, opts);
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};