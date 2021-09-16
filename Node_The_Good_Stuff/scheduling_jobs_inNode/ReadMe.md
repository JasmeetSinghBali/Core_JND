> # Scheduling Jobs in Node.js refer (app.js)
**https://www.npmjs.com/package/node-schedule**

- [x] **example sending scheduled emails to clients or backup databases after particular time interval**
- [x] **recurrent intervals,at particular date time, cancelling jobs**

                        npm i node-schedule --save
                        const schedule = require('node-schedule');


                        # schedule.scheduleJob
                        # name of the job is optional
                        schedule.scheduleJob(nameOfJob,RecurrenceRule|Date,JobCallback)

- [x] **cron expression for recurrent intervals(periodic jobs) i.e repeat after equal intervals help-> https://crontab.guru/**


> ## Cron expression * * * * * (typical with 5 stars) but in node-schedule allow us to have a 6th star reffered as second

                        * * *  *  *  *
                                     - day of the week(0 to 7)(o or 7 is sun)
                                  - month(1-12)
                                - day of month(1-31)
                            - hour(0-23)
                          - minute(0-59)
                        - seconds(0-59,optional)   