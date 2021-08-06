// Example-1
//=======================================
var events = require('events');

// create a instance of the events EventEmitter class
var myEmitter = new events.EventEmitter();

// register a listener for someEvent named Event
myEmitter.on('someEvent',(msg)=>{
  console.log(msg);
});

// trigger the someEvent named Event
myEmitter.emit('someEvent','someEvent triggered!!!');

// in the terminal
// node EVENTS.js
// someEvent triggered!!!


// Example-2
// Using Event with utils

// utils help to inherit things from object built in node.js

// var events = require('events');
// var util = require('util');
//
// var Person=(name)=>{
//   this.name=name;
// }

// the first parameter defines the constructor that inherits and the second parameter what it is inheriting
// so now our constructor is using a EventEmitter
// util.inherits(Person,events.EventEmitter);
//
//
//
// var john = new Person('john');
// var jasper = new Person('jasper');
// var chuck = new Person('chuck');
//
// var people=[john,jasper,chuck];
//
// people.forEach((person)=>{
//   person.on('speak',(msg)=>{
//     console.log(person.name+'said:'+msg);
//   });
// });
//
// james.emit('speak','Whats Up!!!');
// jasper.emit('speak','All good!!');
// chuck.emit('speak','Lets go!!');
