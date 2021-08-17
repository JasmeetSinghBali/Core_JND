const myname = 'Jazzy B'

function printName(){
  console.log(myname);
}

myname= 'Jazz';

printName();// Jazz

// the latest value will be picked by the printName
myname= 'Jack Ryan';

printName(); // Jack Ryan

// the above entire code is like a big closure


// Note in languages other than javascript we cannot access variables declared outside of the function.

// However it is possible in javascript to access a variable declared outside the function to be accessible inside an function.
// like the myname in above code.


// for the above example we have two scopes, one scope for the entire closure.js file and one scope of the function printName,
// Now this printName can access the outer scope i.e the scope of the closure.js file.
