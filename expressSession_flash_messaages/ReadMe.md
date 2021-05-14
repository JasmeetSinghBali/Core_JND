> ## Express Session and flash Messages

Prerequisites:

- [x] javascript
- [x] cookies Basics
- [x] express
- [x] Nodejs

> ## Topics Covered:

- [x] ****Intro to Express sessions****
- [x] ****Setting up Express sessions****
- [x] ****integerating Flash messages****

***

> ### Intro to Sessions(server-side http stateful)

- ****Cookies is a client side tech to save data of user in the browser that is not a secure way to do things instead session managment is a server side tech to do the same with large amount of data stored in the DB/server side which  is a more secure way****

> #### Example Important Use Cases

- [x] ****To determine who is currently logged in.****
- [x] ****whats the person username who is logged in.****
- [x] ****what is in the shopping cart of the logged in user.****

> #### Why to use Session vs Cookie

- ****Cookie support small data****
- ****Cookie are less secure than Session.****

> #### NOTE- that the database mentioned below is not reffering to the actual/core database of any application the session can be based on different database particularly to store cookies on server side like the "REDIS" database.

       DATABASE(Server Side Storing Session Data)

       {
         id:1,------------------->|
         shoppingCart:[           |
         {                        |
           item:'lime',qty:1      |
         },                       |
         {                        |
          item:'lemon',qty:2      |
         }                        |
        ]                         |
       },                         |---------|>>>>
                                            |>>>>        SERVER --YOUR SESSION ID IS 2--|====>>>>
                                                                                        | ====>>>>  CLIENT >>>>>>>> (A DAY AFTER) Hey I got a cookie for you SESSION ID 2 >>>>>> SERVER >>>>>>>> DATABASE-------->  {id:2,shoppingCart:[{item,qty}]}
                                            |>>>>                                       |===>>>>
       {                          |-------->|>>>>
         id:2,------------------->|
         shoppingCart:[
         {
           item:'carrot',qty:4
         },
         {
          item:'taser',qty:6
         }
        ]
       }

***

> ## Setting Up Express Session
