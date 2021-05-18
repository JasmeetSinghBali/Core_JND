const express=require('express'),
      app=express(),
      session=require('express-session'),
      PORT=process.env.PORT || 5000;

const sessionOptions={secret:'thisismysecrestSAUCE',resave: false, saveUninitialized: false}

// this will enable to maintain a connect.sid i.e connection session ID for the user that can be used to handle session for that particular user.
app.use(session(sessionOptions));

// a simple route that increments the number of times the user visits the page.
app.get('/viewcount',(req,res)=>{

   if(req.session.count){
     req.session.count+=1;
   }else{
     req.session.count=1;
   }
   res.send(`You Visited this page : ${req.session.count} times`)
})

//A register route
app.get('/register',(req,res)=>{
  const {username='Anonymous'}=req.query;
  req.session.username=username;
  res.redirect('/greet');
})

// now for every time the user goes tp greet it is going to maintain the username that the user passed when he made a get request to /register with example query ?username=John
app.get('/greet',(req,res)=>{
  const {username}=req.session;
  res.send(`Hey we are tracking you ${username} dont be naughty!`);
})
app.listen(PORT,process.env.IP,()=>{
  console.log(`Server Started at:${PORT}`)
})
