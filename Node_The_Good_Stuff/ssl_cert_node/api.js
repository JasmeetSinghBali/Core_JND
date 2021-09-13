const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const api = express();

api.get('/',(req,res)=>{
    res.send('Hello from ssl server..');
});

// create ssl server
const sslServer = https.createServer({
    // synchronous as these info is vital to the backend so we explicitely stop other processes unitl the key and cert are configured
    // __dirname refers to the current folder i.e ssl_cert_node
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')), // key.pem
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem')) // cert.pem
},api);


sslServer.listen(5000,()=>{
    console.log('SSL Server running at 5000...');
});