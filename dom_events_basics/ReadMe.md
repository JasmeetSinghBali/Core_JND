# DOM Events

- Responding to user inputs and actions.
- example- clicking ,pressing key ,moving cursor ,resizing screen, copying, pasting, hovering , infinite scrolling , keyboard pressing etc..

- example trello adding dashboards, reordering etc...

***
****Example****
****Infinite scrolling****

where the new elements are appended as the user scrolls down. the initial page dont contains all the elements however they eventually keeps get added up as the user scrols.

# Inline Events

where we specify what event occurs in the html itself like the

****onclick='alert("you clicked me!")'****
where the text in '' is treated as javascript


***<*button onclick='alert("you clicked me!");alert("Stop Clicking ME !! thats enough for the Demo!")'>Inline Event Button Click Me!</button*>***


***<*button ondblclick='alert("you clicked me!");alert("Stop Clicking ME !! thats enough for the Demo!")'>Inline Event Button Double Click</button*>***

# Disadvantages of Inline Events

- Not Flexible
- Clumsy
- Cannot be reused have to copy it to say other button to have this DOM Event.

****A better way is always to add a external script source.****

# Onclick Property

- const btn=document.querySelect('#btn');

- Console.dir(btn) gives the information about the various DOM event props we can apply to a element.

****Important Note
Always set the event onSomething =function(){}
  a function must be initialized as value for the DOM Events so that when that event fires the function is called.****

# addEventListner (Best way to handle DOM Events)

- addEventListner('typeofevent',callback);

- Basic Example

const button1=document.querySelector('button');

button1.addEventListner('click',()=>{
  alert('you clicked me')
  });
- above event fires when a click occurs on the button.


# ****IMPORTANT Advantages of addEventListner over simple DOM event handling.****

- ****If we want to apply multiple fire events then it is not possible on standard way of handling DOM events.****

here twist and shout are two seperate functions.

function twist(){
  console.log('twist');
}
function shout(){
  console.log('shout');
}
btn.onclick=twist;
btn.onclick=shout;

only shout will be executed twist will get overwritted by shout function.

- However using addEventListner both of them will be executed shout and twist.

btn.addEventListner('click',twist);
btn.addEventListner('click',shout);

- ****you can specify for how many times the callback can execute in the addEventListner approach****

- btn.addEventListner('click',twist,{once:true});
  btn.addEventListner('click',shout);

- Above twist is executed only once initially and then afterwards only shout is executed.

- ****More flexibility**** like removeEventListener and add options to it etc....

# Events and Keywords This

- ****Consider a case where u want to apply the same logic to two different elements but u write two seprate functions for it instead we can use this keyword in the callback of addEventListner where this referes to the element at which that event was triggered that way we only need a single function that is called when a event is fired on two different elements.****

- Example we apply colorize function to 2 different elements.

const buttons=document.querySelectorAll('button');

for (let button of buttons){
  button.addEventListner('click',colorize)
}

const h1s=document.querySelectorAll('h1');

for (let h of h1s){
  h.addEventListner('click',colorize)
}

function colorize(){
  this.style.background = makeRandColor();
  this.style.color = makeRandColor();

}
 - ****IMPORTANT So this will refer to the element on which the event is triggered upon when used inside the callback of the DOM addEventListner.****

 # Event Objects & Keyboard Events

 - Event object contains information abt the EVENT.
  ****Refer App.js file for example****

# Form Events & preventDefault

- form has a action="" specifies where the data entered in the form goes.

- ****refer app.js****

# Input and change Events

- ****Change event fires when we leave the input i.e click outside the input box****

- everytime user type in the input something happens.

- copying , pasting etc ....

- const input=document.querySelector('input');
input.addEventListner('change',(e)=>{
  console.log('change event!!');
})

- ****input event fires when something changes in the input box****

const input=document.querySelector('input');
input.addEventListner('input',(e)=>{
  console.log('Input event!');
})

# Event Bubbling

- ****So if we have nested elements and all have event listeners then the most inner i.e the child elements when cicked on i.e thier event is fired it automatically fires the parent event listeners also. This phenemenon is called EVENT BUBBLING****

- When the button event is fired the section and p are also fired, when p is fired then section event is also fired automatically.



<section onclick="">
  <p onclick="">
    <button onclick=""></button>
  </p>
<section>

- ****To stop event bubbling we can use e.stopPropagation(); that will restrict  the parent element event trigger to fire automatically when the child element event is fired ****

# Event Delegation

- ****The idea is to addEventListner to the new elements we create & add to the html in future.****

- we can find the ****target that actually refers to the new element we are adding i.e e.target where e is the event object****

- li.addEventListner('click',(e)=>{
  if(e.target.nodeName==='LI'&& e.target.remove())
  })

- see connsole.dir(e.target) to know about nodeName.

- Identifies li element by nodeName so that only  li elements are removed & removes the new li when it is clicked.


# Console.dir() Whenever u dont know abt object methods.

- The Console method dir() displays an interactive list of the properties of the specified JavaScript object.
