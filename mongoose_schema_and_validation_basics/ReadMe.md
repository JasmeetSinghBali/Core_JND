# Mongoose , Schema And Validations Basics

****Level : Beginner****

## Topics Covered :

#### Mongoose CRUD Basics
####
####
####

***

## Mongoose & Mongoose Drivers

****https://mongoosejs.com/****

- ****Mongoose is a ODM object data mapper****
- ****Mongoose helps to interact with the collections in MONGODB atlas****

- ****Important : ODM's like Mongoose map documents coming from the datatbase into usable javascript objects.****

- ****Mongoose provides ways for us to model out our application and define a Schema. It offers easy ways to validate and build complex queries.****

***

## Mongoose CRUD Basics

#### STEP 1 : Connect to the mongoDB atlas via URI.

          npm i mongoose
          const mongoose=require('mongoose');
          mongoose.connect("mongod://localhost:27017/test",
          {
            useNewUrlParser:true,
            useUnifiedTopology:true
            })// to avoid deperacation warnings

- ****default mongo port is 27017****

- ****to make sure u connected to MONGODB and handling errors****

        try{
          mongoose.connect("mongod://localhost:27017/test",
          {
            useNewUrlParser:true,
            useUnifiedTopology:true
            })
            .then(()=>{
              console.log('MongoDB connected')
              })
            .catch((err)=>{
              console.log(err)
              })

        }catch(err){
          console.log('Not connected');
        }

#### Step 2 : Creating Mongoose model

****The permitted Schema types are: String,Number,Data,Buffer,Boolean,Mixed,ObjectId,Array,Decimal,Map****

        const Schema = mongoose.Schema;
        const userSchema= new Schema(
          {
            title:String,
            author:String,
            body:String,
            comments:[
            {
              body:String,
              data:Data
            }
            ],
            date:{
              type:Date,
              default:Date.now
            },
            hidden:Boolean,
            meta:[
            votes: Number,
            favs: Number
            ]
          }
          )
          mongoose.model('User',userSchema);// we have a User collection
          const user=new User({
            title:"User1",
            author:"Admin Created at Dawn!"
            });// create a new user
          user.save(); // save to database

### Step 3 : Basic methods of mongoose

#### ****InsertMany****

          User.insertMany(
            {title:"User2",author:"Garewa created"},
            {title:"User3",author:"Admin created"},
            {title:"User4",author:"Troll army created"},
            {title:"User5",author:"Customer created"},
              )
              .then((data)=>{
                console.log(data);
                })
              .catch((err)=>{
                console.log(err);
                })

#### ****Find With Mongoose****
