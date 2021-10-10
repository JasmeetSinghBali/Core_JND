const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
// 🌠 creates a socket.io server with help of express & http.createServer method
const io = socketio(server);

// ✨ Server the public dir as static act as client UI
app.use(express.static(path.join(__dirname,'public')));

// ✔ Event Listener each time a new client connects to the socket server instance io 
io.on('connection',socket=>{
    console.log(`🎎 ClientId: ${socket.id} connected to websocket...`);
});



const PORT = 5000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});