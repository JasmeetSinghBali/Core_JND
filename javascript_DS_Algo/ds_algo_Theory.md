# DS Algo with javascript

> ## Stacks (DS) refer stack_js_oops

- **LIFO -> first in first out**
- Always pop's the most recently pushed element in the stack
- **example browser back button that stores the pages in FIFO fashion when users hit the back button the most recently visited page with respect to current page is displayed.**

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

> Binary Search Tree(BST) O(logn)

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