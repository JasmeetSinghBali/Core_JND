// js array priority queue implementation
function PQueue(){
    let pqueue = [];
    this.print=()=>{
        console.log(pqueue);
        return;
    };

    this.isEmpty = ()=>{
        return (pqueue.length===0)
    };

    // add element
    this.enqueue = (elm)=>{
        if(this.isEmpty()){
            pqueue.push(elm);
        }else{
            // add the element a/c to priority
            let added = false;
            for (let i=0;i<pqueue.length;i++){
                // elm = ["elementValue",priority]
                // example ["BMW",1]
                // pqueue = [["MARUTI",5]]
                // on enqueue
                // pqueue= [["BMW",1],["MARUTI",5]]
                if(elm[1]<pqueue[i][1]){
                    // add this high priority element at index i mentinoned 0 as we dont want to delete anything
                    pqueue.splice(i,0,elm); // add elm at i index in pqueue
                    added=true;
                    break;
                }
            }
            if(added===false){
                pqueue.push(elm);
            }
        }
    };

    // remove from front
    this.dequeue = ()=>{
        return pqueue.shift();
        // removes first index element
    };

    this.front = ()=>{
        let val = pqueue[0];
        return val[0];
    };

    this.size = ()=>{
        return pqueue.length;
    };
}

// ------ Quokka tests -------
// const pq = new PQueue();
// console.log(pq);
// pq.enqueue(["data4",4]);
// pq.enqueue(["data2",2]);
// pq.enqueue(["data3",3]);
// pq.enqueue(["data1",1]);
// console.log(pq.print());
// pq.dequeue();
// pq.dequeue();
// console.log(pq.size());
// console.log(pq.print());
// console.log(pq.front());
// console.log(pq.isEmpty());

