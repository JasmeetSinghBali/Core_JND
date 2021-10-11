// ✔ grab the chat-form refer chat.html
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// 🎇 Get username & room from url string
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true // ignores & and other speacial char in query string
});

//console.log(username,room); // can be seen in client side console

// ✔ we have access to io because of script tag  with src ="socket.io.js"  added in index.html
const socket = io(); 

// 🎈 Join chatroom event passes username and room to server
socket.emit('joinRoom',{ username,room });

// 🎈 Get room & users
socket.on('roomUsers', ({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});

// ✨ register a listener for event named 'message' defined at socketServer side
socket.on('message',message=>{
    //console.log(message);
    // refer dev tools see console at localhost:5000/
    // join room
    // sends welcome message from server 

    // 🎇 displays the one client message grabbed by server, send to everyone via the common chat window
    outputMessage(message);

    // scroll down automatically on new chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

// 🎇 Message Submit event listener
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    // grab message text
    const msg = e.target.elements.msg.value;

    // 🦨 Emit message to server
    socket.emit('chatMessage',msg);

    // clear input after sending message to message window
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// 🙌 outputs message to dom (common chat window)
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = 
    `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    // ✔ appends a new div to the chat-message window each time a user send message
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to chat window
function outputRoomName(room){
    roomName.innerText = room;
}

// Add users to userlist in chat window
function outputUsers(users){
    userList.innerHTML = `${users.map((user)=>`<li>${user.username}</li>`).join('')}`;
}