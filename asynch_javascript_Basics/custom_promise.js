// Create Your Own Promise

// A promise that resolve after delay of 2 seconds
// copy and paste in console browser and press enter then type fakeRequest() and enter;
const fakeRequest=(url)=>{
  return new Promise((resolve,reject)=>{
    const rand=Math.random();

    setTimeout(()=>{
      if(rand<0.7){
        console.log('My Promise resolved!!')
        resolve('Data You requested: 12345)');
      }
      else{
        reject('Cannot Get the Data u requested :(');
      }
    },2000)

  })
}

// and then handling the above promise with .then() and .catch()
// data is the success message the resolve part in promise and the err is the reject part of the promise we wrote above.
fakeRequest('/api/someResource')
.then((data)=>{
  console.log('request Success 200')
})
.catch((err)=>{
  console.log(`Something Went Wrong!!!! ${err}`);
})
