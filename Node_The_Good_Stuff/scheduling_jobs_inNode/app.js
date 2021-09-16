const schedule = require('node-schedule');

//======= At a particular time & date =========
// change the string a/c to the time and date you ran this to test this

// const someDate = new Date('2021-09-16T12:45:00.000+5:30');
// schedule.scheduleJob(someDate, ()=>{
//     console.log('Job ran @ ',new Date().toString());
// });

//======= At recurrent intervals(periodic jobs) =========
// use of cron expressions
// cron expression help-> https://crontab.guru/
// scheduleJob('cronexpresion') 

// schedule.scheduleJob('s2-job','*/2 * * * * *',()=>{
//     console.log('I ran at every 2nd second....');
//     //======= Cancelling a job =================
//     schedule.cancelJob('s2-job'); // this will result in execution of the s2-job only once after 2 seconds and then it stops executing periodically
// });

// ===== Another way to cancel job =========
const s2job = schedule.scheduleJob('*/2 * * * * *',()=>{
    console.log('I ran at every 2nd second....');
    //======= Cancelling a job =================
    s2job.cancel();
});


