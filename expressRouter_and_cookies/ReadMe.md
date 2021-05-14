> ## Express Routes and Cookies

> ### Prerequisites
- [x] Javascript
- [x] Express
- [x] Node.js

> #### Topics Covered:

- [x] ****Splitting Up the routes for large and complex applications****

- [x] ****ExpressRouter and Middleware to specific routes****

- [x] ****Introduction to HTTP cookies****

- [x] ****Sending Cookies & cookie parser****

- [x] ****Signing Cookies****

- [x] ****HMAC(Hashed based message authentication code) signing****
>### Splitting,grouping up complex routes

****Example****

- An app with products & their supplier route as

        GET /products
        GET /products/:id
        POST /products/new
        PUT  /products/edit

        GET /dealers
        GET /dealers/:id
        POST /dealers/new
        PUT /dealers/edit

- ****Instead of just placing them in our server.js/index.js we can group them****

            routes
              |--products.js
                   |--GET
                   |--POST
                   |--PUT
              |--dealers.js
                   |--GET
                   |--POST
                   |--PUT

****Example to set up express router for products routes****

            //In products.js

            const express=require('express');
            const router= express.Router();

            // /products
            router.get('/',(req,res)=>{
              res.send('GET all products');
              });

            // /products/:id
            router.get('/:id',(req,res)=>{
                res.send('GET one product');
                });

            // /products/new
            router.get('/new',(req,res)=>{
                  res.send('POST create new product');
                  });

            // /products/edit
            router.get('/edit',(req,res)=>{
                    res.send('PUT Edit product');
                    })

            module.exports=router;


****Now you can require these product routes in index.js/server.js****

            // server.js/index.js

            const productRoutes=require('./routes/products');

            // use the routes we required in the server.js

            // this will prefix all the product routes with /products to /edit,/:id etc..

            app.use('/products',productRoutes);

> ### ExpressRoutes and middlewares

****Say u want a middleware to be applied to the routes you defined in previous example****

             routes
               |--products.js
                 |--GET
                 |--POST
                 |--PUT
               |--dealers.js
                 |--GET
                 |--POST
                 |--PUT
               |--admin.js(middleware)

  ****in admin.js****

        const express=require('express');
        const router= express.Router();

        router.get('/topsecret'(req,res)=>{
          res.send('Secret Route');
          });

        router.get('/deleteall'(req,res)=>{
          res.send('delete all');
          });

        module.exports=router;

****now in server.js****


        const adminRoutes=require('./routes/admin');

        // middleware that will be applied to all the routes mentioned in server.js
        router.use((req,res,next)=>{
          if(req.query.isAdmin){
            next();
          }
          res.send("Sorry not found")
          })

       app.use('/admin',adminRoutes);

****However if we want to apply this middleware only to admin routes we can alter the admin.js and remove this middleware entirely from server.js****

        const express=require('express');
        const router= express.Router();

         // middleware only applied to these routes
         router.use((req,res,next)=>{
           if(req.query.isAdmin){
             next();
             }
            res.send("Sorry not found")
            })

          router.get('/topsecret'(req,res)=>{
              res.send('Secret Route');
              });

          router.get('/deleteall'(req,res)=>{
              res.send('delete all');
              });

        module.exports=router;

***
> ### Introduction to cookies(types of caching)

****See cookies in Chrome : Go to inspect->Application->storage->cookies****

> #### Uses
- [x] Session management
- [x] Personalization
- [x] Tracking (contoversial legislature involved)

****Cookies are small bit of info that are stored in a user's web browser****

****Once cookie(key:value pair say color:purple) is set , a user's browser will send the cookie on every subsequent request to the site.****

****Cookies allow use to make HTTP stateful****

****Example a user prefer dark mode then this will be set as cookie in the user browser and when the same user makes a request to access your web app then the dark mode will be set by default as this time the request by the user has also key value pair(cookie) as mode:dark set that is sent with the second time request****

***

> ## Sending Cookies & cookie-parser middleware

refer : https://expressjs.com/en/4x/api.html#res.cookie
refer: https://www.npmjs.com/package/cookie-parser

****to give a random name(kinda ID) to the user who visit our page first time and then when next time they visit we identify via the cookie and greet them with that name****

          const express=require('express');
          const app=express();
          const cookieParser=require('cookie-parser')

          app.use(cookieParser())

          // when user hits this route then he will be getting the cookie stored with /setname route
          app.get('/greet',(req,res)=>{
            console.log(req.cookies);// will give us cookie as object {name:'garewa bro'} that we set primarily.

            const {name}=req.cookies;

            res.send(`Hey Their ${name}!`);
            });

          // when user hits this route then a key value pair as name:garewa bro is set and we can see that in dev tools application-storage-cookies section

          app.get('/setname',(req,res)=>{
            res.cookie('name','garewa bro');
            res.send('Cookie sent to You!');
            })

          app.listen(3000,()=>{
            console.log("Server up!");
            })

***

> ## Signing cookies (res.cookie('name', 'tobi', { signed: true }))

- ****In programming domain generally signing is basically reffered to as digital signature/cryptographic signature/hash this is to verify the integrity of the data/cookie sent.****

- ****Example you send a letter to your friend with a unique wax seal and then when your friend gets that letter with that unique wax seal in intact then we can say that the integrity of that letter is still intact i.e nobody read it****


          const cookieParser=require('cookie-parser');

          // passing a secret that will be used for signing cookies we send.

          app.use(cookieParser('thisismySecretforSigningCookies'));

          // so we are sending fruit and grape as name and value and signed with our secret that we defined above.

          app.get('/getsignedcookie',(req,res)=>{
            res.cookie('fruit','grape',{signed:true});
            res.send('Signed fruit Cookie Sent!');
            })

          // .signedCookies will give us the {fruit:grape}
          app.get('/verifyfruit',(req,res)=>{
              console.log(req.signedCookies)
              res.send(req.signedCookies)
              })

***

> ## HMAC(Hashed message authentication code) signing (Important & Advanced)

refer: https://github.com/tj/node-cookie-signature/blob/master/index.js

- ****Digital signature are cruicial in bitcoin,etherium cryptographical digital currency system****

- ****To understand the procees of HMAC refer https://www.freeformatter.com/hmac-generator.html****

- ****The basics in HMAC is that every time a digital signature is verified it basically recreates the signature and then compares with the initial signature and then comes to the conclusion wheather the data/cookie/token was tampered if the signature differs.****
