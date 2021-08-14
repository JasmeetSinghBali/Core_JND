const { exec } = require('child_process');

// list all files in the current directory
exec('ls -lh',(error,stdout,stderr)=>{
  // error occurs when command not found or command syntax error
  if(error){
    console.log(`error: ${error.message}`);
    return;
  }
  // error after the execution of the command i.e stderr
  if(stderr){
    console.log(`stderr: ${stderr}`);
    return;
  }
  // the command outputs data stored in the buffer
  console.log(`stdout: ${stdout}`);
});

// for Windows user
// exec('dir')
