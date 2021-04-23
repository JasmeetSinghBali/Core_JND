//====================== Declaring a async function=========================
async function hello(){
  return `I am a async function`;
}

// the promise will be resolved when the async function returns with a value. like the above function hello(); then it returns with promiseStatus:resolved/fullfilled.


// or like this
const sing=async ()=>{

}

// Note even if we dont mention any return statement in sing function still when we do sing(); it will return a resolve promise with undefined value by default.

// ===============Hanling Promises in async Functions==========================

// Resolving a Promise
sing()
.then((data)=){
  console.log(`Promise handled and async function returns value=>${data}`);
})
.catch((err)=>{console.log(err)})

// Rejecting a Promise and Throwing errors
// Can be done by throwing a error explicitly inside the async function.
// throw new Error('This is a Error Message');

async function hello(){
  throw new Error('Something went Wrong!!');
  return `I am a async function`;
}

hello();// will return a promiseStatus:rejected with promise rejected value the message we passed.

// and now handling both resolve and rejection cases.
// now the catch part will be hit as we have thrown an explicit error inside the hello() async function we declared earlier.
hello()
.then((message)=>{
  console.log(`Resolved:${message}`);
})
.catch((err)=>{
  console.log(`Rejected:${err}`);
});

// ================ Real World Example Code Snippet ============
const login=async(username,password)=>{
  if(!username||!password){
    throw 'Missing Creds!'

  }
  if(password!=='Secret'){
    throw 'username or password is wrong!'
  }
  return 'Welcome';

}

// .then part is hit as password matches Secret.
login('jsdsjdksjd','Secret')//resolved and returns with welcome
.then((data)=>{
  console.log(`${data}`);
})
.catch((err)=>{
  console.log(`${err}`);
})

// .catch part is hit
login('djfkdjfkdf','Something')//rejected and returns error message username or password is wrong
.then((data)=>{
  console.log(`${data}`);
})
.catch((err)=>{
  console.log(`${err}`);
})

// ===================================Await and Async=========================================================
//============= Await replacing .then ================
// ==========Handling async function if promise resolve With Await =============
async function someFunction()=>{
  return 'Message from function for whom you waited!!';
}


const awaitFun=async()=>{
  //storing the data in the variable while awaiting for that function to execute with await keyword.
  const result=await someFunction();//will wait for the someFunction to resolve first.
  console.log(result);
}

// replacing .then with awwait completely even when calling
const printResult=async ()=>{
  await awaitFun();
  console.log("Done");
}

printResult();

// ======== Handling Rejection in Async Function if the promise reject with Await ====================
// try and catch block the function you are awaiting response basically put everything inside a async function in the try block so that to handle errors if in case the await function promise is rejected.
const awaitFun=async()=>{
  try{
    //storing the data in the variable while awaiting for that function to execute with await keyword.
    const result=await someFunction();//will wait for the someFunction to resolve first.
    console.log(result);

  }catch(err){
    console.log(`Caught an Promise Rejection Await Error ${err}`);
  }

}
