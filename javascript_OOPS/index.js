// creating objects
// object literals -> {}
// object in javascript are key:value pairs
// let circle = {
//   radius:1,
//   location:{
//     x:1,
//     y:1
//   },
//   draw:()=>{
//     console.log('draw')
//   }
// };
//
// circle.draw();

// circle object has three members 2 props radious and location and 1 method/function as draw()
// props hold value and method define some logic on the props



// =========================================================
// whenever a object has a behaviour i.e method/function that are more than 1 we use factories and constructors

// factory functions and constructors

//factory function
// function createCircle(radius){
//   return {
//     radius,//radius : radius
//     draw:()=>{
//       console.log(`draw a circle with radius ${radius}`);
//     }
//   }
// }

// const circle = createCircle(1);
// circle.draw();

// constructor function
// this is refering to the object that is execution the Circle() code
// function Circle(radius){
//   console.log('this',this);
//   this.radius = radius;
//   this.draw = ()=>{
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(1);
// console.log(objCircle.constructor);
// console.log(circle.constructor);

// when new keyword is used
// {} empty object is created
// and this points to this---> {}
// and then finally returns an object inside the scope where this is decalred
// above line means return this is automatically done
// by default this ---> global object(window in case of browser/global in case of node.js env)


// ===========================================
// constructor property
// we have constructor property for varius data types we dont usually use them instead we use the literal approach
// new String(); // instead we use '',"",``
// new Boolean(); // true,false
// new Number(); // 1,2,3.....


// So to Sum up
// Every object has constuctor property that refers to the function that was used to create that object

//================================================
// functions are objects in javascript

// function Circle(radius){
//   this.radius = radius;
//   this.draw = ()=>{
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(1);
// console.log(Circle.name);
// console.log(Circle.length);
// js engine uses Function constructor to create Circle object
// console.log(Circle.constructor);

// manually creating a Circle1 object with the Function constructor
// const Circle1 = new Function('radius',`
//   this.radius = radius;
//   this.draw = ()=>{
//     console.log('draw');
//   }
// `);
//
// const objCircle1 = new Circle1(1);
// console.log(objCircle1);

//=====================================================
// primitives and references types

// primitive int,boolean,string,number
// completely independent pf each other
// let x = 10;
// let y = x;
//
// x=20;
// console.log(x);// 20
// console.log(y);// 10

//reference type like object,array,function
// let x = {value:10};
// let y = x;
// x.value=20;
// console.log(x);// {value:20}
// console.log(y);// {value:20}

// what is happening in reffernce type
// x holds the address where the object {value:10} is stored
// so y=x is copying the address/refference of the object {value:10} copied
// this means after y=x x & y are pointing to the same address in the memory

// scope and primitives dealing with independent copies
// let number = 10;
//
// function increase(number){
//   number++;
//   console.log(`Inside increase local scope
//     -> local number:${number}`);
// }
// increase(number);
// console.log(`global scope -> number: ${number}`); //10

// as we know the global scope cannot access the local scope variables and functions.

// =================================================
// scope and refernece types dealing with same reference/address
// any change made to one reffernce is reflected to other refferenced types variables
// let obj  = {value:10};
//
// function increase(obj){
//   obj.value++;
//   console.log(obj); //11
// }
// increase(obj);
// console.log(obj); //11

// ===================================================
// Adding & Removing Properties
// object in javascript are dynamic
// function Circle(radius){
//   this.radius=radius;
//   this.draw = ()=>{
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(10);

// add a prop named location = {x:1,y:1} to objCircle object
// objCircle.location={x:1,y:1};
// console.log(objCircle);// will have a location property now

// 2nd way to add a new prop to object
// objCircle['shade']= {back:"yellow",front:"red"};
// console.log(objCircle);
// now the objCircle will have a prop named shade


// deleting a specific property say we want to remove certain details when responding to client like users credit card info
// delete objCircle.location;// or objCircle['location']
// deletes the location prop for the objCircle


//========================================
// Enumerating Properties
// function Circle(radius){
//   this.radius=radius;
//   this.draw = ()=>{
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(10);

// iterating over the props & method of the object
// for (let key in objCircle){
//   console.log(key);
// }
// output
//radius
//draw

// to acess the value of props use bracket notations
// for(let j in objCircle){
//   console.log(j,objCircle[j]);
// }
// output
//radius 10
//draw f(){.....}

// to only get the properties not the methods
// for (let i in objCircle){
//   if(typeof objCircle[i]!=='function'){
//     console.log(i,objCircle[i])
//   }
// }

//output
// radius 10

// to get all the keys in object
// const keys = Object.keys(objCircle);
// console.log(keys);

// to check wheather a prop is in object or not
// if('radius' in objCircle){
//   console.log('Circle object has radius property present in it.');
// }


// ==================================
// Abstraction

// without abstraction
// function Circle(radius){
//   this.radius=radius;
//   this.defaultLocation = {x:0,y:0};
//   this.computeOptimumLocation = function(factor){
//     //..
//   }
//   this.draw = ()=>{
//     this.computeOptimumLocation(0.1);
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(10);
// objCircle.draw()


// with private props(usin let) and methods abstraction
// and closure
// function Circle(radius){
//
//   this.radius=radius;
//   // private prop and method with let
//   let defaultLocation = {x:0,y:0};// cannot be accesed with the object
//   let computeOptimumLocation = function(factor){
//     //..
//   }
//   this.draw = ()=>{
//     // private props & method
//     // accesible inside of draw due to closure
//     computeOptimumLocation(0.1);
//     console.log(defaultLocation);
//     // object props accesed via this
//     console.log(this.radius);
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(10);
// console.log(objCircle);// radius & draw only accesible via this object now as the defaultLocation & computeOptimumLocation are private


//=======================================
//getter and setters to acess private methods or props
// function Circle(radius){
//
//   this.radius=radius;
//
//   let defaultLocation = {x:0,y:0};
//
//   this.getDefaultLocation=()=>{
//     return defaultLocation;// can be accesed due to closure
//   }
//
//   this.draw = ()=>{
//     console.log('draw');
//   }
// }
//
// const objCircle = new Circle(10);
// objCircle.getDefaultLocation(); // {x:0,y:0}

//===================================
// IMPORTANT
// 2nd way to define getter/setter function via Object.defineProperty(this,'PropNameYouWant',{ get:()=>{return something}})
function Circle(radius){

  this.radius=radius;

  let defaultLocation = {x:0,y:0};

  this.draw = ()=>{
    console.log('draw');
  }

  Object.defineProperty(this,'defaultLocation',{
    get: ()=>{
      return defaultLocation;//accesible due to closure
    },
    set: (value)=>{
      if(!value.x || !value.y){
        throw new Error('Invalid location');
      }
      defaultLocation = value;
    }
  });
}

const objCircle = new Circle(10);
objCircle.defaultLocation(); // {x:0,y:0}
objCircle.defaultLocation = 1;// error due to the if condition in the set method
