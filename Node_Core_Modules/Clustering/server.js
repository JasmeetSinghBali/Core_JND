const express = require('express');
const app = express();

const cluster = require('cluster');
const os = require('os'); // to get number of cores of our cpu.

const numcores = os.cpus().length;

app.get('/',(req,res)=>{
  for(let i=0;i<1e2;i++){
    //some long running task
    let t=0;
    t=t+50;
    console.log(`Computed: ${t}`);
  }
  // console.log(`Number of Cores in your Processor => ${numcores}`);
  console.log(`Request handled by => ${process.pid}`);
  res.send(`Hi!!  Examine the console...`);
  //cluster.worker.kill();// kills the current worker who handled oure request
});

// ========= COmment the portion below it and then do load test to see the performance of the non-clustered app=============
// check wheather the master process is running
if(cluster.isMaster){
  // create new workerProcess and workers=cores in our cpu say cores are 8 so create/fork 8 child/worker process
  for(let i =0;i<numcores;i++){
    cluster.fork(); // 8 child process/worker made.
  }
  // worker died
  // in case any worker died we can register a listenet on this event
  cluster.on('exit',(worker,code,signal)=>{
    console.log(`worker died : ${worker.process.pid}`);
    cluster.fork();// to create a new worker as a worker died
  });
}else{
  // if we are inside worker process
  // then make the 8 worker processor to listen to the request at the same 5000 port
  app.listen(5000,()=>{
    console.log(`Process: ${process.pid} Server started at 5000`);
  });
}

// Uncomment this portion only when loadtesting non-clusterd app
// for non clustered version of app
// app.listen(5000,()=>{
//      console.log(`Server started at 5000`);
//    });
