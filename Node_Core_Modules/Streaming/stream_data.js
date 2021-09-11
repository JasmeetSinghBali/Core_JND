// to stream input.txt

const fs = require('fs');
const http = require('http');
const server = http.createServer();

// =========== The Non-Streaming Way =============
// server.on('request',(req,res)=>{
    // asynchronous file read
    // non-streaming data i.e loading all the data at once
    // this method not suitable if requested resource is large in size
//     fs.readFile('input.txt',(err,data)=>{
//         if(err) return console.error(err);
//         res.end(data.toString());
//     });
// });

// ======== Streaming data in chunks in continuous manner the right way ============
server.on('request',(req,res)=>{
    const rStream = fs.createReadStream('input.txt'); 
    const wstream = fs.createWriteStream('output.txt');
    // handling data event
    // data is fired when data is available to read 
    rStream.on('data',(chunkData)=>{
        console.log('Receiving new data chunk...');
        
        // copy pasting from input.txt to output.txt
        wstream.write(chunkData);
        
        // piping only comment out the next line and comment the wstream.write line 
        //rStream.pipe(wstream);
        
        // sending streamed data as response from server
        res.write(chunkData);
    });
    rStream.on('end',()=>{
        res.end();
    });
    rStream.on('error',(err)=>{
        res.end("file not found");
    })
});



server.listen(8000,"127.0.0.1",()=>{
    console.log('Server started at localhost 8000, go to http://localhost:8000/ then come back and see the console again..');
});
