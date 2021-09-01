// Using JS array as Stack

let letters = [];// our stack

let word = "racecar";

let rword = "";

// push char by char in stack(js array)
for (let i=0 ; i<word.length;i++){
    letters.push(word[i]);
}

// pop top of the stack in reverse order fashion
for (let j=0;j<word.length;j++){
    rword+=letters.pop();
}

if(rword===word){
    console.log('✔ isPalindrome true');
}
else{
    console.log('♦ Not a Palidrome');
}