# Core Javascript

By- Jasmeet Singh Bali

## 1.) Execution Context

- [x] Everything in Javascript happens inside Execution Context(a big box with two main components).
- [x] memory (variable environment) + Code (Thread of execution)
- [x] javascript is a single threaded synchronous(blocking architecture).

            # ---------------code snippet-1-----------
            var n =2;
            function square(num){
              var ans = num *num;
              return ans;
            }
            var square2 = square(n);
            var square4 = square(4);

            # after running this code
            # a global context execution is created

            Memory | Code
                   |
                   |
                   |
### Execution Context is created in two phases ->

#### a) Memory Creation Phase
- [x] Allocation of memory space to all variables and functions.

              # for the code snippet-1
              # global execution context first phase

              Memory                 |  Code
              n: undefined           |
              square: {entire        |
                 body of             |
                 the function}       |
              square2: undefined     |
              square4: undefined     |
                                     |
                                     |
- [x] ****undefined is a placeholder for variables declared in the js code, while whole body  of the function act as placeholder for functions in memory allocation.****

#### b) Code Execution Phase



          # for the code snippet-1
          # global execution context Second phase

          Memory                 |  Code
          n: 2                   | initializes value of n and change happens in memory  
          square: {entire        |  Nothing Happens
             body of             |
             the function}       |
          square2: undefined     |   function invocation is understood a new Execution Context is created
          square4: undefined     |
                                 |
                                 |
- [x] ****When a function invocation is encountered a new execution context is created consider it like a nested context execution inside of global execution context****

- [x] ****Same two phases i.e memory creation phase and code execution phase are followed for local/nested context execution for a function invokation****

#### b.1) Local/nested execution context on function invocation

          # for the code snippet-1
          # global execution context second phase square2 with local execution context phase 1 memory creation

          Memory                 |  Code
          square2: undefined     |    Memory               | Code
                                 |   num :undefined        |
                                 |   ans: undefined        |
                                 |                         |

         # global execution context second phase square2 with local execution context phase 2 Code execution

         Memory                 |  Code
         square2: returns 4     |    Memory               | Code
                                |   num :2                | initializes n to 2
                                |   ans: 4                | computation happens ans = 2*2
                                |                         |
- [x] ****control of the program returned back to global context execution from local context execution****

- [x] ****Similar procedure happens for square4 function invocation****

-----

## 2.) Call Stack

- ****All the Execution Context creation,deletion and control transfer happens via Stack i.e a call stack****

- [x] ****At the bottom of the stack is the Global  Execution Context, and when function is invoked and new local execution context is created that local execution context is placed in top of stack.****

                      # LEC- local execution context created during function invokation
                      # GEC - Global execution context created in the beginning of javascript source code.

                      # Call stack managing Execution Context
                      # creation for execution context it is pushed into call stack
                      # deletion for execution context it is
                      pop of the stack

                      |             |
                      |             |
                      | LEC1/LEC2   |
                      | GEC         |
                      ---------------
- [x] ****LEC 1 two phases happens then control goes to GEC****
- [x] ****Similarly then LEC2 is pushed into top of stack it complete its two phases memory creation and code execution and then give control back to GEC****

#### IMPORTANT Call Stack maintains the order of execution of the execution contexts.

-----

## 3.) Hoisting in javascript

- ****Accesing functions or variables even before they are defined or initialized****


                    getName();
                    console.log(x);
                    console.log(getName);

                    var x= 9;
                    function getName(){
                      console.log("Sat-Sri-Akal");
                    }

                    # output
                    Sat-Sri-Akal
                    undefined
                    function getName(){
                      console.log("Sat-Sri-Akal");
                    }
- ****For variable hoisting undefined is output while for function hoisting undefined is not the case****

- ****As explained in earlier section of content execution javascript goes through the entire program and allocates memory to each variable and function in the first phase called memory creation phase so for the case of variable it gives the placeholder undefined to variables hence we saw the undefined in output for hoisting the variables while the function itself when hoisting the functions.****


#### IMPORTANT Making a function act as variable via arrow functions or simple function initialized as value to variable


                    getName();
                    getName2();
                    console.log(x);
                    console.log(getName);

                    var x= 9;
                    var getName = () =>{
                      console.log("Hello World");
                    }
                    var getName2 = function(){
                      console.log("Hello World");
                    }

                    # output
                    error at line getName();

