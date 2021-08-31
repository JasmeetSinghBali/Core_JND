# OOPS in javascript

> ****for quick revision -> https://medium.com/@luke_smaki/javascript-es6-classes-8a34b0a6720a****

> ****refer stopwatch.js for OOPS implementations****

> ****refer index.js for understanding OOPS concept in depth****

## 4 pillars

- [x] Encapsulation - Binding Props and Methods as a single unit.
  - [x] function with less or no parameters.
  - [x] reduce duplication in the code.
  - [x] implements isolation
- [x] Abstraction
  - [x] hiding inner working from end user
  - [x] Reduce the impact on other parts of the program
  - [x] help to implement specfic paths/functions that can be and cannot be accesed by the user.
- [x] Inheritance
  - [x] Code Reusability
  - [x] Transfer features, prop and methods from one class to another
- [x] Polymorphism
  - [x] Best alternative to switch , if/else statements
  - [x] depending on the input the same function/method acts different in different situation

  ## Benefits of OOPS?
  - [x] Encapsulation = reduce complexity + increase reusability
  - [x] abstraction = reduce complexity + isolate impact of change
  - [x] inheritance = eliminate redundant
  - [x] Polymorphism = refactor ugly switch ,if/else

---

# Objects?
- [x] creating objects
- [x] factory functions and constructor functions
- [x] primitives and reference types(objects as function & array are also objects)
  - [x] primitives are copied by value
  - [x] refference types like objects,array,function are copied by their reference/address.
- [x] working with properties
- [x] private props
- [x] getter /setters

# Some Fun Facts->
- [x] Functions and arrays are objects in javascript
- [x] objects in javascript are dynamic.
- [x] New props can be added or removed a/c to the requirement for objects in javascript.
- [x] Unlike c# or java every time new property/method we want to add we need to first make changes in the class defination however in javascript we can dynamically add prop/methods to the objects in javascript.

- [x] A realtime use case of adding props would be accepting some user credentials from client side and then adding a particular token associated to that user as prop.

- [x] Closure in js helps the inner functions to access the variables and methods declared in the parent scope and helps us to achieve abstraction or creating private props and methods.

- [x] Note closures are permanent i.e it stays always while scope dies after the scope of that block or function ends.

- [x] Object.defineProperty can be used to define getter and setters for private/local scoped variables and methods.
