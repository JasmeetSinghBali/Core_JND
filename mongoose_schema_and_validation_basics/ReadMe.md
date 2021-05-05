# Mongoose CRUD Basics, Schema And Validations Basics

****Level : Beginner****

## Topics Covered :

#### Mongoose CRUD Basics

#### Mongoose Schema Validations

#### Model Instance , Static method & Virtuals

#### Defining Mongoose middleware
***

## Mongoose & Mongoose Drivers

****https://mongoosejs.com/****

- ****Mongoose is a ODM object data mapper****
- ****Mongoose helps to interact with the collections in MONGODB atlas****

- ****Important : ODM's like Mongoose map documents coming from the datatbase into usable javascript objects.****

- ****Mongoose provides ways for us to model out our application and define a Schema. It offers easy ways to validate and build complex queries.****

***

## Topic-1 : Mongoose CRUD Basics

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
***

### ****Find With Mongoose****

#### ****find****

- ****Note mongoose queries are executed when we use find methods. these mongoose queries are not promises. these queries have .then() but to make it fully fledged promise use .exec() function also the find() returns array.****

- ****consider a model named Data****

            Data.find({}).then(data=>console.log(data));
            // will give us all the data of the collection named Data

            Data.find({id:1}).then(data=>console.log(data);
            // will give the info about the collection document that has id 1.

            Data.find({name:'Admin'}).then(data=>console.log(data));
            // will give info about the user with name as Admin from the Data collection.

            Data.find({year:{$gte:2015}}).then(data=>console.log(data));
            // will give info about the Data with year as greater than or equal to 2015

            lt // for less than
            lte // for less than equal

#### findOne()

            Data.findOne({}).then(d=>console.log(d));
            // will give the first match only i.e gives only one result.

#### await and exec()

            const getData=async()=>{
              try{
                await Data.findOne({id:1}).exec();
              }catch(err){
                console.log(err.stack);
              }
            }

#### findById()            

            await Data.findById(id).exec();


***

### Updating with mongoose

- ****Note- that update() in mongoose will only update the first document that matches the filter regardless of multi options. use replaceOne() if want to overwrite an entire document rather than using atomic operators like $set.****

#### updateOne()

            Model.updateOne({title:'Amadeus'},{year:1984}).then(res=console.log(res))
            // here the docment with title as Amadeus year will be changed to 1984 and then the res will show {n:1,nModified:1,ok:1}

#### updateMany() ,Update multiple things at once

            Model.updateMany({title:$in:['Amadeus','Stand By Me']},{rating:10}).then(res=>console.log(res))
            // will update the rating to 10 for the document with title Amadeus and Stand by Me.

#### findOneAndUpdate()

- ****by default spits back the old version to get back the object with updated value/version we need to pass option named new:true will return the modified document****

            var query={name:'borne'}
            Model.findOneAndUpdate(query,{name:'jason mamoth'},options,callback)

            Model.findOneAndUpdate({title:'Iron Giant'},{rating:6},{new:true}).then(m=>console.log(m))
***

### Deleting Using mongoose

-****.remove()****

            Model.remove({title:'Amelia'}).then(mes=>{console.log(mes)});
            // {n:1,ok:1,deletedCount:1}

#### deleteMany()

            Model.deleteMany({year:{$gte:1999}}).then(mes=>{console.log(mes)});
            // {n:2,ok:2,deletedCount:2}

#### findOneAndDelete() returns the deleted document.

            Model.findOneAndDelete({title:'Ice Age'}).then(m=>{
              console.log(m)
              });
            // returns the document with title Ice Age that we deleted.

***
> ## -----------Mongoose CRUD Basics Ends Here------------
***

## Topic-2 : Mongoose Schema Validations

- ****IMPORTANT Operation Buffering allows us to use the Models we create without waiting for mongoose to establish connection this is because mongoose buffers model function calls internally.****

- ****mongoose will not throw any error by default if we use model without connecting.****

             Model.findOne(
               (err,res)=>{
                 /*
                 no error reported
                 */
                 });
            mongoose.connect('url',{useNewUrlParser:true});


#### Declaring a Schema with the Data type and required kinda validations.

            const productSchema=new mongoose.Schema({
              name:{
                type:String,
                required:true
                },
              price:{
                type:Number,
                required:true
                },
              isOnSale:{
                type:Boolean
                required:false
                default:false
              }
              })

            const Product=mongoose.model('Product',productSchema);

#### Creating a new instance of our mongoose Schema

            // note that we passed 499 as string which will not result in error as the mongoose schema validation accept something that can be turned into a number in the price prop of this Schema

            // alos the color:red will not be saved and mongoose does not return any error .
            const bike=new Product({name:'Mountain Bike',price:'499',color:'red'});

            // save this new document to the productSchema Colleciton
            bike.save().then(data=>{
              console.log(data);
              }).catch(err=>{
                console.log(err.errors.name.properties.message);
                });

#### Schema Constraints

           default :sets a default value for that prop
           required : returns false if the prop associated to it is not mentioned at the time of creation of new instance of the schema.
           select : specifies fixed set of options to select.
           validate : Adds a user defined custom validator function for Validations.
           get : defines a custom getter for the property
           set :defines a custom setter for the property
           alias: defines a virtual with the given name that gets/sets the property
           immutable : defines prop as immutable unless the parent document has isNew:true
           transform : Mongoose calls this function when you call Document#toJSON()

****Examples****

           const sampleSchema =new Schema({
             integerOnly:{
               type:Number
               get:v=>Math.round(v),
               set:v=>Math.round(v),
               alias:'i'
             }
             })

            const Number=mongoose.model('Number',sampleSchema);

            const doc=new Number();
            doc.integerOnly=2.0001;
            doc.i //2

### Other Schema Constraints for Data types

****String****

           lowercase : to call toLowerCase() on the value before saving to the DB.
           uppercase : to call toUpperCase() on the value before saving to the DB.
           trim :to call .trim() on the value
           match: Regexp,create a validator that checks if value matces the regular expression.
           enum: Array ,creates a validator checks that the value is in the given array
           minlength: Number
           maxlength: Number

****Similarly for Number refer docs.****

****To have a String of Arrays****

           prop:{
             type:[String],
             default:['']
           }
           // this prop will now accept the array of String elements in it.
***

#### Validating Mongoose Updates NOTE- By default the mongoose schema validations are not applied when we use methods like .update()

- ****to tell mongoose to use the validations we defined we have to pass extra option as runValidators:true****


           const Model= new Schema(
             {
               title:String,
               price:{
                 type:Number,
                 min:10
               }

             }
             )

            Model.findOneAndUpdate({title:'Ice Age'},{price:-100},{new:true,runValidators:true});

            // the above will not be executed as we have specified price to be min 10 and mongo gonna apply that validator as we specified the option runValidators:true

#### Mongoose Validation Custom Error Message

****Example****

            // it will show an custom Cheap message if the user set price below 10
            const Model= new Schema(
              {
                title:String,
                price:{
                  type:Number,
                  min:[10,'Cheap Price must be above 10']
                }
              })

****enum hard coded options for a prop value****

            // so size acceptable values are only S,L,XS,XL
            {
              size:{
                type:String,
                enum:['S','L','XS','XL']
              }
            }


***
# Topic -3
## Instance Methods

- ****you can define your own method on instance of the Model in mongoose****
- ****cannot use arrow function as this will act weirdly if we us the arrow syntax****
- ****this refers to the instance of the mongoose model****

           Model.methods.mymethod=function(){
             // do something
           }

           const productSchema=new Schema({name:String,type:String});

           productSchema.methods.greet=function (){
             console.log('Hi how are you');
           };
           const Product=mongoose.model('Product',productSchema)

           const p=new Product({name:'bike',price:10});
           p.greet();// Hi how are you


          // here this refers to the particular instance of the Product
          productSchema.methods.incPrice=function(){
            this.price+=100;
            return this.save();
          }

          const findProduct=async()=>{
            const foundProduct=await Product.find({title:'bike'})
            await foundProduct.incPrice();
            console.log(foundProduct);
          }

## Model Static methods

****here this refers to the Model Product itself not its instances****

-****Syntax to define a static method on model instance****

          productSchema.statics.changeName=function(){
            return this.updateMany({title},{title:'Null'}) // if  {} as first parameter in updateMany means updating everything
          }

          const findProduct=async()=>{
            await Product.changeName();
            console.log(foundProduct);
          }

## Mongoose Virtuals

****gives us ability to add property to Schema without actually that property not being occupying any space in the mongoose database hence called virtual property****

          // get function
          const personSchema=new mongoose.Schema({
            first:String,
            last:String
            })

          personSchema.virtual('fullname').get(function(){
            return `${this.first} ${this.last}`
            })

          const Person=mongoose.model('Person',personSchema)
          const tammy=new Person ({first:'Tammy', last:"chow"})
          tammy.fullname;// Tammy chow

          // set function
          personSchema.virtual('fullname').set(function(v){
            this.name.first=v.substr(0,v.indexof(' '))
            this.name.last=v.substr(v.indexof(' ')+1);

            })
          tammy.fullname="William Rose"
          //so now the full name of tammy chow is actually William Rose

## defining Mongoose middlewares

- ****these middlewares are pre or post hooks basically certain actions that can be done before or after certain methods on the model****

-****.post will be executed after the method specified and .pre middleware that is executed before the method****

          var schema =new Schema({//something});
          schema.pre('save',async(next){
            // do stuff before saving
            await something();
            console.log('Just before saving')
            next(); // pass control to the save method
            })

         // message doc._id has been removed is displayed after the remove method on the model instance has completed.
         schema.post('remove',async(doc){
           await something();
           console.log('just after removing');
           console.log(`${doc._id} has been removed`);
           })
