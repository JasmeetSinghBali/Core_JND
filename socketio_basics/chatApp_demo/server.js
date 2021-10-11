const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');


const app = express();
const server = http.createServer(app);
// 🌠 creates a socket.io server with help of express & http.createServer method
const io = socketio(server);

// ✨ Server the public dir as static act as client UI
app.use(express.static(path.join(__dirname,'public')));

const sockServer = 'SocketServer';

// ✔ Event Listener each time a new client connects to the socket server instance io 
io.on('connection',socket=>{

    // 🎈 event listener when client joins room
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);

        // 🦨 emits a welcome message to current user
        socket.emit('message',formatMessage(sockServer,' says: Welcome to chatApp!'));

        // 🦨 Broadcast to everyone when a user connects at frontend except the origin client(who connected)
        // .to(user.room) emits this message to a specific room
        socket.broadcast.to(user.room).emit('message',formatMessage(sockServer,` says: ${user.username} joined the chat`));

        // 🦨 Send users and room info to sidebar chat window
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
    //console.log(`🎎 ClientId: ${socket.id} connected to websocket...`);


    // 🎈 Catch/Listen for chatMessage event submit by a user
    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);
        // message coming from client catched at server side
        //console.log(msg);

        // 🌠 emit the catched client message to everybody from server
        // 🦨 broadcast to everyone
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });

    // 🎈 event that triggers when client disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);
        if(user){
            // 🦨 broadcast message to everyone that user left the chat  
            io.to(user.room).emit('message',formatMessage(sockServer,` says: ${user.username} left the chat`));
        }
        // update the users list inside the room
        // 🦨 Send users and room info to sidebar chat window
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
});



const PORT = 5000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});