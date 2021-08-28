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
6:10 timestamp function in js

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
