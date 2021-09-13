const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');

const api = express();

api.use(
    '/ftp',
    express.static('public/ftp'),
    serveIndex('public/ftp',{icons:true,hidden:true})
);

api.get('/',(req,res)=>{
    res.send('All good');
});


api.listen(5000,()=>{
    console.log('Server running at port 5000...');
});

api.getMaxListeners("data.rekt.data.rekt")