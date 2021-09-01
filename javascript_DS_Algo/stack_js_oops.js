// stack implementation oops

function Stack () { 
    this.index = 0;
    this.stack = {};

    //add element to top
    this.push=(value)=>{
        this.stack[this.index] = value;
        this.index++;
    }

    // remove element from top
    this.pop=()=>{
        if(this.index===0){
            throw new Error('Stack is Empty');
        }
        this.index--;// say we want to pop 4th element then it will be at key 3 in stack
        let top = this.stack[this.index];
        delete this.stack[this.count];
        return top;
    }

    // return size of stack
    this.size = () => {
        return this.index;
    }

    // return top element of stack
    this.peek = () =>{
        return this.stack[this.count-1];
    }
}
