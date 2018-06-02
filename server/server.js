const path = require('path'),
      http = require('http'),
      socketIO = require('socket.io'),
      express = require('express'),
      app = express();

const staticFilesPath = path.join(__dirname, '../public'),
      PORT = process.env.PORT || 3000;

const server = http.createServer(app),
      io = socketIO(server);

app.use(express.static(staticFilesPath));
app.set("x-powered-by", false);

io.on("connection", (socket) => {
  console.log("New user is connected!");

  socket.emit('newMessage', {
    from: 'ram@gmail.com',
    text: 'Hey! ram there.',
    createdAT: Date.now()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected!");
  });

});

server.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});
