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

                mongorestore --nsInclude=test.mydb --archive=./mydb.gzip --gzip 

                // mydb_name reappeared/restored in collections list in mongoCompass
4:45