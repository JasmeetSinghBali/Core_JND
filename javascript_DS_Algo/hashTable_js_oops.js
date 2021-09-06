// Hash table implementation

// hash table function
// max is the number of buckets used to store values
let hashFunc = (string,max) =>{
    let hash = 0;
    for (let i =0 ;i<string.length;i++){
        // charCodeAt returns Unicode value associated to each character index in the string 
        hash += string.charCodeAt(i); 
    }
    // like say hash comes out to be 70 and buckets are 5 then 70%5= 0 hence the hash is 0 i.e it will be placed at index 0
    return hash % max;
};


let HashTable = function (){
    
    let storage =[];
    // number of buckets in the storage array
    const storageLimit = 4;

    this.print = ()=>{
        console.log(storage);
    }

    this.add = (key,value)=>{
        // compute the index where to store this new value by invocking hash function
        let index = hashFunc(key,storageLimit);
        // check wheather that index in storage is available/free
        if(storage[index] === undefined ){
            storage[index] =[
                [key,value]
            ];
        }else{
            // index is already occupied
            let inserted = false;
            for (let i =0; i < storage[index].length; i++){
                // check wheather the  key already exists in the specified bucket index
                if(storage[index][i][0] === key){
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            // if the key do not exist in the bucket's index
            // insert this key at that indexed bucket with key and value provided by the user
            if(inserted === false){
                storage[index].push([key,value]);
            }
        }
    };

    this.remove = (key)=>{
        let index = hashFunc(key,storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key){
            // in case only single index present in the bucket
            delete storage[index];
        }else{
            // find the index in the specified bucket
            for (let i=0;i<storage[index].length;i++){
                    if(storage[index][i][0] === key){
                        delete storage[index][i];
                    }
            }
        }
    };

    this.lookup = (key)=>{
        let index = hashFunc(key,storageLimit);
        // no such index bucket present in hashmap 
        if(storage[index] === undefined){
            return 'key Not Found In HashTable';
        }else{
            for (let i =0 ;i<storage[index].length;i++){
                if(storage[index][i][0]===key){
                    // found return the index inside that bucket
                    return storage[index][i][1];
                }
            }
        }

    };
};

// ---Manual tests------
// const ht = new HashTable();
// console.log(hashFunc("tux","penguin"));
// console.log(hashFunc("beau","person"));
// console.log(ht);
// ht.add("beau","person");
// ht.add("fido","dog");
// ht.add("rex","dinosour");
// ht.add("tux","penguin");
// console.log(ht.lookup('tux'));
// since both tux and beau give same hashed value hence they are placed inside same bucket
// ht.print();