****undefined is allocated to the getName as now it is a variable handled in the context execution****

                  # in first phase

                  Memory                |    Code

                  getName: undefined    |
                  getName2: undefined   |

---

## 4.) Isolated Execution Context for function invocation

- ****Each time a function invocation happens and a local/nested execution context is formed it will we independent of the other local execution context and global execution context****

- ****In the below code snippet-2 the ouput comes out to be 10,100,1. as for a() a seperate local execution context is made with value of x assigned to 10 in code execution phase, while for invocation b() a seperate local execution context is made where x is assigned value of 100 in its code execution phase and the x inside the global execution context has the value assigned to x as 1.****

                # code snippet-2
                var x = 1;
                a();
                b();
                console.log(x);

                function a(){
                  var x = 10;
                  console.log(x);
                }

                function b(){
                  var x = 100;
                  console.log(x);
                }

                # output
                10
                100
                1

#### Conclusion - Each local execution context created due to function invocation is isolated to other function invocation's local execution context also these local execution context are isolated with respect to the global execution context.****

----

## 5.) Shortest javascript program

- ****Consider a index.js empty file this is the shortest javascript program you can write.****

                    # index.js

                    // empty file

- ****Even though the file is empty on running the code their will be a global execution context created in the memory creation phase along with window object and this keyword.****

### Window object?

- ****A global object created by javascript engine along with global exeution context and this keyword ,  t anything can be accesed via window object.****

### this keyword?

- ****At the global level this keyword points to the global object i.e window object.****

                  # at global level like in console in browser
                  input: this === window
                  output: true
----

### 6.) Global Space , window and this keyword relation->
****Any piece of code that is written inside the main index.js file with the condition that piece of code should not be inside of any function is said to be in global space.****

                    # code snippet-3
                    var a = 10;
                    function b(){
                      var b = 100;
                    }

                    # a is in global space
                    # b is not in global space
                    # function b() is in global space

****In the code snippet-3 the variable a and function b are inside global space however the variable b is not in global space rather it is in the local space of the function b****

****Whenever we declare a global space variable or function they get attached to the global window object****

                  # accessing global space variable or functions
                  # for code snippet-3
                  console.log(window.a); //10
                  console.log(a); //10
                  console.log(this.a); //10
                  console.log(b); // undefined error

****Even when we do not mention window the js engine will assume that we are reffering to the global space variable or function****

-----

## 7.) Undefined vs Not Defined

- ****Whenever we define a variable then the execution context in the first phase i.e memory allocation phase will provide a placeholder named as undefined to that variable****

 - ****Not defined is error thrown out by the JS Engine when we are trying to access any variable that has not been assigned any memory by the execution context****

                      # code snippet-4
                      console.log(a); // undefined (for the memory allocation phase)
                      var a = 7;

                      console.log(x); // not defined
                      console.log(a); // 7 (after code execution phase)

#### Important Conclusions/Takeaways

- ****for the code snippet-4 the line console.log(a); represents hoisting in javascript that means accessing variable before they are defined, and the reason  why a hoisted variable gives undefined as output is because of the execution context memory allocation phase as every javascript program on execution will create a memory even before the actual execution of the javascript code happens refer the Execution Context portion.****

- ****An Interesting thing to note is that the state of the variable changes from undefined to not undefined if we have initialized some value to it or provided some value to it in later part of the code****

                      # code snippet-5
                      var a;
                      console.log(a); //undefined
                      a=10;

                      if(a===undefined){
                        consle.log("a is undefined");
                      }
                      else{
                        console.log("a is not undefined");
                      }

                      # output:

                      undefined
                      // for uninitialized variable a

                      a is not undefined
                      // after initializing variable a as 10

---

## 8.) Loosely typed or Weakly typed(flexible like python) JS language Nature

- ****you can put anything and everything at any point of time for a variable****

                    # code snippet -6
                    var a;
                    console.log(a);
                    a=10;
                    console.log(a);
                    a="hello world";
                    console.log(a);

                    # output
                    undefined
                    10
                    hello world

- ****Bad Practice of assigning a variable as undefined as it can lead to unexpected code behavior.****

                    # code snippet -7
                    var a = undefined;
                    console.log(a);
                    # output
                    undefined

----

## 9.) Scope Chain , Scope and lexical environment

#### Scope is the area where a variable or function can be accessed.

                    # code -snippet - 8
                    function a(){
                      console.log(b);
                    }
                    var b = 10;
                    a();

                    # output
                    10

