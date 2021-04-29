# Defining RESTful Routes

****Level: Basics****

### <=> Topics Covered :

#### - Intro to REST
#### - Express redirects
#### - UUID Package
#### - Express method Override
#### - Accessing Javascript array,object in the ejs view template.

***

# GET vs POST

## GET

- Used to retreive information
- Data is sent via query string
- information planely visible in url
- Limited amount of data can be sent.

## POST

- post  data to server
- used to write/create/update
- data sent via request body, not query string
- can sent any sort of data(json)

## Parsing body i.e console.log(req.body)

- Need to use middleware like express.json() or express.urlencoded() to parse the request body.

- Note their are other middlewares too , express.json is used when we are sending data in the request body as json for text it will be express.text and for form encoded data i.e user typing data in form html in body we use express.urlencoded({extended:true})

## Destructuring the request.body

      const {name,email}=req.body

- Will parse name and email from the request body.
- actual request body look like below

      {
        "email":"Someone@gmail.co",
        "password":"12345"
      }
***

# Intro to REST

### REST Representational state transfer It is basic set of guidelines how a server-client architecture should communicate and perform CRUD operations on a given resource.

### and system that relies on REST are RESTful system or API's

### main idea of rest is to handle data on server side for CRUD.

### approach is to formatting urls and http verbs applications.

****RESTful API Example : https://docs.github.com/en/rest/reference/gists****

***

# Express Redirects

- res.redirect() automatically takes the user to the get request version even if we have two routes post and get for the same name route.

         app.get('/myroute',(req,res)=>{
           //something
           res.send('this is GET route')
           })
          app.post('/myroute',(req,res)=>{
             //something
             res.redirect('/myroute');
             })

- the above post /myroute is going to display this is GET route.
- default redirect status code is 302 we can use our own.

- ****you can also see the network tab while making these requests that will make things more clear.****

***

# UUID (universily unique ID) Package (to generate unique IDs to avoid conflicts in different resources)

****https://www.npmjs.com/package/uuid****

        npm i uuid
        const {v4:uuidv4} =require('uuid');
        uuidv4();// will give us 12434dfdf34234-34fe-32434343-fefe
***

# Express Method Override

- ****Lets you use HTTP verbs like PUT or DELETE in places where the client does not support it.****

         npm i method-override

****http://expressjs.com/en/resources/middleware/method-override.html****


- ****override using query value****

         var express=require('express');
         var methodOverride=require('method-override');
         var app=express();

         // override middleware
         app.use(mehtodOverride('_method'));


- ****Now in the form calling with query override using HTMl <form>****

         <form method="POST" action="/resource?_method=DELETE">
           <button type="submit">Delete Resource</button>
         </form>

### IMPORTANT : Code snippet Above even though the form is making a post request but _method will trick/illusion express to be treat this request  as  DELETE request by using the _method.

***
# To access javascript variables in the ejs view template.

#### we pass it as second argument when we are renderinh that view template.

- Example

****In server.js****

             comments=[
             {
               id:uuidv4()
               author:"kapil"
               text:"me smart hoon"
             },
             {
               id:uuidv4()
               author:"dhiman"
               text:"abe nikal"
             }

             ]


             app.get('comments/:id',(req,res)=>{
               const {id}=req.params;
               const comment=comments.find(c=>c.id===id);
               res.render('comments/show',{comment})
               // we pass it as second argument when we are renderinh that view template.
               })

****In the view template comments/show.ejs****

             <body>
                comment.id // will give us the id of the comment that we passed while making the get request in params
                comment.author
                comment.text
             </body>
