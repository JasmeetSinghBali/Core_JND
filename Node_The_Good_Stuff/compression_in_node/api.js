const express = require('express');
const compression = require('compression');

const api= express();

// compression middleware
api.use(compression({
    level: 6,
    threshold: 10*1000, //10kb as 1kb=1000bytes
    filter : (req,res)=>{
        if(req.headers['x-no-compression']){
            return false
        }
        return compression.filter(req,res);
    }
}));

api.get('/',(req,res)=>{
    const payload = "Suppose this is a lot of data...."
    res.send(payload.repeat(10000)); 
});

api.listen(5000,()=>{
    console.log('Server started at 5000...');
});

