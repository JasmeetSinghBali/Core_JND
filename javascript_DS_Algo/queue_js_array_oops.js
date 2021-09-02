// js array queue implementation
function Queue(){
    let myQueue = [];
    this.print=()=>{
       return console.log(myQueue);
    };

    // add at rear end
    this.enqueue = (elm)=>{
        myQueue.push(elm);
    };

    // remove from front
    this.dequeue = ()=>{
        return myQueue.shift();// removes first index element
    };

    this.front = ()=>{
        return myQueue[0];
    };

    this.size = ()=>{
        return myQueue.length;
    };

    this.isEmpty = ()=>{
        return (myQueue.length===0)
    };
}

// ------ Quokka tests -------
// const queue = new Queue();
// console.log(queue);
// queue.enqueue(4);
// queue.enqueue(6);
// queue.enqueue(1);
// queue.enqueue(10);
// queue.enqueue(3);
// console.log(queue.isEmpty()); 
// console.log(queue.print());
// console.log(queue.front());
// queue.dequeue();
// console.log(queue.print());
// console.log(queue.front());
// console.log(queue.size());