- ****though the function a() has its own local execution context
it can still access the global scope variable b inside of it.****

                    # code snippet -9
                    function a(){
                      c();
                      function c(){
                        console.log(b)
                      }
                    }
                    var b = 10
                    a();

                    # output
                    10

- ****So a global scope variable can be accessed by a nested function also as shown in code snippet-9****

                    # code snippet -10
                    function a(){
                      var b= 10;
                      c();
                      function c(){

                      }
                    }
                    a();
                    console.log(b);

                    # output
                    b is not Not defined

- ****Local scoped variables cannot be accesed inside global scope however global scoped variables can be accesed within local scope anywhere even in nested functions.****

### Scope and lexical environment

                        # for code snippet -10
                        # Call Stack

                        |    LEC for c()                             |
                        |   Memory |  Code                           |
                        |          |                                 |
                        |          |                                 |
                        |          |                                 |
                        |          |                                 |
                        | $lexical env of c()--> lexical env of   a()                                          |
                        |----------------------------------------
                        |    LEC for a()                             |
                        |   Memory |  Code                           |
                        |  b:10    |                                 |
                        |  c:{...} |                                 |
                        | $lexical env of a() -->lexical env of GEC  |                                            |
                        |------------------------------------------- |                                            |
                        |      GEC                                   |
                        |                                            |
                        |   Memory |  Code                           |
                        |  a:{...} |                                 |
                        |          |                                 |
                        | $lexical env of GEC --->null               |
                        |------------------------------------------- |          

- ****IMPORTANT- Each Time a execution context is created a lexical environment is created this lexical environment comprise of local memory+ its parent lexical environment****

- ****Lexical means a heirarchy i.e a sequence.****

                      lexical env of z = local memory of z + lexical env of z's parent

- ****IMPORTANT - For the code snippet-10 we can say that  function c() is sitting in the lexical scope of a function of a() i.e c() is lexically inside a(),while a() is lexically inside global scope.****

- ****So for the LEC c() its lexical env is pointing i.e reffering to the lexical env of a(), so c() will have access to lexical env of a() also.****

### Scope Chain

- ****When inside of local execution context for a nested function and we are trying to access a variable that is defined inside the global scope then first the search begins inside of the local env and memory if not found it goes to the parent lexical env and searches their and so on until it either finds that variable or reaches to lexical env as null(parent of global execution context) this process or way of accessing/finding variable or function is called Scope Chain.****

## Conclusion -> The Combination of lexical env. and parent references constitute for Scope Chain Mechanism which in fact  is used in accessing variable and functions in different scopes throughout the javascript program.

## Key Takeaways

****say z is a function invocation then a execution context is created with memory and code along with this a lexical env is also created for z.****

****Lexical env. of z = local memory of z + lexical env. of z's parent****

****Scope Chain Mechanism = lexical env. + references to  parent****

****Scope chain mechanism is used to understand where a particular variable or function is accessible.****


-----

## 10.) Let & Const in JS , What is Temporal Dead Zone?

- ****Let and const declarations are also hoisted but they are in the temporal deadzone unlike var.****

                    # code snippet-11
                    console.log(b); // undefined
                    console.log(a); // cannot access a before initialization as it is in temporal dead zone
                    let a = 10;
                    console.log(a); //10
                    var b = 100;

- ****What is happening behind the scenes why we are not able to hoist the let variable.****

- ****the let and const are in temporal dead zone****

> ****Temporal dead zone means the time between the let or const is hoisted and the time it was initialized with a value****

                  # for the code-snippet 11
                  # a is assigned a seperate memory space with placeholder as undefined

                  console.log(a)
                  # when the above line runs then
                  Script(seperate memory space assigned to a)
                  a:undefined
                  # also the temporal dead zone starts from line console.log(a)
                  let a = 10;
                  # the temporal dead zone ends when we initialized value of a as 10

> ****IMPORTANT Whenever a variable that is currently in temporal dead zone is accessed it results in referrence error****

> ****Conclusion So the variables defined by let and const can only be accesed after the temporal dead zone is over i.e when that let or const variable is initialized****


#### Scope of var VS let/const

> ****the var keyword variables are attached to window object i.e in global space****
> ****while the let and const are attached to seperate memory space and cannot be accesed via window object or in global scope****


#### Why to use let/const vs var

