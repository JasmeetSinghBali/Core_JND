function longComputation(){
  let sum=0;
  for (let i=0;i<1e9;i++){
    sum+=i
  }
  return sum;
}

// Interprocess communication between child and master processes.
// we listen to the message event on this process whenever
// this longComputation child process runs.
process.on('message',(message)=>{
  if(message==='start'){
    const sum=longComputation();
    process.send(sum);
  }
});
