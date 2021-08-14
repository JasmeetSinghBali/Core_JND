(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

const { spawn } = require('child_process');

// note we provide the arguments for the command as array with comma seperated values in case of multiple arguments in spawn method syntax as shown below
const child = spawn('ls',['-lh']);

// for windows
// const child = spawn('dir',[],{shell:true});

// Now we will listen on the events stdout,stderr and error via spawn instance
child.stdout.on('data',(data)=>{
  console.log(`stdout:${data}`);
});

child.stderr.on('data',(data)=>{
  console.log(`stderr:${data}`);
});

child.on('error',(error)=>{
  console.log(`error:${error.message}`);
});

// listening for exit event that is triggered automatically
child.on('exit',(code,signal)=>{
  if(code) console.log(`process exited with code:${code}`);
  if(signal) console.log(`process killed with signal:${signal}`);
  console.log(`Done ❤`);
});
