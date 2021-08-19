# Indexing (DATABASES or DISK)
For MongoDB Full Indexing Docs-> https://docs.mongodb.com/manual/indexes/

## Basics B Tree and B+ Tree
- [x] disk structure
- [x] how data is stored in disk
- [x] What is indexing
- [x] what is multilevel indexing
- [x] M-way search Tree
- [x] Btree
- [x] Insertion & Deletion in Btree
- [x] B+tree

### 1.) Disk Structure(Concentric logical circles)
- ****Any location on the disk can be reffered via Track no. , Sector No.****
- ****the point where track and sector meet is called blocks****

          Block Address= (Track No. or Sector No.)

- ****Disk read write operation are done in terms of these Blocks****

- ****Suppose we have a block of 512 bytes then starting address would be 0 and ending address will be 511 each byte in this block has its own address called offset.****

           Byte Address= (Block address[track No,Sector No] and offset)

- ****A typical program executes at RAM (Main memory) and not on the Disk itself, everytime a piece of code is executed it has to be retrieved from disk to RAM and then executed at RAM resources.****

### IMPORTANT Organizing Data in the main memory i.e RAM is called Data Structures

### While organizing the data on the disk is called DBMS

----------------------------------------

## 2.) How data is organized on a DISK

                eid(10)   name(50)   dept(10) Section(8) add(50)

****suppose we have 5 columns as employee database and Block size=512 bytes on Disk.****

****with each column byte size required indicated so total bytes 128 bytes for each record i.e each row needs 128 bytes to store info about 1 employee on the disk****

****Suppose we have 100 employees /records.****

                  # no. of records that can be stored on single block
                  Block on disk/bytes required by each record
                  512/128= 4

                  # means 4 rows/employee/records can be stored in 1 block on the disk.

                  for 100 records no of blocks required= 100/4=25

                  25 blocks required.

- [x] ****IMPORTANT  so for effective searching of a specific employee record we will maintain a Dense INDEX which comprise of eid and pointer.****

                Index= eid + pointer(pointing to the data stored on the disk)

- [x] ****there is an index record for every search key value in the database. This makes searching faster but requires more space to store index records itself on the disk. Index records contain search key value and a pointer to the actual record on the disk.****

                Index space required to store on disk
                eid(10 bytes) + pointer(assume 6 bytes)

                so no. of entries by block 512/16
                =32

                and for 100 entries 100/32 = 3+ blocks for storing Index.

                so assume we need 4 blocks for 1 index.

                so for searching a record now it will search the 4 blocks for that eid and the 1 block on the disk.

                so total 5 blocks searched for an entry rather then all the blocks.

## Multilevel Indexing

- ****Suppose for the previous case in previous section thier are 1000 records say we need 40 Blocks to store indexes than searching in the Index itself become computer intensive task to counter it one way is to make the Index of the Index i.e Nested/Multilevel Index****

- ****But the catch is that the multilevel nested index will have a single pointer for a group of blocks of index****

- [x] IMPORTANT ****So adding multilevel indexing where nested indexes pointer are pointing to set of entries rather than a singe entry the no of blocks to access while searching decreases and search time decreases this becomes the base for B Tree****


## M - Way Search Tree(Based on BST where left node are less than root and right is greater than root.)

- [x] m way tree in which each node has at most m children and m-1 keys.

## B-Tree
****Time Complexity= O(logn) for searching,insert,delete****

https://www.geeksforgeeks.org/introduction-of-b-tree-2/

- [x] B tree is suitable when we are searching on the DISK rather than RAM(if Searching on RAM then Binary Search tree is the best)

- [x] ****rules of Btree is m/2 children , root can have 2 children , all leaf at same level, creation process is bottom up, insertion always at leaf nodes.****

            example -> m=4 (degree)
            so each node can have m-1 i.e 3 keys.
            keys=>10,20,40,50,60,70,80,30,35

            [10,20,40] for 50 split
                    [40]
              [10,20]   [50,60,70]

                for 80 split
                    [40,70]
          [10,20,30]   [50,60]   [80]

                for 35 split
                [30,  40,       70]
      [10,20]     [35]  [50,60]   [80]

- ****B-tree helps in creating multilevel indexing****
- ****more the level created lesser the block access time in the disk****

## MongoDB & Indexing Hands On
