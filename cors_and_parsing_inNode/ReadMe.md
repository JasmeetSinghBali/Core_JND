# CORS Handling & Parsing Body In Node.js

****By- Jasmeet****

### Parsing body with body-parser

- body-parser helps to parse json Data and url encoded body.

- bodyParser.urlencoded({extended:false}) will help to parse simple url encoded body if set to true then we can parse the urlencoded rich body also

- bodyParser.json() to parse json data.

- then we can use req.body.object in our routes/controllers to parse and get the object we want.


### Fixing CORS error

## NOTE CORS IS NOT ENCOUNTERED IN POSTMAN OR CURL AS CORS IS A BROWSER ENFORCED SECURITY POLICY.

****looks like this=> No-Access Control Allow-origin Header is present on the resource.****

#### In order to fix CORS, you need to make sure that the API is sending proper headers (Access-Control-Allow-*). That’s why it’s not something you can fix in the UI, and that’s why it only causes an issue in the browser and not via curl: because it’s the browser that checks and eventually blocks the calls.

### What is CORS?

#### CORS cross origin resource sharing. (Security Policy)

### Case 1: Same Server/urls/host
#### Consider we have a client and a server and both are on the same host localhost:3000 this means we are trying to access the server resources from that server only.

### Case 2: Different Server/urls/host

#### We have a client at localhost:4000 and server at localhost:3000 Here requesting to get a resource present on the server will fail  

##### Note even a port difference is considered as different origin.

### How to Disable CORS

- We can do that in the Server side code and allow a client to have access even if its origin is different.

- So in your routes or Controllers we need to append the headers to any response we sent back.

## The below code should be placed before all the routes generally in your index/app.js.

### this will adjust every response automatically

****app.use((req,res,next)=>{****

           res.header('Access-Control-Allow-Origin','*');
           res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');

           if(req.method==='OPTIONS'){
             res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
             return res.status(200).json({});

           }
           next();

  ****})****

### Access-Control-Allow-Origin specifies which client origin can make the request to the server.

### Access-Control-Allow-Headers specifies which kind of headers the client can append in the request  to the server. can be * to accept all kind of headers or specify the headers which are allowed like in above code snippet.

### the * gives access to any origin Generally Done in Open REST API

### You can also restrict to a particular origin  by specifying a specific url origin just replace the * with http://your-page.com in Access-Control-Allow-Origin part.

### Browser sends a OPTIONS request first when client sends a POST or PUT request.

### Access-Control-Allow-Methods helps to specify what method of request are allowed by the allowed client on the server.

### next() so that the other routes can take over.

For More detailed Info and other CORS Configuration visit
https://github.com/expressjs/cors
