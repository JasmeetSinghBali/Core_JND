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
