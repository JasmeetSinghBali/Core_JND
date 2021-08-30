# Core Javascript

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
