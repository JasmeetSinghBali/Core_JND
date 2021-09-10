// Trie Data Structure

let Node=function(){
    this.keys = new Map();
    // Map is from ES6 it is like a object with key value pairs
    // so the key value pair are like name of the directory as key and the folders inside of it as value
    this.end = false; //act as * to indicate ending letter of word or not
    this.setEnd =()=>{
        this.end =true;
    };
    this.isEnd= ()=>{
        return this.end;
    };
};

let Trie = function(){
    this.root = new Node();
    this.add = (input,node=this.root)=>{
        if(input.length === 0){
            node.setEnd();
            return;
        }else if(!node.keys.has(input[0])){
            // checking that if their is not a node present as the inputs first letter
            // create a node with this input letter
            node.keys.set(input[0],new Node());
            // call recursively for the all the letters after the first letter , with the first letter as node
            // for ball , all is passed for the next recursion call
            return this.add(input.substr(1),node.keys.get(input[0]));
        }else{
            // if their is already a node present associated to that letter in the key map
            // then recursive call for the next letters excluding this letter and making this excluded letter as root node
            return this.add(input.substr(1),node.keys.get(input[0]));
        };       
    };
    // tocheck wheather the word is present in the trie
    this.isWord = (word)=>{
        let node = this.root;
        while(word.length>1){
            if(!node.keys.has(word[0])){
                // check at the root level values
                // if word[0] letter not present at root level values then word not present in trie
                return false;
            }else{
                // if word[0] found at the root level
                // then update the node as that key so as to traverse downwards in the trie
                node=node.keys.get(word[0]);
                word=word.substr(1);//update the word like from ball to all
                // so as to find a in the values of b present or not and so on
            };
        };
        // so when the last word i.e say l for ball is remaining
        // check wheather that last word l is present in the keys map &
        // wheather this is marked as the end word if yes then return true this word is present in trie else not
        return (node.keys.has(word) && node.keys.get(word).isEnd())?
         true:false;
    };

    // all the words in the trie as a array
    this.print=()=>{
        let words = new Array();
        let search = (node,string)=>{
            if(node.keys.size !== 0){
                // i.e still more letters to look for in the keys map
                for(let letter of node.keys.keys()){
                    // recursive call by considering current letter as node keys and concatcating current letter as the word letter
                    search(node.keys.get(letter),string.concat(letter));
                };
                // if the current letter is the * one i.e ending letter then push into the result array
                if(node.isEnd()){
                    words.push(string);
                }
            }else{
                // if we are last letter of the branch
                string.length>0 ? words.push(string):undefined;
                return;
            };
        };
        search(this.root,new String());
        return words.length>0 ? words :null;
    };
};

//---Quokka tests----
// let mytrie = new Trie();
// console.log(mytrie);
// mytrie.add('ball');
// mytrie.add('bat');
// mytrie.add('doll');
// mytrie.add('dork');
// mytrie.add('do');
// mytrie.add('dorm');
// mytrie.add('send');
// mytrie.add('sense');
// console.log(mytrie.isWord('doll'));
// console.log(mytrie.isWord('dock'));
// console.log(mytrie.print());