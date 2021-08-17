// function inside of another function.

function outerFunction(outerVariable){
  const outside_variable='hi'; // declared outside the scope of the inner funtion
  return function innerFunction(innerVariable){
    console.log('Outer Variable:'+ outerVariable);
    console.log('Inner Variable:'+ innerVariable);
    console.log(outside_variable)// hi still accessible inside the child function as the inner function or scope has the scope for all the outside scope functions.
  }
}

const newFunction = outerFunction('outside');
newFunction('inside');

// outputs
// Outer Variable: outside
// Inner Varaible: inside


//Note
// here the inner function is able to access the outervariable even
// after when the outer function has ended the execution.

// IMPORTANT
// ==================Real World Use cases ===============
// axios,fetch

function outerFunction(url){
  // now the callback in .then is a inner function that is outside the scope of the outer function
  //but still the url declared in putside function scope is accesible inside the .then callback inner function
  fetch(url).then(()=>{
    console.log(`Making request to : ${url}`);
  })
}

// Note -> that the inner function is called only when the outer function has done executing, meanwhile the inner function stores the variable declared it in parent scope so that when parent/outer function  stop executing then also the inner function has access to the outer variable.
