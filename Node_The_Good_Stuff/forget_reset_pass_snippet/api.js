const express = require('express');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
const api = express();

// to parse client req body json/urlencoded type
api.use(express.json());
api.use(express.urlencoded({extended:false}));

// set templating engine to be ejs for views
api.set('view engine','ejs');


// sample mock database user
let user = {
    id: "sd3fdf3asdasd",
    email: "jane_doe@gmail.com",
    password: "sdhksjdkajskdj:hjhjsahdjahs"
}

// JWT secret (better to store in .env)
const JWT_SECRET = 'jwt super secret pass...';

// render the forget-password page
api.get('/forget-password',(req,res,next)=>{
    res.render('forget-password');
});

// sending link logic
api.post('/forget-password',(req,res,next)=>{
    const {email} = req.body;
    // check user exist in db
    if(email!==user.email){
        res.send('No user with this email found in DB!!');
        return;
    }

    // user exist in db
    
    // create jwt token with payload(user info) and jwtsecret
    const secret  = JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id
    };
    const token = jwt.sign(payload,secret,{
        expiresIn: '15m'
    });

    // create one-time link via jwt token with 15 min validity
    const link = `http://localhost:5000/reset-password/${user.id}/${token}`;
    console.log(link);// this will be replaced by sending an email to the client with this link as email body
    res.send('Password reset link sent...✔'); 

});

// route to which user get redirected after clicking on the link
api.get('/reset-password/:id/:token',(req,res,next)=>{
    const {id,token} = req.params;
    
    // verify token
    // check wheather id exist in db
    if(id !== user.id){
        res.send('Invalid reset link non-processable User ID...');
        return;
    }

    //valid id user in db present
    // create the identical secret that can only be created via JWT_SECRET and password in db
    const secret = JWT_SECRET + user.password;
    try{
        // verify token
        const payload = jwt.verify(token,secret);
        // redirecting to the reset-password page where user enter new password
        // also sending email of this user for whom the reset link was initiated
        res.render('reset-password',{email:user.email}); 
    }catch(err){
        console.log(err);
        res.send(err);
        return;
    }        
});

// reset the password in the db with the new password given by user
api.post('/reset-password/:id/:token',(req,res,next)=>{
    const {id,token} = req.params;
    const {password,password2} = req.body;
    // validate token & id
    if(id !== user.id){
        res.send('Invalid reset link non-processable User ID...');
        return;
    }
    const secret = JWT_SECRET + user.password;
    try{
        const payload = jwt.verify(token,secret);
        // validate password & password2
        // can use joi to validate
        // find user with payload email,id and update password of the user
        // make sure to hash the new password then store in db
        user.password=password
        res.send(user);
    }catch(err){
        console.log(err);
        return res.send(err);
    }

});

api.get('/',(req,res)=>{
    res.send('hello from server🐱‍🚀');
});


api.listen(5000,()=>{
    console.log('Server listening at port 5000...');
});