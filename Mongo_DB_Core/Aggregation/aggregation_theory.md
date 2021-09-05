# MongoDB Aggregation Framework

## Some Best Practices Guidelines For Aggregation in MongoDB
- [x] 100 MB Limit for single pipeline operator
- [x] Error on memory exceeding
- [x] use wisely and minimum
- [x] use the option allowDiskUse
- [x] Reduce document to preocess by using $match as early as possible to filter out the specific results.
- [x] Reduce the fields per documents , i.e use $project as early as possible just after $match
- [x] Avoid losing index, index is lost after $project,$group or $unwind as they create/split to new document so try using them as late as possible 

            db.getCollection("users").find({})

- **Suppose their is a collection called users and you perform the above query**

            # a result sample
            # json object
            {
                id:"007"
                name:"Jane Doe"
                age:30
                department:"IT"
            }

- **Now as a javascript or any other lang developer you would have to customize/transform this response/document a/c to your needs**

> MongoDB Aggregation to rescue

- **Aggregation refers to the to collect together**

- **It bunches a group of results from document from a collection and the mongodb query can be used to modify/transform the result a/c to your needs**

- **some built in functions like concatination,sorting are baked inside in mongodb query to reduce the network load when our server communicate with DB server as we are kinda filtering out the result and fetching only the data that is required**

---

> MongoDB Pipelines

- **Pipeline is the way how aggregation is implemented in mongodb**
- **It is a set of operators which are executed sequentially act on the documents collection and modify them a/c to our needs**

            pipeline=[op1,op2,op3]

            orgdocument + op1 => modifiedDocument1

            modifiedDocument1 + op2 => modifiedDocumet2

            modifiedDocument2 + op3 => modifiedDocumet3

            # result
            modifiedDocument3

- **Finally the DB query is executed on the modifiedDocument3**

        # Snippet -1
        let pipeline = [{$group:{
            _id: "randomID",
            allAges:{ $sum: "$age" }
            }
        }]
        db.getCollection("users").aggregate(pipeline)

        # output
        
        {
            "_id":"randomID",
            "allAges": 135.0
        }
---

> group pipeline operator $group
- **groups things together or reduce the document in smaller pieces of documents**

            # the id is used kinda of group by id purpose
            $group{
                _id: ""
            }

            # for snippet-1
            $sum will sum up all the ages

- **Snippet-1 will group by id all the documents in the user collection and then will sum up all the ages present in each of the documents** 

- **the $ sign to the right of : in query is used to refer to the key in the document we are reffering to**

        # Snippet-2
        let pipeline = [{$group:{
            _id: "randomID",
            minAge:{ $min: "$age" },
            maxAge:{$max:"$age"}
            },
            avgAge:{$avg: "$age" }
        }]

        db.getCollection("users").aggregate(pipeline)

        # output
        
        {
            "_id":"randomID",
            "minAge": 18,
            "maxAge": 39,
            "avgAge": 27
        }

