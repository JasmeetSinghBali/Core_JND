> ## What is socket.io & its useCase

> Socket.io makes a connection b/w client and server that persists

                # In a normal client request
                Client ====> request for data(GET) ====> Server ====>sends data back====> Client

> Now consider their are 10 request to be made by client then 10 different ajax or fetch request need to be made

> ## Socket.io comes to rescue powered by WebSockets

- **The idea is that a websocket is set up that keeps single connection b/w server & client alive and then multiple bidirection interaction can occur**
- **An ideal use cases for socket.io are chat applications**

> Realtime Chat Application with Socket.io refer chatApp_demo dir
