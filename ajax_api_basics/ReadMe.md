# AJAX, AJAJ & API's

## -> AJAX (Async javascript and xml)-> (Continuous and async request and loading of data on the webpage without refreshing the page.)

- ****A normal request made then we get html+css+javascript in response.****
- Helps to load data/process request asynchronously from the server.
- ****Example infinite scrolling in reddit or facebook that basically makes a request for loading more stories or feed when we scroll****

- ****The idea is to minimize user involvement like earlier we need to click link to make the request or type but in scroll the end user is just scrolling that is leading to request to the server****

### Important : ****Ajax request does not load the entire html , ajax is requesting only the data in json****


***

## -> API's ( Interfaces for Software to interact not for humans) Application Programming Interfaces

- ****API are computer interfaces helps two software pieces to interact with each other and these software can be of same machine or different machine.****

- ***WEB api where web app / software on web basically expose some endpoints that are used to respond to request for data from that software or web app that can be used in the code of another software.****

- ****Web api are basically HTTP based portals to another Web software/apps****

- ****like this api https://www.cryptonator.com/api their many other twilio api (make sms,programmable voice calls,emails etc) ,twitter, facebook, weather, NASA api, google books API, reddit API and so on...****

- ****JSON response is used so that another software/code can consume and understand it basically acts as a language traslator between two country representative who speaks different languages.****

- ****It helps different software built on different tech stack to interact with each other and exchange usefull info.****

****

## -> Rise of AJAJ & what is JSON?

****SRC: https://www.json.org/json-en.html****

- ****Javascript object notation****
- ****Way of formatting data that is predictable note that json is not same as javascript object****
- ****In json we need to enclose the keys in the key value pairs with ""(double quotation) unlike in the normal javascript object key value pairs****

- ****JSON example****

      [
        {
        "name":"john",
        "email":"john@hello.com"
        },
        {
        "name":"david",
        "email":"david@yo.com"
        }
      ]
### Important : ****Note JSON is not limited to javascript code if we are working on python or ruby their are apis that are responding with JSON so python and ruby have their ways to parse that json data and then use in the application code.****

### IMPORTANT : How to convert JSON --> javascript object--> JSON  

- ****When we make a request we get response as a giant String.****

- ****to turn json into valid javascript for parsing it we have JSON.parse(text,reviver).****

       const parsedData=JSON.parse(data);
       parsedData.key;//will give us the value of the key we are accessing.

- ****To convert Javascript object to json we can use JSON.stringify() usefull when we want to send inforamtion to API.****
      const jsonData=JSON.stringify(data);
      jsonData;//will give us the JSON data/convert javascript object to string that we can send to the api

- ****Most of the API's use JSON response i.e AJAJ rather that AJAX i.e xml as response.****
***

## XMLHttpRequest (Bad Way) Vs fetch to make request to API

- ****XMLHttpRequest does not support promises, It is based on callbacks and can lead to the callback hell****

- XML reaquest example ****Bad Way Dont Do this****

      const req= new XMLHttpRequest();
      req.onload=function(){
        console.log("done");
      }
      req.onerror=function(){
        console.log("Error!");
      }
      req.open('GET/POST','url');
      req.send();

- ****fetch supports promises that helps to avoid callback hell more cleaner way and supports async and await.****

-****Example fetch****

      fetch('url')
      .then((res)=>{
        console.log("Response",res);

        });
      .catch((err)=>{
        console.log("Error:",err);
        })
- ****Note the fetch api gets data in streams i.e in chunks.****

- ****to counter this we use the asynchronous .json() that returns a promise itself and when it finishes it returns all the data****

      fetch('url')
      .then((res)=>{ // this promise is for fetch('url')
        console.log("Response",res);
        return res.json();
        })
        .then(data=>{  // this promise is for res.json()
          console.log("Data Parsed..",data);
          })
        .catch((err)=>{
          console.log("Error:",err);
          })

### ****async and await version promise based****

        const fetchData=async()=>{
          try{
            const result=await fetch('url');
            const parsedData=await result.json();
            console.log(parsedData);
          }
          catch(err){
            console.log(err);
          }

        }
***

## Axios(a library to make http request built on top of fetch)

####  improvised version of fetch to avoid the additional promise callback waiting for entire data as we saw earlier.

#### Axios Helps not to worry about multiple promises one for just making request and then next to parse data

#### can be used in both client and server side javascript.
           npm i axios

- ****Code snippet example we get data and make the request in single line i.e promise is resolved only when the request is success and data is parsed.****


           axios.get(url)
           .then(res=>{
             console.log(res);//gives us parsed data
             });
            .catch(err=>{
              console.log(err);
              })

***
# Best way to make request

## axios and asynch and await mixed ***BEST VERSION***

           const fetchData=async()=>{
             try{
               const data=await axios.get(url);
               console.log(data);

             }catch(err){
               console.log(err);
             }
           }
## Setting headers in  axios

- ****to accept only the json part and not get the entire html.****
- note it can differ from API to API that response is html or json.
             Accept:application/json
#### code to set headers in axios

             const fetchData=async()=>{
               const config={
                 {
                   headers:{Accept:'application/json'}
                   }
               }
               const res=await axios('url',config);
               console.log({data:res});
             }
