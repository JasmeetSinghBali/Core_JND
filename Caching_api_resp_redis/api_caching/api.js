import axios from 'axios';
import dotenv from 'dotenv';

import Redis from 'ioredis';

// local redis config options
// make sure a instance for redis is running locally at port 6379 use docker
// docker pull redis
// docker run -d -p 6379:6379 redis1 redis
const redis = new Redis({
    'port': 6379,
    'host': '127.0.0.1'
});

dotenv.config();


const cityEndpoint = (city) => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;
const getWeather = async(city)=>{
    // ===============================Caching=================================
    // check if we have  cached value of the city already in redis(inmemory) weather we want
    let cacheEntry = await redis.get(`weather:${city}`); //searching redis instance for key weather

    // if cache hit i.e json object inside the redis instance
    if(cacheEntry){
        cacheEntry = JSON.parse(cacheEntry); // as the cache stored in redis is as a string
        return {...cacheEntry,'source':'cache redis local instance'}
    }

    
    // otherwise cache miss make a new api call
    let apiResp = await axios.get(cityEndpoint(city));
    
    // store api response in redis local instance
    // creating a key as `weather:${city}` in local redis instance
    // storing the response as string value with the key weather:${city}
    redis.set(`weather:${city}`,JSON.stringify(apiResp.data),'EX',3600);
    return {...apiResp.data,'source':'API'}
    
}

const city = 'Manali';


const t0 = new Date().getTime();
let weather = await getWeather(city);
const t1 = new Date().getTime();
// adding a key for time taken to process the request to the result(weather) object
weather.responseTime = `${t1-t0}ms`;
console.log(weather);
process.exit();