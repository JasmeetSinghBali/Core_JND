// parent- i/2
// left - 2*i
// right- 2*i+1

// =========== Min Heap Implementation ===============
let MinHeap = function(){
    let heap=[null];// as 0 index value null in heap by default

    this.insert = (num)=>{
        heap.push(num);
        if(heap.length>2){
            // if more than 2 node  in the heap
            let idx = heap.length - 1;
            while(heap[idx]<heap[Math.floor(idx/2)]){
                // keep on doing this until the last node in the heap is less than its parent
                if(idx>=1){
                    // until the entire heap is traversed
                    // swap the parent of the index with index node value ES6 destructuring 
                    [heap[Math.floor(idx/2)],heap[idx]] = [heap[idx],heap[Math.floor(idx/2)]];
                    if(Math.floor(idx/2)>1){
                        // if index is not the root node of the entire heap
                        // update index
                        idx=Math.floor(idx/2);
                    }else{
                        // when index = root of the entire heap the heap is sorted now
                        break;
                    };
                };
            };
        };
    };
    
    // always remove the top node i.e smallest node
    this.remove=()=>{
        let smallest = heap[1];
        if(heap.length>2){
            // place the last node as the root node of the heap
            heap[1] = heap[heap.length-1];
            // remove the last node which is actually the root node from heap
            heap.splice(heap.length-1);
            if(heap.length===3){
                // only two elements in the heap
                if(heap[1]>heap[2]){
                    // swap them
                    [heap[1],heap[2]]=[heap[2],heap[1]];
                };
                return smallest;
            };
            // if more than 2 nodes in the heap array
            let i = 1;
            let left = 2*i;
            let right = 2*i+1;
            while(heap[i]>=heap[left] || heap[i]>=heap[right]){
                if(heap[left]<heap[right]){
                    // as the left child is the smallest among parent,left & right
                    [heap[i],heap[left]]=[heap[left],heap[i]];
                    // update i to the left child as to check wheather it satsify heap property
                    // with resepect to its left and right childrens
                    i = 2*i;
                }else{
                    // right child is the smallest
                    [heap[i],heap[right]]=[heap[right],heap[i]];
                    // set the index to the right node
                    i = 2*i+1;
                };
                left= 2*i;
                right=2*i+1;
                if(heap[left]===undefined || heap[right]===undefined){
                    // the case where the heap is sorted and we are at a node whose 1 child is undefined
                    break;
                };
                
            }           
        }else if(heap.length ===2){
            // only two nodes
            // remove the root node
            heap.splice(1,1);
        }else{
            // already empty heap array
            return null;
        };
        // returning the root element that was deleted
        return smallest;
    };

    this.sort=()=>{
        let result=new Array();
        while(heap.length>1){
            // keep on removing the root deleted first fashion always will give us sorted array
            result.push(this.remove());
        };
        return result;
    };
};

// ------Quokka tests ---------
// const hp = new MinHeap();
// console.log(hp);
// hp.insert(6);
// hp.insert(7);
// hp.insert(4);
// hp.insert(3);
// hp.insert(10);
// hp.insert(12);
// hp.insert(9);
// hp.insert(1);
// hp.remove();
// console.log(hp.sort());