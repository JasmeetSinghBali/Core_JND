const { execFile } = require('child_process');

// NOTE- Windows User cannot execute .cmd or .bat files only .exe files are executable in windows by the user.

// execFile('filename',(callback)=>{})
execFile('./somefile_for_execFile.sh',(error,stdout,stderr)=>{
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
