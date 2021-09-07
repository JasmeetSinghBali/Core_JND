function LinkedList(){
    let length = 0;
    let head = null;
    
    // for creating node
    let Node = function(data){
        this.data = data;
        this.next = null;
    };

    this.size = ()=>{
        return length;
    };

    this.head = ()=>{
        return head;
    };

    this.add = (data)=>{
        let node = new Node(data);
        if(head === null){
            // first node to get pushed
            // make the new node as head
            head = node;
        }else{
            currentNode = head;
            // traverse through the linked list
            while(currentNode.next){
                currentNode=currentNode.next;
            }
            // when it reaches to the last node in linked list
            currentNode.next=node;
            
        }
        // as new node was added
        length++;
    };

    this.remove = (data)=>{
        let currentNode = head;
        let previousNode;
        if(currentNode.data === data){
                // if the data to be deleted is the first node
                head = currentNode.next;
            }else{
                while(currentNode.data !== data){
                    previousNode=currentNode;
                    currentNode = currentNode.next;
                }
                previousNode.next=currentNode.data.next;
            }
            // as node was deleted
            length --;
        };
    this.isEmpty = ()=>{
        return length === 0;
    };
    this.indexOf=(data)=>{
        let currentNode=head;
        let index=-1;
        while(currentNode){
            index++;
            if(currentNode.data===data){
                return index;
            }
            currentNode=currentNode.next;
        }
        // if not found in the array
        return -1;
    };
    this.dataAt=(index)=>{
        let currentNode=head;
        let count = 0;
        // keep traversing until it reaches the designated index node
        while(count<index){
            count++;
            currentNode=currentNode.next;
        }
        // the currentNode will be the required index
        return currentNode.data;
    };
    
    // add anywhere in the linked list
    this.addAt = (index,data)=>{
        let node = new Node(data);

        let currentNode = head;
        let previousNode;
        let currentIndex=0;

        if (index>length){
            // the index is out of reach
            return false
        }
        
        // if we are adding at the starting of the linked list
        if(index===0){            
            node.next=currentNode;
            head=node;
        }else{
            //when adding in between linked list
            while(currentIndex<index){
                currentIndex++;
                previousNode=currentNode;
                currentNode=currentNode.next;
            }
            previousNode.next=node;
            node.next=currentNode;
        }
        length++;
    };

    // delete at particular index
    // returns data that was deleted
    this.removeAt = (index)=>{
        let currentNode=head;

        let currentIndex=0;
        let previousNode;
        if(index<0 || index>=length){
            // in case the index is out of reach
            return null
        }else{
            while(currentIndex<index){
                currentIndex++;
                previousNode=currentNode;
                currentNode=currentNode.next;
            }
            previousNode.next=currentNode.next;

        }
        length --;
        // returns the data that was deleted
        return currentNode.data;
    }
}

// -----Quokka tests ------
// const lklist = new LinkedList();
// console.log(lklist.isEmpty());
// lklist.add('BMW');
// lklist.add('Ferrari');
// lklist.add('Verna');
// lklist.add('Maruti');
// lklist.add('Bentley');
// console.log(lklist);
// console.log(lklist.head());
// lklist.addAt(0,"Lamborghini");
// console.log(lklist.head());
// lklist.removeAt(1);
// console.log(lklist.head());
// console.log(lklist.indexOf("Verna"));
// console.log(lklist.dataAt(3));
// lklist.remove('Lamborghini');
// console.log(lklist.head());
// lklist.add('Nixon');
// console.log(lklist.size());
