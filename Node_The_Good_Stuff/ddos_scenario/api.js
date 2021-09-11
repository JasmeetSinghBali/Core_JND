const { application } = require('express');
const express = require('express');
const limiter = require('express-rate-limit');
const api = express();
const PORT = process.env.PORT || 5000;

// ============ Rate Limiter Middleware for all api routes ================
// api.use(limiter({
//     windowMs: 5000, //5 sec
//     max: 5, // 5 req possible in 5 seconds
//     message:{
//         code:429,
//         message: 'This endpoint is now rate limited to 5 request per second!!✔'
//     }
// }));

// ======for applying rate limiter on specifi route we pass it as middleware======
const registerLimiter = limiter({
    windowMs: 5*60*1000,
    max:2,    // 2 request per 5 minutes
    message:{
        code:429,
        message:'now new user register route is rate limited only..✔'
    }
});

api.get('/',(req,res)=> res.send('Hello from rate limited api...'));

api.get('/open',(req,res)=> res.send('This is open endpoint...'));

api.get('/register',registerLimiter,(req,res)=> res.send('register page'));
api.post('/register',(req,res)=> res.send('ok'));

api.get('/login',(req,res)=> res.send('login page'));
api.post('/login',(req,res)=> res.send('ok'));

api.listen(PORT,()=>{
    console.log(`Server listening at port: ${PORT}`);
});

