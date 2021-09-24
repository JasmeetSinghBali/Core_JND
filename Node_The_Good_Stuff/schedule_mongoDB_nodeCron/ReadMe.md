> ## scheduling MongoDB backups

>  Manual Backing Up of MongoDB data

- **make sure you have mongodb and mongodb tools installed locally also set up environment var for the path of mongod,mongo and mongodbtools**

                # step - 1
                npm i node-cron --save

                // backup command
                // archive specifies path where we want to store the backup to with the 
                compression format specified
                // in a cmd
                mongod     

                // in seperate cmd shell
                mongodump --db=mydb_name --archive=./mydb.gzip --gzip

                // previous command creates a mydb.gzip file in the root of current dir

                # step-2 delete the mydb named collection from mongo compass

                # step-3 Restoring database

                // in the cmd shell
                // --nsInclude=db.collection
                mongorestore --nsInclude=test.mydb --archive=./mydb.gzip --gzip 

                // test reappeared/restored in collections list in mongoCompass


                # step -4
                // connect to the mongocloud via mongo compass
                // create a new db named as test and collection mydb with mock document
                // make sure mongod is running in background
                // make sure you have a dir name public in your current project folder from where you run the below command
                npm run dev

                // the new test.gzip will be added to the public folder a/c to the scheduled cron expression

> IMPORTANT Further a child process function for dbrestore can be created refer app.js and use the mongorestore command

