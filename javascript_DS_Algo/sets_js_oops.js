function mySet(){
    let customSet = [];
    // though array in javascript can have duplicate items
    // we will implement sets in a way that the customSet do not allows duplicate items
    
    // isPresent returns true if element already in array
    this.isPresent = (element) =>{
        // the .indexOf returns -1 if element is not present in the array
        return (customSet.indexOf(element)!==-1);
    }

    this.values = ()=>{
        return customSet;
    }

    // add element to set
    this.add = (elm) =>{
        if(!this.isPresent(elm)){
            customSet.push(elm);
            return `${elm} added to set`;
        }
    }
   
    this.remove = (elm) =>{
        // if the element that we want to remove is present in set 
        if(this.isPresent(elm)){
            index = customSet.indexOf(elm);
            // splice is used to remove and add items to array at particular index
            // Syntax array.splice(index, howmany, item1, ....., itemX)
            // index Required. The position to add/remove items. Negative values a the position from the end of the array.
            // howmany is Optional. Number of items to be removed.
            // item1,...itemX Optional. New elements(s) to be added
            customSet.splice(index,1); //splice(index,steps) steps is how many elements removed including the index so if splice(index,1) so 1 element removed at index 1
            return `${elm} removed from set`;
        }
        throw new Error('Element not present in the set');
    }

    this.size = ()=>{
        return customSet.length;
    }

    this.union = (otherSet) => {
        let unionSet = new mySet(); // making an instance for mySet class
        let firstSet = this.values(); //from above method that returns the customSet
        let secondSet = otherSet.values();
        firstSet.forEach((e)=>{
            unionSet.add(e);
        });
        secondSet.forEach((e)=>{
            unionSet.add(e);
        });
        return unionSet;
    }

    this.intersection = (otherSet) =>{
        let intersectionSet = new mySet();
        let firstSet = this.values();
        firstSet.forEach((e)=>{
            if(otherSet.isPresent(e)){
                intersectionSet.add(e);
            }
        });
        return intersectionSet;
    }

    this.difference = (otherSet) =>{
        let differenceSet = new mySet();
        let firstSet = this.values();
        firstSet.forEach((e)=>{
            if(!otherSet.isPresent(e)){
                differenceSet.add(e);
            }
        });
        return differenceSet;
    }

    // method to check if set is subset of other set
    this.subset = (otherSet)=>{
        let firstSet = this.values();
        
        // The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
 
        return firstSet.every((value)=>{
            return otherSet.isPresent(value);
            // so if every element in firstSet is present in otherSet then firstSet is a subset of otherSet
        });
    }
}

// =============tested in Quokka==============
// const setA = new mySet();
// const setB = new mySet();
// setA.add('a');
// setB.add('b');
// setB.add('c');
// setB.add('d');
// setB.add('a');
// setB.add('a');
// console.log(setA.subset(setB)); 
// console.log(setA.values());
// console.log(setB.values());
// setB.remove('d');
// console.log(setB.values());
// console.log(setB.isPresent('c'));
// console.log(setB.size());
// console.log(setA.intersection(setB).values());
// console.log(setA.union(setB).values());
// console.log(setB.difference(setA).values());