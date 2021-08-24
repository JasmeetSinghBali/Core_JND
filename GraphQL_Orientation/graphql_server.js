const express= require('express');
const app = express();
const PORT= process.env.PORT || 5000 ;

// graphql config
const {buildSchema}= require('graphql');
const {graphqlHTTP} =require('express-graphql');
const axios = require('axios');

let message = "This is a old message";

// creating a read endpoint /greet
// that responses with Welcome to GraphQL World...
// greet:String defines the response type from the greet endpoint
// type User is a graphql object type User with name,age and college
const schema = buildSchema(`
  type Post {
    userId: Int,
    id: Int,
    title: String,
    body: String
  }

  type User {
    name:String
    age: Int
    college: String
  }

  type Query{
    greet: String!
    Welcome(name:String,dayofweek: String!): String
    getUser: User
    getUsers:[User]
    getPostsFromExternalAPI: [Post]
    message: String
  }

  input UserInput{
    name:String!
    age:Int!
    college:String!
  }

  type Mutation{
    setMessage(newMessage:String!): String
    createUser(user:UserInput):User
  }

  `);
  // insted of below long params defining we can define a input type
  //createUser(name:String!,age:Int!,college:String!):User
// ! make sure that the return type is string and when given for params like name and dayofweek it makes them required
// define a resolver to define what response will be generated after a Query or Mutation
const root = {
  // resolver for /greet
  greet: ()=>{
    return 'Hello You are in GraphQL World!!';
    //return null
  },
  // resolver for /welcome
  Welcome:(args)=>{
    //console.log(args);
    return `${args.dayofweek}, Have a Blessed Day ${args.name}!!`;
  },

  getUser:()=>{
    const user = {
      name: 'Raman',
      age: 26,
      college: 'Oxford'
    }
    return user;
  },

  getUsers:()=>{
    const users = [
      {
        name: 'Raman',
        age: 26,
        college: 'Oxford'
      },
      {
        name: 'sham',
        age: 19,
        college: 'NASA'
      },
      {
        name: 'Raman',
        age: 21,
        college: 'Bradford'
      }
    ];
    return users;
  },

  getPostsFromExternalAPI:async()=>{
    const url= "https://jsonplaceholder.typicode.com/posts";
    const result= await axios.get(url);
    return result.data;
  },

  // updating resolver for changing the message
  setMessage:({newMessage})=>{
    message=newMessage;
    return message;
  },

  // for old message
  message:()=>message,

  createUser:(args)=>{
    // we created a new user input type object rather than hardcoding into single line while doing mutations.
    console.log(args);
    return args.user;
  }
}

// creating graphql endpoint
//http://localhost:5000/graphql
// graphqlHTTP is a middleware
// graphiql is the playground to test different responses when making query ,mutation ,subscription via graphql
app.use('/graphql',graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue:root
})
);



app.listen(PORT,()=>{
  console.log(`Server started at ${PORT}`);
})
