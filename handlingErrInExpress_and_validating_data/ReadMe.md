> # Handling Errors in Express App & Validating Data Both Client Side and Server Side

> ### Prerequisite :
- [x] javascript
- [x] Node.js
- [x] Express
- [x] Mongoose,MongoDB
***
> ### Topics Covered:

> - [x] #### Client Side validation with Bootstrap.
> - [x] #### Setting up Error Handling Route if something goes wrong while editing,get,post routes.
> - [x] #### Defining ExpressError Class & catchAsynch wrapper  for asynch routes that replaces try catch block.(CAN BE DONE WITH ALL THE ROUTES IN YOUR APP)
> - [x] #### Error handling  route for Invalid route/path & using ExpressError Class that we defined earlier.
> - [x] #### How to avoid the postman foul request via Server side validation.
> - [x] #### Defining an Error Template/view in ejs.
> - [x] #### JOI Schema Validations & Middleware for Database/backend Basically Server Side validations
***
> ### Their can be two approaches for validating forms, input from the user.

- ****Browser native validation like the required that makes the input field mandatory to be filled with some value.****

      <input type="text" required>
      // but it is less precise and can be unpredictable certain times.

- ****Custom , developer defined Validation on the Basis of backend/database , more flexible and precise validation.****

> ## Bootstrap Client Side Validation
refer:https://getbootstrap.com/docs/5.0/forms/validation/

- ****we specify a novalidate in the form tag as attribute so that bootstrap can take over the validation part from the browser.****

        <form class="needs-validation" novalidate>

- ****in form validation the input you want to validate just specify required in their tag****

- ****Now we use javascript to make our custom styled validations****

         (function(){
           'use strict'
            const forms=document.querySelectorAll('.needs-validation')

           Array.from(forms)// makes an array from forms
           .forEach(function(form){
             form.addEventListener('submit',function(event){
               if(!form.checkValidty()){
                 event.preventDefault();
                 event.stopPropagation()
               }
               form.classList.add('was-validated')
               },false)
             })
           })()

- ****We can add success messages also with a div class valid-feedback placed just below that input tag.****

            <input type="text" required>
            <div class="valid-feedback">
              Text validated ! Looks Good
            </div>

***
> # Basic General Error handler which will be hit every time something goes wrong.

- **** a post route to create new product****

      app.post('/product',async(req,res,next)=>{
        try{
          const product=new Product(req.body.product);
          await product.save();
          res.redirect(`/products/${product._id}`)
        }catct(e){
          next(e) // pass control to general error handling route.
        }
      })


**** our general error handling route ****

      app.use((err,req,res,next)=>{
        res.send(`Something Went Wrong! Error:${err}`)
        })

***

> ## Defining ExpressError Class & catchAsynch wrapper  for asynch routes that replaces try catch block.

**** make a file ExpressError.js****

          class ExpressError extends Error{
            constructor(message,statusCode){
              super();
              this.message=message;
              this.statusCode=statusCode;
            }
          }

          module.exports=ExpressError;

**** make a catchAsync.js ****

          // here we return a function that accepts a function and then it execut's this accepted function and catches error and pass it to next.
          module.exports=func=>{
            return (req,res,next)=>{
              func(req,res,next).catch(next);
            }
          }


**** in your server/index.js specify this catchAsync as the wrapper function for the new product creation route to replace the try catch block in the routes CAN BE DONE WITH ALL THE ROUTES IN YOUR APP****

          const catchAsync=require('./catchAsync');

          // pass catchAsync as wrapper
          app.post('/product',catchAsync(async(req,res,next)=>{
            const product=new Product(req.body.product);
            await product.save();
            res.redirect(`/products/${product._id}`)
            }));

***

> ## To set up a Error handling  route that hits for invalid route request & use custom ExpressError Class.

           // we defined earlier see above sections
           const ExpressError=require('./ExpressError');



           app.all('*',(req,res,next)=>{
             next(new ExpressError('Page/Route Not Found',404))
             })

            app.use((err,req,res,next)=>{
              const {statusCode=500,message='Something Went Wrong'}=err;/* where 500,something went wrong  are default and the original statusCode and message are coming from the above app.all i.e ExpressError class  or the catchAsync wrapper.*/
              res.status(statusCode).send(message);

              })

***

> ## How to avoid the postman foul request via Server side validation.

          app.post('/product',async(req,res,next)=>{
            if(!req.body.product) throw new ExpressError('Invalid Product Data',400);
            const product=new Product(req.body.product);
            await product.save();
            res.redirect(`/products/${product._id}`)
            });

> ## Defining an Error Template/view in ejs.

- ****make a new error.ejs prints error message and err.stack for development help in Deployment the err.stack can be replaced by a 404 error image or just a confused minion image****

         <div class="row">
          <div class="col-6 offset-3">
           <div class="alert alert-danger" role="alert">
             <h4 class="alert-heading"><%=err.message%><h4>
             <p><%=err.stack%></p>
           </div>
          </div>
         </div>


- **** in server.js/index.js render the error.ejs when error handler is hit ****

         app.use((err,req,res,next)=>{
           const {statusCode=500}=err;
           if(!err.message) err.message='Oops!';

           /* rendering the error.ejs and passing the entire error to it*/
           res.status(statusCode).render('error',{err});
            })

***
> ## JOI Schema Validations & Middleware for Database/backend Basically Server Side validations
refer https://joi.dev/api/

           // say we have a product model
           product={
             title:String,
             price:Number
           }


           const productSchema = Joi.object({
             product:Joi.object({
               title:Joi.string().required(),
               price:Joi.number().required().min(0)

             }).required()
           })

           // now this will validate/check the input that is passed by the user in req.body against the productSchema we defined with JOI.
           const {error}=productSchema.validate(req.body);
           if(error){
             /* Since details is array of [[object]] for showing the array details correctly we map it and then show it as string by joining the different messages via ,*/
             const message=error.details.map(el=>el.message).join(',');
             throw new ExpressError(message,400);
           }

> #### JOI middleware

- ****In your server.js/index.js place before all routes****

           const validateProduct=(req,res,next)=>{
             const productSchema = Joi.object({
               product:Joi.object({
                 title:Joi.string().required(),
                 price:Joi.number().required().min(0)

               }).required()
             })

             // now this will validate/check the input that is passed by the user in req.body against the productSchema we defined with JOI.
             const {error}=productSchema.validate(req.body);
             if(error){
               /* Since details is array of [[object]] for showing the array details correctly we map it and then show it as string by joining the different messages via ,*/
               const message=error.details.map(el=>el.message).join(',');
               throw new ExpressError(message,400);
             }else{
               next();
             }
           }

           // pass the joi middleware to the routes you want the validation to apply to

           app.post('/product',validateProduct, async(req,res,next)=>{
             if(!req.body.product) throw new ExpressError('Invalid Product Data',400);
             const product=new Product(req.body.product);
             await product.save();
             res.redirect(`/products/${product._id}`)
             });
