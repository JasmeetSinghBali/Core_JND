const socket = io(); 

// ✔ we have access to io because of script tag  with src ="socket.io.js"  added in index.html

// ✨ register a listener for event message defined at server side
socket.on('message',message=>{
    console.log(message);
    // refer dev tools see console at localhost:5000/
    // join room
    // sends welcome message from server 
});