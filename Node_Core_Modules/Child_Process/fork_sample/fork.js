const express = require('express');
const { fork } = require('child_process');

const app = express();

app.get('/synchronous',(req,res)=>{
  const sum=longComputation();
  res.send(`Sum is:${sum}`);
});
app.get('/asynchronous',async (req,res)=>{
  const sum= await longComputePromise();
  res.send(`Sum is :${sum}`);
});

// running some_long_task as child process when /forkProcess route is hit
app.get('/forkProcess',(req,res)=>{
  const child = fork('./some_long_task.js');
  //starting the child process i.e longComputation inside some_long_task.js
  child.send('start');
  child.on('message',(sum)=>{
    res.send(`Sum from child forked process is:${sum}`);
  })
});

app.listen(5000,()=>{
  console.log(`Server started at 5000...`);
});

// 1e9 is 10^9
// synchronous request
function longComputation(){
  let sum=0;
  for (let i=0;i<1e9;i++){
    sum+=i
  }
  return sum;
}

// asynchronous promise based request
function longComputePromise(){
  return new Promise((resolve,reject)=>{
    let sum=0;
    for (let i=0;i<1e9;i++){
      sum+=i
    }
    resolve(sum);
  })
}
