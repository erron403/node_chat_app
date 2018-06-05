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
      from: 'Admin',
      text: 'Welcome to the chat App!',
      createdAt: new Date().getTime()
      
  });

  socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);

    io.emit('newMessage', {
      'from': message.from,
      'text': message.text,
      'createdAt': new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected!");
  });

});

server.listen(PORT, () => {
  console.log(`Server start at ${PORT}`);
});
