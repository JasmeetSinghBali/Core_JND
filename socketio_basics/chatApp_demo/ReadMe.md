> ## Dev logs

- [x] moment helps in date formats

                npm i express socket.io moment --save

                npm run dev

- [x] go to http://localhost:5000/

> the public dir act as client

> express & http createServer for socket.io server config

- **express under the hood uses http createServer method to create server,we can directly access this createServer method though say in the case when we are setting up server with socket.io**

> to get access to frontend liberary of socket.io include this tag in index.html(client)

                <script src="/socket.io/socket.io.js"></script>

> Emitting Events back & forth via socket b/w client & server