- [x] ****Strict behaviour of let and const do not allow duplicate name declarations.****
- [x] ****let/const declared variables cannot be accessed globally, hence supporting Isolation of certain parts of code to other parts of code****
- [x] ****using let/const make the code output more predictable then the  variables declared via var****

                  let a =100;

                  var a=100; // Syntaxerror a is already declared

                  var b=10;
                  var b=1; //no error

- [x] ****const has one more level strictness than let, we have to initialize const variable a the time of declaration.****

                  const a; //Syntaxerror initilize missing while declaration

                  const b =100;
                  b=10; // Typeerror const cannot be assigned new values in later stage

#### How to avoid temporal dead Zone

> ****Conclusion-> Minimize the temporal dead zone window to 0 by declaring and initializin the let/const variable at the beginning of the program as much as possible****

-----

## 11.) BLOCK,SCOPE & Shadowing in Javascript

### Block?
                      # an empty block
                      {
                        //Compound statements
                      }
> ****IMPORTANT Block combines multiple statements as a single unit so as javascript can execute multiple lines of code as multiple lines inside block act as single unit****

                      # no use of block single line possible only
                      if(true) true;

                      # with use of block
                      # multiple lines can be written as a single unit where javascript expects only single statement
                      if(true){
                        const a =100; // line1
                        console.log(100); //line 2
                      }

### Block Scope?

                    {
                      // variables or
                      //functions that can be accessed inside this block
                      // is called BLOCK SCOPE
                    }

- ****When we run the  code snippet-12 a Block scope is created where  b and c are present  while a is insidel global scope even if it is declared inside a block****

                    # code snippet -12
                    {
                      var a = 10;
                      let b = 100;
                      const c = 1000;
                    }
                    console.log(a); // 10
                    console.log(b); //  referrence error
                    console.log(c); //  referrence error
                    # Inside debugger

                    # Block
                    b: undefined
                    c: undefined

                    # Global
                    a: undefined



> ****that is the reason let and const are in block scope i.e seperate scope, and we can only access a in global scope while b and c in the block scope.****

### Shadowing in javascript

****The variable declared inside the block takes preference i.e shadows the same named variable declared outside the block****

                  var a= 100;
                  {
                    var a=10;
                    console.log(a);

                  }

                  # output
                  10

****In addition to shadowing the var keyword variable will modify the same name variable value declared in the global scope****

                  var a = 100;
                  {
                    var a=10
                    console.log(a);
                  }
                  console.log(a)

                  # output
                  10
                  10

### Case : Let keyword

****Shadowing happens in let also****

****However In contrast to var the let keyword declared variable do not alter the value of the same let keyword variable in the global scope****

                  let b = 100;
                  {
                    let b = 20;
                    console.log(b);
                  }
                  console.log(b);

                  # output
                  20
                  100

                  # debugger

                  # Script
                  b: 100

                  # Block
                  b: 20

                  # Global

> ****IMPORTANT - Shadowing works the similar way for the function scope also****

                  const c=100;
                  function x(){
                    const c = 30;
                    console.log(c);
                  }
                  x();
                  console.log(c);

                  # output
                  30
                  100

### I'llegal Shadowing

                  # illegal shadowing
                  let a= 20;
                  {
                    var a =10;
                  }

                  # output
                  SyntaxError a has already been declared

                  # legal shadowing
                  # case-1
                  let b =20;
                  {
                    let b=2;
                  }
                  # output
                  No error runs perfectly

                  # case-2
                  var c =20;
                  {
                    let c=2;
                  }
                  # output
                  No error runs perfectly

> ****IMPORTANT From the above code snippet the point to note is that shadowing can only happen if a particular variable do not cross the boundry for the case of illegal shadowing declaring a var a inside a block will give error as the var keyword will be in the global scope and not in the block scope****


                  let a= 20;
                  function x(){
                    var a =10;
                  }

                  # output
                  No error perfectly runs

> ****IMPORTANT the arrow function behaves the same as normal function when Block Scope rules & shadowing  are considered****

---

## 12.) Closures in javascript


- **Function bind together with its lexical environment/scope(its local+parent scope)**

          function x(){
            var a = 7;
            function y(){
              console.log(a)
            }
            y(); 
          }
          x();

          # output
          7

          # debugger for line 
          # console.log(a) 
          Closure(x)
          a:7

- **returning a function inside function**

          function x(){
            var a = 7;
            function y(){
              console.log(a)
            }
            return y; 
          }
          let res = x();
          console.log(res);

          # output
          F:y(){
            console.log(a);
          }

