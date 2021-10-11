> ## Dev logs & Socket.io application/app development guide

- [x] moment helps in date formats

                npm i express socket.io moment --save

                npm run dev

- [x] go to http://localhost:5000/

> the public dir act as client

> express & http createServer for socket.io server config

- **express under the hood uses http createServer method to create server,we can directly access this createServer method though say in the case when we are setting up server with socket.io**

---

> to get access to frontend liberary of socket.io include this tag in index.html(client)

                <script src="/socket.io/socket.io.js"></script>

---

> Emitting Events back & forth via socket b/w client & server

                # ========= Server Side (server.js) ============
                # Emits an event named message with string as second param

                # .emit(eventName,callback/message)

                # Event register named as message that returns a welcome message when it is triggered

                socket.emit('message','Welcome to chatApp!')

                # ========== Client Side (main.js)=============

                # catching the message event

                socket.on('message',message=>{
                    console.log(message);
                    // refer dev tools see console at localhost:5000/
                });

---

> Broadcast emit events

                        # broadcast to everyone except the origin client
                        socket.broadcast.emit()

**emits message/data to everyone except the user who got connected**

                        # broadcast to everyone including origin client
                        io.emit()

**emits message/data to everybody including the one who send that message like a chat application**

---

> Implement Realtime messaging

                        # refer main.js adding event listener when message is submit via chat-form

                        # refer server.js for catching client submit message & displaying+broadcasting to every other user with chat window
