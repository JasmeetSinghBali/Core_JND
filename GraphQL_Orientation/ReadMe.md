# Graph QL Basics/Core

- [x] ****It is a query language for API's****
- [x] Can be used with existing data
- [x] Can be used for external API's built on RESTful principles


- ****Note-> GraphQL is not a query to databases****

- ****GraphQL is only concerned into hitting endpoint to request data via API****

------------

## Features->

- [x] ****A single endpoint to make GET/POST/DELETE/UPDATE requests****
- [x] ****typically looks like http://example.com/graphql****
- [x] ****Now the client could access the Microservice, REST API via Web,ios,Android with the single endpoint provided by GraphQL to interact with the server resources****
- [x] ****Custom response fields from the API can be configured in GraphQL comparison to REST API****
- [x] ****Multiple query can me merged into Single query****
- [x] ****the core parts in GraphQL is Query,Mutation,Subscription****

-------------

## GraphQL Vs REST API

- [x] For a RESTful API

            GET  http://example.com/users
            POST http://example.com/users
            PUT  http://example.com/users/user_id
            PATCH http://example.com/users/user_id
            DELETE http://example.com/users/user_id

- [x] For GraphQL

            # Any Query(Read Operations) or Mutation(Write Operations) we need a single endpoint
            http://example.com/graphql

            # where graphql is arbitary name could be any other name instead.
----------

## Deep dive GraphQL

#### Query - read data (GET)
#### Mutation- write data (UPDATE,POST,PATCH,DELETE)
#### Subscriptions - Realtime Communications (Like Realtime Web Sockets)

### Refer graphql_server.js Some specific Graphql examples are given below to get you started.


              # Schema Creation (Endpoint Configuration)

              # creating a /greet endpoint that gives a string as response
              buildSchema(`
                type Query{
                  hello: String
                }
                `)

              # for graphiql playground
              query{
                greet
              }
              # hit play button to get response

              # update buildSchema for new endpoint
              # /ask_age that requires a name as String in the body by the user and gives String as a response

              buildSchema(`
                type Query{
                  hello: String
                  ask_age(age:Int!):String
                  # the ! after Int make sures that this param age is required
                }
                `)

              # A resolver to handle the query endpoint /age

              const root = {
                // resolver for /greet
                greet: ()=>{
                  return 'Hello You are in GraphQL World!!';
                },
                // resolver for /welcome
                Welcome:(args)=>{
                  //console.log(args);
                  return `Have a Blessed Day ${args.name}!!`
                }
              }
- [x] ****required & type check can be implemented via '!'****

- [x] ****Some built in Scalar types in graph-ql but their is always room to build own object type like type newobjectName****

            ID
            String
            Int
            Float
            Boolean
            List - []

35 mutation