- **though after returning from x() x is completely vannished from call stack, still y() will remember the variables and functions associated to it in closure**

        # the inner function remembers the binding variables and the functions due to closure and even after the function that calls inner function gets vanished from call stack the inner fnction will remember the refferences to the outer function.

        function x(){
            var a = 7;
            function y(){            
              console.log(a)     
            }
            return y; 
          }
          let res = x();
          res();

          OR

          function x(){
            var a = 7;
            return function y(){            
              console.log(a);     
            } 
          }
          let res = x();
          res();

          # output
          7

- **so whenever the inner function is returned within the other function then it is actually returning the closure of inner function+its lexical scope and it remembers the refferences to its parent**

        
- **Some output prediction questions on closures**

          function x(){
            var a = 7;
            function y(){            
              console.log(a);     
            }
            a = 100;
            return y; 
          }
          let res = x();
          res();

          # output
          100

- **remember the inner function on returning also returns the refference(original address) of the parent scope/lexical scope variables, and changing the value will direclty change that parent scoped variable also as shown above code**

- **A multilevel closure**

          function z(){
            var b = 900;  
            function x(){
              var a = 7;            
              function y(){
                console.log(a,b);
              }     
            y();
            }
            x();
          }
          z();

          # debugger at console.log(a,b)
          Closure (x)
          a:7
          Closure (z)
          b:900


## Uses of Closures
- Module Design Pattern
- Currying
- Functions like once
- memoize
- maintaining state in async world
- setTimeouts
- Iterators

---

## setTimeout + Closures Interview Questions


            function x(){
              var i = 1;
              setTimeout(function(){
                console.log(i);
              },3000)
            }
            x();

            # output
            # prints 1 after 3 second from 
            # the time the x is called
            1

            function x(){
            var i = 1;
            setTimeout(function(){
              console.log(i);
            },3000);
            console.log("olaaa");
          }
          x();

          # output
          olaaa
          #after 3 seconds
          1

- **Remember tide,time and javascript dont wait for anyone**

- **Tricky question problem is to print number from 1 to 5 like 1 should print after 1 second 2 should print in 2 second and so on**

            function x(){
            for(var i=1;i<=5;i++){
              setTimeout(function(){
              console.log(i);
            },i * 1000);
            }
            console.log("olaaa");
          }
          x();



          # output
          olaaa
          6
          6
          6
          6
          6

- **the above code gives such output due to closure since the setTimeout callback is reffering to the memory space of i by the time the console.log(i) is executed the loop has already incremented to 6 and thus each time the console.log(i) now executes it prints 6.**

- **to solve this problem we can use let instead of var, as let has block scope and each time loop runs i is a new variable altogether i.e new copy of i is made i.e different memory location is used for each changed value of i when using let**

          function x(){
            for(let i=1; i <= 5; i++){
              setTimeout(function(){
              console.log(i);
            },i * 1000);
        }
            console.log("olaaa");
        }
        x();

        # output
        olaaa
        1
        2
        3
        4
        5

- **IMPORTANT Solution without using let via help of closures i.e making a function and putting the setTimeout inside of it so that each time the innerfunction is called it creates new memeory location for i**

          function x(){
          for(var i=1; i <= 5; i++){
            # making a explicit closure for setTimeout
            function close(i){
              setTimeout(function(){
                  console.log(i);
                },i * 1000);
            }
          # we are calling the close()  function with new copy of i  different memory location
          close(i);
          }
          console.log("olaaa");
      }
      x();

          # output
          olaaa
          1
          2
          3
          4
          5

---

## 13.) First Class Functions, Anonymous Function


> function statement (as simple function defination) aka function declaration

            function a(){
              console.log("a was called")
            }

> function expression (assigning function to variable so that function act as value for a variable)

            var b = function {
              console.log("b called")
            }

> difference in function statement & function expression

- **hoisting**

            a();
            b();

            function a(){
              console.log("a was called")
            }

            var b = function {
              console.log("b called")
            }

            # output
            a is called
            b is not a function

- **the function statement during memory creation phase get the memory allocated while for the case of function expression accessing b before it is defined causes error as b is a variable not a function**

> Anonymous Function

- **No identity of its own i.e no name**
- **anonymous function are used in the place where function act as values for variables i.e function expression**

            function(){
              
            }
            # output
            syntax error function statements requires function name

            # anonymous function as function expression
            var b = ()=>{
              console.log("b is called")
            }

