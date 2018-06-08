
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var path = require('path');
// our localhost port
const port = 7777;

const app = express();

app.use(express.static('public'));
// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

const serverData = [];

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('new connecion');
  setTimeout(() => {
    io.sockets.emit('init', serverData);
  }, 2000);

  socket.on('new post', (data) => {
    console.log('new post added');
    var postid = 'post-' + Date.now().toString();
    var dataToSend = {id: postid, post: data.content, ts: data.ts};
    serverData.push(dataToSend);
    io.sockets.emit('renderposts', dataToSend);
  });
  socket.on('comment', (data) => {
    console.log('new comment added', data.comment, data.postId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});
server.listen(port, () => console.log(`Listening on port ${port}`));
