//refer MDN for docs or ========console.dir()==============
// or you can just use The Console method dir() displays an interactive list of the properties of the specified JavaScript object.

//===========onClick event========================
const btn=document.querySelector('#v1');

btn.onclick= function(){
  console.log('you clicked me!');
}
function scream(){
  console.log("ahhhhhhh!!");
  console.log('stoppppp')
}

//Note we are not executing  the function by missing the () after scream as
//we want that the scream is called as the event is triggered.
//we are passing it to the onmouseenter event.

btn.onmouseenter= scream;

//============addEventListner Demo============
btn2=document.querySelector('#v2');

btn2.addEventListener('mouseup',()=>{
  alert("Mouse Click Released!!");

});


// ================Event Object=====================
// they are automatically passed to the callback of addEventListner we can capture it by passing a parameter to the callback

//example-> here e is the event object

btn2.addEventListener('click',(e)=>{
  console.log('this is a event object')
  console.log(e);

});

// ================KeyBoard Events=====================
// like pressing the arrow keys trigger some action.
const ke=document.querySelector('#data');

// Keyboard event object
ke.addEventListener('keydown',(e)=>{
  console.log(e);//keyboard event object
  console.log(e.key);//which key character was pressed.
  console.log(e.code);//its code i.e location of that key on KeyBoard
});

//press release
// ke.addEventListener('keyup',()=>{
//   console.log("KEY UP(Release KEY) keyboard EVENT")
// });

//=============Form Events ========================
// for validation or do something with form data
// here we capture the form submission
// instead of selecting individual elements to get Data we can make use of elements property of the form object.
const formEvent=document.querySelector('#basic');
formEvent.addEventListener('submit',(e)=>{
  //Naive way
  //const username=document.querySelectorAll('input')[0].value;
  //const pass=document.querySelectorAll('input')[1].value;

  //========Good way============
  // Using elements prop of the form object
  const userCollection=document.querySelector('#users');
  const username=formEvent.elements.username.value;
  const pass=formEvent.elements.password.value;

  //adding new user to the html.
  const newUser=document.createElement('li');
  const bTag=document.createElement('b');
  bTag.append(username);
  newUser.append(bTag);
  newUser.append(`- ${pass}`);
  userCollection.append(newUser);
  e.preventDefault();// to restrict the form submission default behavoiur and stay on the same page.
})
