# Node.js built-in Modules Revision

****HTTP,EVENTS,BUFFER,CHILD PROCESS****

### HTTP (Used for creating networking applications)

Source->https://nodejs.org/api/http.html#http_http

#### Imp Pointers->

- [x] require('http')
- [x] never stores/buffer entire request or response data.
- [x] HTTP message headers

      { 'content-length': '123',
      'content-type': 'text/plain',
      'connection': 'keep-alive',
      'host': 'mysite.com',
      'accept': '*/*' }

****HTTP keep-alive, a.k.a., HTTP persistent connection, is an instruction that allows a single TCP connection to remain open for multiple HTTP requests/responses. By default, HTTP connections close after each request. ... Keep-alive also reduces both CPU and memory usage on your server.****

****The HTTP Host represents the domain name of the server.****


****The Accept header is used to inform the server by the client that which content type is understandable by the client expressed as MIME-types. ... If the Accept header is not present in the request, then the server assumes that the client accepts all types of media.****

- [x] http.Agent the agent maintains pool and a queue the queue contains the request that need to be handled and the pool has the unused socket connection.

- [x] wheather a socket will be pooled or removed depends on keep alive if keep alive is enabled then the socket is put into pool and this same socket can be used further for multiple request-response handling.

- [x] however in case keep-alive is disabled then socket is removed out of the pool also even if keep-alive connection is enabled the server may block the use of same socket to serve multiple requests.

- [x] ****a good practice is to destroy() the Agent instance when not in use as unsused socket may use OS resources.****

- [x] ****socket is removed from agent when socket emits close or agentRemove event.****

            // to keep one HTTP request open for long time without keeping it in the agent

            http.get(options,(res)=>{
              //do something
              }).on('socket',(socket)=>{
                socket.emit('agentRemove')
                })


- [x] ****to use agent for only current request****

            http.get({
                hostname: 'localhost'
                port: '80'
                path: '/'
                agent: false //create new agent for only this request
              },(res)=>{
                // do stuff with response
                })

## Conclusion-> HTTP/HTTPS module cannot be used in real world application as the complexity is very much higher as the code line increase instead we use Express that is built on HTTP module of node.js.

# EVENTS

- [x] ****Much of the core node.js API are build on event-driven architecture. here objects called emitters emit named events that cause function listeners to be called.****

- [x] ****example net.server object emits an event each time a peer connects to it like we saw in http.createServer instance when we define the server.on method that gets triggered every time a new request is made.****

- [x] All objects that emit event are instance of EventEmitter class. the eventEmitter.on() method is used to register listeners while the eventEmitter.emit() method is used to trigger the event.

            const EventEmitter= require('events');
            class MyEmitter extends EventEmitter{}
            const myEmitter=new myEmitter();

            myEmitter.on('event',()=>{
              console.log('an event occured!')
              });
            myEmitter.emit('event'); // .emit will trigger the .on method to give message an event occured

            