> difference in Parameter & Arguments

- **Parameters are labels,identifiers mentioned at the time of function declaration**

- **the paramaeters are local scoped wrt to the function it belongs to**

- **arguments are given at the time of function invocation/calling**

            function fun(params1,params2){
              // do something
            }

            fun(arg1,arg2);

> First Class Function

- **the ability of function to be used function as arguments , returned as values from function**

            function fun(){
              // do something
            }

            var xyz=()=>{
              //do somehting
              console.log('xyz is called')
            }
            // first class functions
            fun(xyz);

            # return function within function

            var b=(param1)=>{
              //do somehting
              return function xyz(){

              }
            }
            
            console.log(b());

            # output
            f xyz(){

            }
            
> functions are first class citizen or functions are first class i.e the ability of functions to be used as value,passed inside another function as argument,to be returned function withing function make them first class citizen in javascript.

---


## 14.) Callback Functions in Javascript & Event Listeners for finally understanding Event loop


> Callback Functions in Javascript

- **as we know functions are first class citizen in addition to that when we pass a function as value/argument/parameter to another function then it act as callback function.**


> **javascript is a synchronous blocking & single threaded language but with help of callbacks async operations and architecture can be implemented.**

            # example of callback function

            function x(y){

            }
            x(function y (){

            })

            # here function y is a callback function

  
- **setTimeout takes a callback function it is passed to setTimeout and is executed sometime else in the program**

- **javascript wont wait for 5000 seconds instead it will execute the x and y functions and after that it will print timer when 5 seconds have been achieved**

- **javascript and time wont wait for anyone**

            setTimeout(function(){
              console.log("timer");
            },5000);

            function x(y){
              console.log("x");
              y();
            }

            # first class function y passed as argument while x invocation
            x(function y(){
              console.log("y");
            });

            # Output
            x
            y
            # after 5 seconds
            timer

> Blocking the main thread

- **everything in javascript is executed via call stack, every code executed is executed from call stack hence call stack represent the execution thread for javascript program**

- **so if any operation blocks the call stack then it is known as blocking the main thread**

- **since only single call stack is their so best practices i.e use async and await for the operations that takes time to prevent them from blocking the call stack i.e main thread**

> Creating an event listener in javascript via callback function

- **example a button on click event when triggered will call the callback function.
          
          # html
          <button id="clickMe">Click me</button>

          # javascript
          document.getElementById('clickMe').addEventListener("click",xyz()=>{
            console.log("button was clicked");
          });

          # debugger
          # every time button is clicked on html page xyz() is pushed into the call stack

          # call stack

          |          |
          |          |
          |          |
          |          |
          | xyz()    |
          |----------|

- **suppose we want to have a counter for how many times the button was clicked the best practice is to use a variable and that must be in closure with the eventlistener callback**

             function attachEventListener(){
               let counter = 0;
               document.getElementById('clickMe').addEventListener("click",xyz()=>{
               console.log("button was clicked",++counter);
              });
             } 

             attachEventListener();

             # now the callback xyz() forms a closure with attachEventListener hence is ablte to access counter.

             # output
             button was clicked 1
             button was clicked 2
             button was clicked 3

             # call stack
              
              |          |
              |          |
              |          |
              |          |
              | xyz()    |
              |----------|

            # see event listners handlers you will observe closures their in dev tools

> Garbage collection and remove event listeners

- **why it is essential to remove eventListeners whenever eventListener is created it forms a closure and it effects memory space and even when call stack is empty still the functions and variables in the closure are occupying space hence occupying space**

- **too many eventListeners can cause slowing down of the applications**

- **so removing eventListeners help in garbage collection i.e freeing up the memory space**

---

## IMPORTANT 15.) Asynchronous javascript and Event Loops

> call stack

- **call stack is present inside the js engine , only the code that goes inside call stack get executed**


          function a(){
            console.log('a');
          }
          a();
          console.log(end)
          # GEC is first to be created and pushed into call stack

          # for function envocation new execution context is created
          
          # call stack

          |         |
          |         |
          | LEC a() |
          | GEC     |
          |---------|

          # console
          a
          #LEC  a() is popped of the call stack

          |         |
          |         |
          |         |
          | GEC     |
          |---------|
          
          # GEC also pops and finally the program finishes

- **call stack dont waits it just executes the top element in stack and then pops it repeats this procedure until it is empty**


> async or task that are to be intentionally delayed

