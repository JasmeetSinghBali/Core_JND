# Caching API Responses using redis

> ### Motive- To increase response time for client & saving bandwidth by minimizing the api frequent calls.


> ## Tips & Facts-

- [x] type:module in package.json to write ES6 syntax.
- [x] make a key value pair for response time and source is always good practice refer the api.js and observe the customized response.

> ## run & observe api.js

- [x] On the first time of executing npm run start observe the responseTime & source.

- [x] On the second time of executin npm run start the source will be cache i.e local redis instance and the responseTime improved.

- [x] further change the city value in line 42 in api.js and repeat the above two steps to see how caching can improve response time for api calls, reduce load on servers, save bandwidth by avoiding unecessary api calls to server.

> ## Preventing Cache staleness i.e(outdated data stored inmemory)

- [x] the solution is to replace the old cache response with new response from api call after a specific period of time say like for weather that might change in 1 hour. 
- [x] with redis EX (expires) for .set method helps to remove the cache entry after certain amount of time.

                redis.set(`weather:${city}`,JSON.stringify(apiResp.data),'EX',3600)
                # EX 3600 seconds

> ## Interact with redis instance cli

                docker exec -it containerName bash
                redis-cli
                keys *

                # output
                // shows the cached entries from api response with key list 

                flushdb
                # empty's the redis db use cautiuosly if in production

                #again make the api calls
                then redis-cli
                
                TTL weather:Manali
                # time to live gives the times after which this key entry expires in redis instance