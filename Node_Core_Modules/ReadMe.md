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


# Child Process in Node.js

- ****Node.js works in single threaded architecture to make use of maximum resources and processors child processes comes into play.****

- ****4 ways to instantiate the child process exec,spawn,execfile,fork****

## EXEC

- ****If we run a command via exec method whose stdout is very large like with command 'find /' in linux then it will give us the error as maxlenght for the buffer exceeded.****

###  EXEC CONCLUSION-> Only for small output stdout commands like pwd,ls,mkdir etc.... but not suitable for large stdout commands like find / that finds all the files under the root directory which cause the maxBuffer length to exceed error.

## EXECFILE (execFile)

Syntax-> execFile('filename',(err,stdout,stderr)=>{})

- ****It takes a filename and then executes that file****

- ****In Linux you need to make the file executable via chmod****

- ****also to make it run in node env we need to specify the shebang line****

                chmod +x somefile_for_execFile.sh
                #!/bin/bash

- ****finally execute the somefile_for_execFile.sh you want to execute via node execFile_sample.js****

### EXECFILE Conclusion -> execFile same as exec method only usefull for small buffer commands not suitable for large stdout commands like find / and cause maxBuffer length error on execution.

# Spawn Method

- ****Allows Streaming of the data in chunks rather than using buffer hence suitable for large sized stout commands also like file /****


# Fork Method & Interprocess Communication
- ****can use loadtest or apache benchmark for load testing of api****

- ****load testing with 10 request with concurrecny level of 10 and route /synchronous****

            loadtest -n 10 -c 10 http://localhost:5000/synchronous

            loadtest -n 10 -c 10 http://localhost:5000/asynchronous

            // you will get info about different routes request time complete info.

- ****Conclusion -> both synchronous and asynchronous approaches take the same amount of time to serve the requests this is because when we started our app than only single process ran and hence not utilizing all the resources of our CPU to counter this the idea is to use child processes with fork method****

- ****The idea is to run a new child process when a route is hit****

- ****The purpose of fork() is to create a new process, which becomes the child process of the caller. After a new child process is created, both processes will execute the next instruction following the fork() system call. ... fork() returns a positive value, the process ID of the child process, to the parent.****

- ****Note that the child process via fork runs on different thread  i.e the node fork.js is running on differnet thread and when we hit the forkProcess route then it runs on different thread hence improving overall performance, rerun loadtest commands again to see the different results****

              loadtest -n 10 -c 10 http://localhost:5000/forkProcess

              // will give far better than results than the normal single threaded longcomputation.

# Clustering(Scaling Node.js Applications)


- ****Clustering helps in zero down time i.e in any case of the running instances goes down then other instance will start atomatically.****

- ****More requests can be handled in less time in a clustered app than a non-clustered app.****

            // os module
            const numcores = os.cpus().length;

- ****further we can check that the process running is master process if yes then we can fork/create a child process with fork that way only the worker/child process will be listening to the request not the master process.****

- ****Note all the worker process share the same port****

              // gives the pid for different workers process.
              processor.pid


              output
              Process: 14816 Server started at 5000
              Process: 11704 Server started at 5000
              Process: 9904 Server started at 5000
              Process: 17480 Server started at 5000
              Process: 11996 Server started at 5000
              Process: 12240 Server started at 5000
              Process: 14748 Server started at 5000
              Process: 1224 Server started at 5000

- ****The cluster module uses the round robin approach i.e the first request is handled by 14816 server then second by 11704 third with 9904 and so on...****

## Difference between workers thread and child process
https://stackoverflow.com/questions/56312692/what-is-the-difference-between-child-process-and-worker-threads

        Request handled by => 11928
        Killing worker : 11928
        Request handled by => 17148
        Killing worker : 17148
        Request handled by => 13680
        Killing worker : 13680
        Request handled by => 17760
        Killing worker : 17760
        Request handled by => 3836
        Killing worker : 3836
        Request handled by => 16924
        Killing worker : 16924
        Request handled by => 10088
        Killing worker : 10088
        Request handled by => 7896
        Killing worker : 7896

- ****Finaly loadtest the clustered app now****

              loadtest -n 1000 -c 100 http://localhost:5000/
              // will observe different worker handling the request in the console.

***

> # Streams & Buffers in Node.js(IMPORTANT) 

> ### refer stream_data.js for example reading .txt file in streaming manner

- [x] **Streams are objects that can be read/write from/to the source/destination in continuous fashion**
- [x] **example watching an online movie/tv series in real time**
- [x] **4 types of streams- Readable(stream for read operation),Writable(write operation),Duplex(both read/write operations),Transform(a duplex stream where output is dependent on input)**
- [x] **so a requested resource will be given as response to client as chunks instead of providing all the data**
- [x] **each type of stream has eventEmitter instance and throws several events at different instances of times**
- [x] **some of the events are data(fired when data is available for read),end(when no more data to read),error(fired when their is error in read/writing data),finish(when all the data has been flushed/deleted from underlying system)** 

- [x] **buffers are used hold the data temporarily when moving from one point to another**

> # Stream vs Buffer

- [x] **Stream is sequence of data that complete overtime**
- [x] **buffers are part of streams** 

              This | is | my | data
              # here the complete line is a stream
              # and this,is,my,data are chunks i.e buffer of the streamed data

