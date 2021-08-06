const http = require('http');

const server = http.createServer((req,res)=>{
  if(req.url="/"){
    res.write('Hello World');
    res.end();
  }

  if(req.url === '/api/products'){
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }

});
// server is an event emitter instance of http.Server class
// server.on
// server.add
// server.emit

// Note bunch of node core functionality are based on Event Emitter.

// event handling connection when a request is made to the server a New Connection message is logged in console.
// server.on('connection',(socket)=>{
//   console.log('New connection...');
// });


server.listen(3000);

console.log('Server listening at port 3000');
