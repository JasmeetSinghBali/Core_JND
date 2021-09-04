# MongoDB Aggregation Framework

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