- **the call stack cannot push any script that has mentioned to run it after some seconds as call stack has no timer**

- **so to execute code after certain delay we make use of the Browsers features**

          # Browser

          url
          localstorage
          timer
          geolocation
          and lot of other feature

- **so the js engine access the features of browser via WEB API's**

- **note setTimeout is not a part of javascript all the features available in Web Api's are not part of javascript even console.log is not part of javascript**

          # Web API's
          window(global object)
            setTimeouts()
            DOM API's
            fetch()
            localStorage
            console
            location

- **the global object window helps to acess the Web Api's features inside the call stack**

- **since window is global object we dont need to mention window keyword prepended with the web Api's we can directly use the web API's**

        setTimeout(); //actually is window.setTimeout()

> Event Loop & the callback queue

- **to execute a callback it must be present inside the call stack this is achieved via the event loop and callback queue**

        console.log('start');
        setTimeout(function(cb){
          console.log("callback");
        },5000)
        console.log('end');

        # output
        start
        end
        
        # while the cb in the setTimout is still waiting for 5 seconds

- **how things unfolded first start and end statment immediately executed and GEC is pop of the call stack but the cb is still waiting for 5 seconds when the 5 seconds are completed the callback is placed inside the callback queue**
        
        # callback queue

        |--------------
        | cb
        |--------------

        # event loop (gatekeeper)
        will be keeping the account for the functions/callbacks inside the callback queue and then place these call back from queue to the call stack for execution.

        event loop -> cb -> call stack

        # call stack

        |  |
        |  |
        |  |
        |cb|
        ----        

        #output
        start
        end
        callback

> event loop

- **The main job of event loop is to constantly monitor the call stack and callback queue and remove the cb from queue and pushes inside call stack**

> callback queue need

- **say thier is click event listener and user clicks the button 5-6 times then their would be 5-6 cb in the callback queue and they will be removed and pushed into call stack a/c to the time they have occured.**

        # callback queue
       |----------------
       | cb cb cb cb
       |----------------

       # their is sequential removal from callback queue and pushed into call stack via event loop

> IMPORTANT fetch() working 


            console.log("start");

            setTimeout(function cbT(){
              console.log("CB setTimeout");
            },5000);

            fetch("http://someurl/someresource")
            .then(function cbF(){
              console.log('CB fetch');
            });

            console.log("End")

            # console
            start
            end
            # by this time GEC is popped of the call stack

            # for async fetch task and setTimeout callback

            # callback queue

            |------------
            |
            |------------

            # now cbT is waiting for 5 seconds to complete

            # and cbF is waiting for response from server

            # say the cbF is put into callback queue first as the response time taken is
             5 ms cbF< 5 sec of cbT

- **microtask queue is similar to callbakc queue but the it is of higher priority the functions that go inside this microtask queue will be the first ones to get pushed into call stack for execution**

             # Microtask queue

             since cbF<cbT in terms of time

             |---------
             |cbF
             |--------

             #event loop will monitor the callback queue 

            # callback queue

            |-------
            |cbT
            |-------

            # event loop will give the chance to microtask queue first

            |       |
            |       |
            | cbF   |
            |-------|

            # console

            start
            end
            CB fetch

            same thing happens now for cbT inside callback queue

            start
            end
            CB fetch
            CB setTimeout

> Microtask queue interview question

- **since microtask queue is given priority over the callback queue what type of tasks can come inside the microtask queue**

> **IMPORTANT All the callback functions that are result of promises will go inside the microtask queue**

> **all the mutation observer i.e the changes in the DOM tree  goes inside microtask queue**

---

###  Starvations of function in callback queue

- **suppose their are three promises or mutation observer inside the microtask queue and 1 cb in callback queue so the 1 cb in callback queue will only get the chance to get executed when all the 3 microtask has been executed.**

          # microtask queue

          |---------------
          | p1CB p2CB moCB
          |---------------

          where p1CB - promise 1 callback
          moCB- mutation observer callback

          # callback queue
          
          |---------------
          | cb
          |---------------

          cb - simple callback

          #  first the p1CB,p2CB,moCB are executed then cb is executed once microtask queue is empty and hence callbacks in the callback queue will be starved

---

## 16.) [].map(), [].filter(), [].reduce() (higher order functions)

> Map function

