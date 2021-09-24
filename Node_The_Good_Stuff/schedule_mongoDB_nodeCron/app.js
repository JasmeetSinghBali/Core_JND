const { spawn } = require('child_process');
const path = require('path');
const cron = require('node-cron');


const DB_NAME="test";
// backup path is a public folder in the current dir
const ARCHIVE_PATH = path.join(__dirname,'public',`${DB_NAME}.gzip`);

// Cron expression for every 5 seconds - */5 * * * * *
// scheduling the backup every night at 00:00
// use crontabguru for cron expression
cron.schedule('0 0 * * *',()=>{
    // invoking the backup function
    backupMongoDB();
});



function backupMongoDB(){
    // spawning a new child process with mongodump command and arguments as array []
    // mongodump --db=test --archive=./test.gzip --gzip
    const child = spawn('mongodump', [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        '--gzip'
    ])

    // listen to the output of the mongodump child process
    child.stdout.on('data',(data)=>{
        console.log('stdout: \n',data);
    })

    // stderr for child process
    // this error comes from console though even successfull backup messages comes under stderr
    child.stderr.on('data',(data)=>{
        console.log('stderr: \n',Buffer.from(data).toString());
    })

    // listen to child process error
    // this error come's from node.js file i.e app.js
    child.on('error',(error)=>{
        console.log('error: \n',error);
    })

    // Listener for exit event on the child
    child.on('exit',(code,signal)=>{
        if(code) console.log(`Process exit with code:${code}`)
        else if(signal) console.log('Process killed with signal:',signal)
        else console.log('Backup Succesfull✔✔');
    })
}




