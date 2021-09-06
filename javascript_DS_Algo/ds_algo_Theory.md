# DS Algo with javascript

> ## Stacks (DS) refer stack_js_oops

- **LIFO -> Last in first out**
- Always pop's the most recently pushed element in the stack
- **example browser back button that stores the pages in LIFO fashion when users hit the back button the most recently visited page with respect to current page is displayed.**

              |  www.spotify.com |
              |  www.twitter.com |
              |  www.facebook.com|
              |  www.google.com  |
              --------------------

> #### **Main Methods related to Stack**
    
        push() // add new element at the top of stack
        pop()  // remove top element of stack
        peek() // displays top element of stack
        length() // to determine total element in the stack

> **NOTE - Now by default javascript array has already all the built in methods to use as stack**

---

> ## Sets (DS) refer sets_js_oops.js

- Similar to array with the condition that their are no duplicate items.
- the items are not in any particular order.
- **The use case of sets is to check the presence of an item.**

- **In ES6 syntax set is already implemented but not with all functionality so it is better to implement set on your own completely.**

#### **Functionality that are present in built in set in javascript ES6 are->**

                
                has() // to check the membership
                add() //method
                delete() //method
                size // prop

### Self Implemented Set (the ES6 methods+prop and additions like below)

            union()
            intersection()
            difference()
            subset()

-----

> ## Queue (DS) 

- **FIFO Fashion**
- can be implemented by javascript array 
- task scheduling

> ## Priority Queues

- **task/process scheduling**
- **the elements with higher priority(lowest number) are send to the front of the queue so that when dequeue operation is performed they are the first to removed and can be executed first like a high priority task/process.**

---

> Binary Search Tree(BST) O(logn) Database Indexing

- Each Node can have exactly two branches left and right i.e two childs for each node possible.

- For Binary tree, the left child value must be less than or equal to the root node while the value of right child must be greater than or equal to the right node.

- Binary search tree is based on the principle of binary search hence insertion,loopup and deletion takes about O(logn) where n is the total number of inputs.


- **addition of new node happens only at the leaf nodes, so keep going for the terminals via recursion until the left/right child points to refference null**

- **while removing the node from BST remember to replace that refference of deleted node with the node that is the to the left wrt  right child of the deleted node.**

**example node to delete 3 so 3 replaced by the left of right child of 3 3<->4 and the tree is balanced.**


                              8
                3                         14
        1             6
                  4         7

                  # After deletion of 3

                              8
                4                         14
        1             6
                           7

## Binary Search Tree Traversal & Height

- **Height of the node in BST is the distance between the root node to any node that has either 1 children or no childrens**

                # BST-1
                        9
                4             17
           3        6               22
                 5     7         20

                 # minHeight:1 from 9 to 17
                 # maxHeight:3 from 9 to 5 or 7 or 20

- **A BST is said to be balaced when the difference between the max height and the min height is either 0 or 1, hence for ablove BST it is unbalanced as 3-1 =2**

- **Searching in a balanced BST is more efficient than unbalanaced tree It isalways a good approach to balance the BST for efficient searching**

- **Tree traversals can be inOrder,preOrder,postOrder,levelOrder**

- **level order explores all the nodes at a level before continuing to the next level**

### For BST -1
- **inOrder(LNR) = 3,4,5,6,7,9,17,20,22**
- **preOrder(NLR) = 9,4,3,6,5,7,17,22,20**
- **postOrder(LRN) = 3,5,7,6,4,20,22,17,9**
- **levelOrder(Breadth first search) = 9,4,17,3,6,22,5,7,20**
 
---

> Hash Tables time- O(1) search,insert,delete while space-O(n)

- **hash tables are used to implement associative arrays or mappings of key value pairs**

- **hash tables are used to implement mapped data structure or objects for instance like JSON**

- **hash tables maps strings to numbers the strings are passed from hash function and then mapped to hashes**

      keys         hash function           hashes
                         
      John Smith   ->                          02  
      Lisa Smith   ->                          01
      Sam Doe      ->                          04
      Sandra Dee   ->                          02


- **the hash functions are consistent for same input key string it outputs the same hash every time via hash function**

- **each key must be mapped to unique hash in above figure John Smith and Lisa Smith are mapped to the same hash this results in collision and then both lisa and john are placed inside the same bucket**

- **the hashed value is used as a index while searching**

- **In most of the languages hash tables are implemented for the case of javascript hash table is used to implement the objects**

- **hashtable can be implemented via nested javascript arrays** 

                hashTable=[
                        [bucket1],
                        [bucket2],
                        [bucket3],
                        [bucket4]
                ]

                where bucket1=[key:value],[key:value],[key:value]
                in case the key is same for some two or more key that somehow results in same index after processing by hashFunction.

                if no collision then each bucket will have nested array with single key value pair entry

                bucket1=[[key1:value1]]
                bucket2=[[key2:value2]]

---

> Linked List 1:03