- **It is used to transform an array**

              const arr = [5,1,3,2,6]
              # transform means change each value of the array and return a new array

              # example of transformations
              # double
              [10,2,6,4,12]
              # triple
              [15,3,9,6,18]
              # binary
              [101,001,011,010,110]

              function double(x){
                return x*2;
              }

              function triple(x){
                return x*3;
              }

              function binary(x){
                return x.toString(2);
              }
              const tple = arr.map(triple);
              const dble = arr.map(double);
              const bin = arr.map(binary);
              console.log(tple);
              console.log(dble);
              console.log(bin);

              const bin2 = arr.map((x)=> return x.toString(2));

> filter function

- **It is used to filer values inside the array**
- **like we want to filter out all the values that are odd**

            const arr = [5,1,3,2,6];

            // filter out all the odd values

            function isOdd(x){
              return x%2; // returned false for 2 and 6
            }
  
            const output = arr.filter(isOdd)
            console.log(output);
            # [5,1,3]

            function isEven(x){
              return x % 2 === 0; // returns false for 5,1,3
            }
            const result = arr.filter(isEven);
            console.log(result);
            # [2,6]

            function greaterThanFour(x){
              return x>4;
            }
            const res = arr.filter(greaterThanFour);
            console.log(res);
            # [5,6]

            # OR

            const res = arr.filter((x)=>{
              return x > 4;
            });
            # output
            [5,6]

> reduce function (iterate over an array and find a single value as result) act more like aggregation than reduction

- **It does not reduce anything it is named incorrectly💀**
- **reduce is used where we have multiple values in array and we want to come up with a single value as a final result.**

- **reduce callback function has two parameters acc(accumaltor) & curr(current) while reduce has two parameters itself one callback and one initial value of the accumalator**
                 
                 # curr represents the value of each iterated element in the array
                 # while acc is used to accumalate or store the final result
                 [].reduce((acc,curr)=>{
                 },accInitialValue)

                 const arr = [5,1,3,2,6];

                 # =========without using the reduce approach========
                 // find sum
                 function findSum(arr){
                   let sum = 0;
                   for (let i = 0 ; i<arr.length;i++){
                     sum+=arr[i];
                   }
                   return sum;
                 }

                 # ============ The reduce way =============
                 const output = arr.reduce((acc,curr)=>{
                   acc = acc + curr;
                   return acc;
                 },0);
                 console.log(output);
                 # 17

                 // find max number
                 // =========== without using reduce ============
                 function findMax(arr){
                   let maxNumber = arr[0];
                   for (let i = 1 ; i<arr.length;i++){
                     if(arr[i]>maxNumber){
                       maxNumber = arr[i]
                     }
                   }
                   return maxNumber;
                 } 

                 // ======== With reduce method =============
                 const maxResult = arr.reduce((maxNum,curr)=>{
                   if(curr>maxNum){
                     maxNum=curr;
                   }
                   return maxNum;
                 },0)
                 console.log(maxResult);
                 # 6

> ( IMPORTANT )Realtime use cases for map,filter,reduce

                # consider array of objects like api data
                const users = [
                  {firstName:"bhaiya",lastName:"ji",age:25},
                  {firstName:"teenager",lastName:"bacha",age:14},
                  {firstName:"jawan",lastName:"launda",age:25},
                  {firstName:"baba",lastName:"yoda",age:60},
                ];

                # get the list of full names
                const res = users.map((user)=>{
                  return user.firstName + " "+ user.lastname;
                });

                console.log(res);
                # Output
                ["bhaiya ji","teenager bacha","jawan launda","baba yoda"]

                # how many users have a particular age i.e return a single object with key as age and value as number of people with that age

                const output = users.reduce((acc,curr)=>{
                  
                  // for subsequent occurences
                  if(acc[curr.age]){
                    acc[curr.age] = ++acc[curr.age];
                  }
                  // for the first time
                  acc[curr.age] = 1;
                  return acc;
                },{});
                console.log(output);
                # output
                { 25 : 2 , 14 : 1 , 60 : 1 }


> Chaining map,filter and reduce

                # find out people first name whose age is less than 30
                const result = users.filter((user) => return user.age < 30)
                .map((x) => return x.firstName);
                console.log(result);

                # output

                ["bhaiya","teenager","jawaan"]

                const result = users.reduce((acc,curr)=>{
                  if(curr.age<30){
                    acc.push(curr.firstName);
                  }
                  return acc;
                },[]);

                 



---

##  17.) Functional Programming in javascript and What are Higher Order Functions

- **higher order functions helps to implement functional programming**

> Higher order function

 
