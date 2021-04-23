# Async Javascript Basics

****
****Level: Intermediate****
****
## Topics Covered:

#### Javascript & Call Stack

#### Browser Help for multiple execution as JS Single Thread

####  CallBack Hell & why need Callback in the first place

#### Promises & Promise magic with promise Chaining

#### Creating Promises and Handling Promises(.then , .catch)

#### Async Functions

****
****
### The call stack

#### LIFO rule
- A mechanism javascript uses behind the scene.
- It is how javascript manages function calls.
- It basically helps javascript interpreter  what functions are currently running and what functions are called from within that function.

- Example a bookmark in the book that helps us to know where we left of reading.

***

### How javascript works with call stack

- when a script calls a function the interpreter adds it to the call stack and then starts executing the function.

- Any functions that are called by that function are added to call stack  further up  and run where their calls are reached.

- when the current  function is finished the interpreter takes off that Completed function off the stack and resumes execution where it left off in the last coding.

#### Example of function calling function

    {
      const multiply= (x,y)=>x*y
      const square =x=>multiplt(x,x);

      const isRightTriangle=(a,b,c)=>(
        square(a)+square(b)===square(c)
      )
    }

#### So in the call stack first isRightTriangle is in the call stack then square is put in the stack and then multiply is put into stack and multiply is executed and removed then square executed and removed and so on....

To visualize how call stack execution works in Javascript
http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

# Debugger in google chorme inspect

### go to inspect->sources->app.js->click on the line of code u want to make the breakpoint.

### now the javascript interpreter will only execute the code till the breakpoint .no code after this breakpoint(mark as red dot) will be evaluated.

### a down arrow on bottom left corner(step into the next function call)
in chrome also helps us to know step execution that helps in debugging purposes and to know how the call stack makes & stores the function calls.
***
## Web API's & Single Threaded

#### JS is Single threaded.

#### It means at a given point of time Single JS thread is running at most one line of JS code.

## Workaround is to setTimeout()
      console.log("Sending reqeust to server")
      setTimeout(()=>{
        console.log('I give data after 3 seconds');
        },3000);
      console.log('Loading...')

### So the above code Output is

      Sending request to server
      Loading...
      I give data after 3 seconds
### So who is the one actually handling request

#### Its the browser(written generally in c++) the browser handles the request and the timeout and after they have completed those request it delivers to the call stack as function calls so that javascript can operate.

***
## Callback Hell

    setTimeout(()=>{
      console.log("1 second")
      setTimeout(()=>{
        console.log("2 seconds")
        setTimeout(()=>{
          console.log("3 second")
          },1000)
        },1000)
      },1000)

### the outer(1 sec) most setTimeout is run then the inner(2 sec) and then the innermost(3 sec)

## Why we need Callbacks

### when cases where One condition or function is executed and after it is completed we want the next function to be executed only after the first/previous one has already executed then we need callbacks.

## How to Avoid Callback Hell !!

#### - Promises
#### - Async Functions

***

****(Important)****
## Promises Intro

#### It gives a eventual guarentee wheather something is good or bad i.e resolved or rejected.

#### It is an object representing the eventual completion or failure of an asynchronous function.

### they are handlers of asynchronous function  & their eventual success or failure.

#### Promise Vs Nested Callback Hell

// THE CALLBACK VERSION

    const fakeRequestCallback = (url, success, failure)
      =>  {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
        }, delay)
      }

// THE PROMISE VERSION

    const fakeRequestPromise = (url) => {
      return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
        })
      }

## Promises Basics

#### When we call a promise based javascript function it returns a promise object that has promiseStatus:pending/resolved/rejected.

#### A promise object has promiseStatus and promiseValue.

#### So in this appraoch the callback is attached to the promise object itself unlike in the callback hell case where coder needs to explicitely provide success and failer callbacks for each function and then success and failure for the previously defined success and failure callbacks so on that leaded to callback hell.

### .then()

#### if promise is resolved i.e success then we use .then()
#### pass a callback inside .then() to do something.

    const request=fakeRequestPromise('something/api/product');
    request.then(()=>{
    console.log('promise resolved');
    })

### .catch(err)

#### if the promise returns failure i.e rejected

    const request=fakeRequestPromise('something/api/page1');
    request
    .then(()=>{
      console.log('Success!! Page 1');
      fakeRequestPromise('something/api/page2');
      request
      .then(()=>{
        console.log('Success!! Page 2 ');
      })
      .catch(()=>{
        console.log('Error!!');
        })
    })
    .catch(()=>{
      console.log('Error!!');
      })

#### Above code displays how a chained/nested promises look like.

## PROMISE CHAINING
## The magic of Promises with return IMPORTANT

    const request=fakeRequestPromise('something/api/page1');
    request
    .then(()=>{
      console.log('page1');
      return fakeRequestPromise('something/api/page2');
      })
    .then(()=>{
      console.log('page2');
      return fakeRequestPromise('something/api/page3');
      })
    .then(()=>{
      console.log('page3');
      })
    .catch(()=>{
      console.log('One of the promise was rejected!!');
      })

### WE ARE RETURNING A PROMISE WITHIN THE CALLBACK.

***

## Advanced:Topic
### new Promise((resolve,reject)=>{})
## IMPORTANT HOW TO CREATE YOUR OWN PROMISES LIKE THE fakeRequestPromise WE USED EARLIER.

      new Promise((resolve,reject)=>{

        })
#### It expects a callback function with two parameters resolve and reject u can name them what ever u like but the order matters as the resolve is for Success and reject for failure.

#### resolve() calling it will automatically lead to promiseStatus:resolved.

    new Promise((resolve,reject)=>{
      resolve();
      })

#### reject() calling it will automatically lead to promiseStatus:rejected.

     new Promise((resolve,reject)=>{
            reject();
            })
****
#### Custom Promise Code Snippet

****refer the custom_promise.js****
****
## Async Functions

#### Cleaner Syntax makeup for Promises.

### async keyword is use to declare a function as a async function.

### whenever we declare a async function it will automatically return a promise. i.e we dont need to mention return new Promise explicitely.

### if function returns a value then promise will be resolved if function returns a exception the promise will be rejected.

## Await keyword

### await keyword can only be used inside a async function.

### await will pause the execution of the function, waiting for the promise to be resolved or rejected.

### Refer async_basics.js for code example.