- **Now say some documents i.e users records ages are same i.e two or more people have same age we want to group by the age and want to know how many people have this age cia countTimes so we can do that via snippet-3**

        # Snippet-3
        let pipeline = [{$group:{
            _id: "$age",
            countTimes: { $sum: 1 }
        }]

        db.getCollection("users").aggregate(pipeline)

        # output
        
        {
            "_id":39,
            "countTimes": 2
        }
        {
            "_id":21,
            "countTimes": 5
        }
        {
            "_id":27,
            "countTimes": 8
        }

---

> $match pipeline operator

- **match is similar to the .Find in mongodb but with match the ability of grouping has quite good advantage**

        let pipeline = [{
            $match:
            {
                "age":18
            }
            
        }]

        db.getCollection("users").aggregate(pipeline)

        # output
        shows multiple or single users entire details/document who have the age 18 in DB 

- **to print the users documents/entry that have javascript mentioned in the languages key**

        let pipeline = [{
            $match:
            {"languages": "javascript"}
            
        }]

        db.getCollection("users").aggregate(pipeline)

        # list all users who have  javascript in their languages key value pair in DB

---

> $limit pipeline operator

- **limit the number of documents that we get from mongo query**

        let pipeline = [
            {
                $match:
                    {"languages": "javascript"}
            },
            {
                $limit: 1
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # their may be multiple users with language as javascript but now the output shows only single user due to limit operator

- **Now say we had another operator 3 after $limit so the output from $match may be multiple doucments cut downs to 1 document due to $limit and then goes to the third operator3 for processing**

---

> $skip pipeline operator

- **skip a certain number of document/documents**

        let pipeline = [
            {
                $match:
                    {"languages": "javascript"}
            },
            {
                $skip: 1
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # it will show all the users with language as javascript but will skip the first user who has language javascript

> **IMPORTANT Pagination is achieved in mongoDB via using $skip and $limit together**

> jump to a particular page/pagination using $limit and $ skip

**Case-> say we want to skip first 50 pages and then limit the results of the 51st page onwards as 10**

        let pipeline = [
            {
                $match:
                    {"languages": "javascript"}
            },
            {
                $skip: 10 * 5
            },
            {
                $limit: 10
            }
        ]

        db.getCollection("users").aggregate(pipeline)

---

> $unwind pipeline operator

- **It takes a array of documents and splits into smaller documents**

        {
            _id:"",
            username:"Jane",
            languages:[
                "c",
                "c++",
                "java",
                "python",
                "javascript"
            ]
        }
        {
            _id:"",
            username:"John",
            languages:[
                "c",
                "c++",
                "java",
                "go",
                "javascript"
            ]
        }

- **we operate the unwind on the above collection**

        let pipeline = [
            {
                $unwind: "$languages"
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # output
        {
            _id:"",
            username:"Jane",
            languages:"c"
        }
        {
            _id:"",
            username:"Jane",
            languages:"c++"
        }
        {
            _id:"",
            username:"Jane",
            languages:"java"
        }
        {
            _id:"",
            username:"Jane",
            languages:"python"
        }
        {
            _id:"",
            username:"Jane",
            languages:"javascript"
        }
        {
            _id:"",
            username:"John",
            languages:"c"
        }
        {
            _id:"",
            username:"John",
            languages:"c++"
        }
        {
            _id:"",
            username:"John",
            languages:"java"
        }
        {
            _id:"",
            username:"John",
            languages:"go"
        }
        {
            _id:"",
            username:"John",
            languages:"javascript"
        }

- **to get douments that start with c**       

        let pipeline = [
            {
                $unwind: "$languages"
            },
            {
                $match:
                {languages: /^c/}
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # output
        {
            _id:"",
            username:"Jane",
            languages:"c"
        }
        {
            _id:"",
            username:"Jane",
            languages:"c++"
        }
        {
            _id:"",
            username:"John",
            languages:"c"
        }
        {
            _id:"",
            username:"John",
            languages:"c++"
        }

> **Using Multiple Operator Example**

- **to group the users data back to its original form via grouping it via username as single document**

        let pipeline = [
            {
                $unwind: "$languages"
            },
            {
                $match:
                {languages: /^c/}
            },
            {
                $group:{
                    _id:"$username",
                    favLanguages:{$push:"$languages"}
                    }
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # output
        {
            _id:"Jane",
            favLanguages:["c","c++"]
        }
        {
            _id:"John",
            favLanguages:["c","c++"]
        }
        
        # original collection

        {
            _id:"",
            username:"Jane",
            languages:[
                "c",
                "c++",
                "java",
                "python",
                "javascript"
            ]
        }
        {
            _id:"",
            username:"John",
            languages:[
                "c",
                "c++",
                "java",
                "go",
                "javascript"
            ]
        }

---

> $project pipeline operator

- **spit out selective fields only**

        # say initial collection is

        {
            _id:"",
            username:"Jane",
            languages:[
                "c",
                "c++",
                "java",
                "python",
                "javascript"
            ],
            age: 21
        }
        {
            _id:"",
            username:"John",
            languages:[
                "c",
                "c++",
                "java",
                "go",
                "javascript"
            ],
            age: 18
        }

        let pipeline = [
            {
                $project:{
                    username:1,
                    languages:1
                    }
            },
            {
                $unwind: "$languages"
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # outputs all the document with the username,languages field only omitting age field

        {
            _id:"",
            username:"Jane",
            languages:"c"
        }
        {
            _id:"",
            username:"Jane",
            languages:"c++"
        }
        {
            _id:"",
            username:"Jane",
            languages:"java"
        }
        {
            _id:"",
            username:"Jane",
            languages:"python"
        }
        {
            _id:"",
            username:"Jane",
            languages:"javascript"
        }
        {
            _id:"",
            username:"John",
            languages:"c"
        }
        {
            _id:"",
            username:"John",
            languages:"c++"
        }
        {
            _id:"",
            username:"John",
            languages:"java"
        }
        {
            _id:"",
            username:"John",
            languages:"go"
        }
        {
            _id:"",
            username:"John",
            languages:"javascript"
        }


- **$project can be used to rename the fields,say we rename username to Name of User**

        let pipeline = [
            {
                $project:{
                    "Name Of User":"$username",
                    languages:1
                    }
            },
            {
                $unwind: "$languages"
            }
        ]

        db.getCollection("users").aggregate(pipeline)

        # same as previous just the username changed to Name Of User

- **to disable any specific field that we dont want we can pass 0 to it say we dont want _id field in response**

        let pipeline = [
            {
                $project:{
                    _id: 0,
                    "Name Of User":"$username",
                    languages:1
                    }
            },
            {
                $unwind: "$languages"
            }
        ]

