//- Step-1 Require Dependancies like express,mongoose etc...
const {productsName,productsPrice}=require('./seedHelper.js');
const MongooseModel=require('./models/mongoosemodel');
//- Step -2 Connect to Database


//A function to which passing the array and return random elemetn from that array
const sample=(array)=>{
  array[Math.floor(Math.random()*array.length)];
}

const seedDB=async()=>{

  // FIRST Delete your entire data in the Collection of Mongoose.
  //await MongooseModelName.deleteMany({})// to delete everything in the mongoDB database where MongooseModelName is the model u required in the server/app/index.js of your app.
  for(let i=0;i<50;i++){
    const random=Math.floor(Math.random()*30);
    const newData=new MongooseModel({
      prod_name:`${sample(productsName)}`,
      prod_price:`${sample(productsPrice)}`
    })
    await newData.save();
  }

}


seedDB();//execute to populate and fill the data in the MongoDB database


// ================ the above seedDB will save  50 new objects with prod_name and prod_price as property.=========================
