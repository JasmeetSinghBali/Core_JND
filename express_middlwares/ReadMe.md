> # Middlewares

> ## Topics Covered

### > What are Express middlewares
### >  Morgan logger middleware  (Already done in Full stack project travel-bucket-list App)
### > Defining our Own middleware
### > Handling 404 with Middlewares as error handling route & protecting Specific Route

***

> ### Express middlewares

- ****middlewares functions that run during the request/response lifecycle****

- ****Example express.static ,body-parser middleware,express.json() etc.****

- ****middleware can end the HTTP request by sending back a response with methods like res.send()****

- ****OR middleware can be chained together ,one after another by calling next()****

- ****An express Application is basically a series of middleware function calls****

##### What can a middleware do?

- Execute any code
- Make changes to request and response objects
- End the request-response cycle
- Call the next middleware function in the stack

***
***
> ### Defining Our Own Middleware!

#### SRC: https://expressjs.com/en/guide/writing-middleware.html


- ****In express when we do app.use(express.json()) this means that the .json() middlware is going to be executed in between all type of request GET,POST,PUT,DELETE****

- ****If we dont mention next() in the middleware we define then the request response cycle just ends their****

- ****Specifying the return next() makes sure that the control is not passed back to the initial middleware who in the first place called  next() inside them to pass the control to next middleware****

         app.use((req,res,next)=>{
           console.log('This is my first middleware');
           return next(); // we are calling the next middleware or the next route handler
           })
         app.use((req,res,next)=>{
          console.log('This is my second middlware');
          return next();
          })

***
***

> ### IMPORTANT : Handling 404 with Middlewares as error handling route & protecting Specific Route

- ****Protecting a specific route with an auth middleware that runs when we hit a specific route in below case /api/route****

         const authMe=(req,res,next)=>{
           console.log('This is the message from the auth middleware...beeep..booop...Authenticating');
           next();
           });

        app.get('/api/route',authMe,(req,res)=>{
          console.log('Hey you reached the actual route after the auth middleware!')
          });

- ****A 404 not found middleware route place these types of route at the end of all routes or as last route in the server/index.js so that if no route is hit then this route get hit****

        app.use((req,res)=>{
          res.send('Not Found');  
          })
