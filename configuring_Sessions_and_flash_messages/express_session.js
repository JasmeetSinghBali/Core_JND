// in your server/index.js
// npm i express-session
const session=require('express-session');

// making a cookie that helps to create session for logged in user.
const sessionConfig={
  secret: 'thisismySecret',
  resave:false,
  saveUninitialized:true,
  cookie:{
    // for setting a cookie that expires in a week
    // Date.now is in milli seconds
    // 1 s=1000ms , 1m= 60s *10000, for 60 min i.e hr 1hr=1000*60*60 , 24 hrs so 1day=1000*60*60*24, and a week 7 days 7day=1000*60*60*24*7 milli seconds
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    // to make sure the cookie is not accesible at client side or client side script we use httponly flag in the cookie
    httpOnly:true
  },

  // store : mongo or redis
}
// after this you can see the  inspect->Application their would be seesion id /cookie inside the dev tools.

app.use(session(sessionConfig));

// after the above lines when ever a route is hit then a session id is created with the secret we defined in session config


//************************************************
//                 FLASH MESSAGES SET UP
//************************************************
// when delete,edit basically after a CRUD operation to show wheather the operation was succesfull or not.

// inside the server.js/index.js
//npm i connect-flash
const flash=require('connect-flash');
app.use(flash());

// middleware that stores the success message and is used by all routes , however we can specify in that particular route file to use thobject that holds the sucees message
app.use((req,res,next)=>{
  // stores the success message in the templates(ejs) locals with object name success.
  res.locals.success=req.flash('success');
  next();
})


// now req.flash can flash a message at any route
//now say we have a route of Create route


app.post('/Create/someProduct',async(req,res,next)=>{
  // logic to create someProduct and add to the DB
  // then give the flash message
  req.flash('success','Successfully Created Something')
  // to see that the product was added
  res.redirect('/showallproduct');
})
