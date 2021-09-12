function bfs(graph,root){
    let nodesLen={};
    // assign each node distance as infinity initially
    for (let i=0;i<graph.length;i++){
        nodesLen[i]= Infinity;
    }
    // assign the root node distance
    nodesLen[root]=0;
    
    let queue = [root];
    let current;

    while(queue.length!==0){
        // pop the front of queue i.e root
        current = queue.shift();
        // store the adjacent nodes to the root node as curConnected
        let curConnected = graph[current];
        // store the neighbour of root in neighbourIdx
        let neighbourIdx = [];
        // as in adjaceny matrix 1 indicate that node is connected to current node
        let idx = curConnected.indexOf(1);
        while(idx !== -1){
            neighbourIdx.push(idx);
            // find for the next node in the array of connected nodes to the current node
            idx = curConnected.indexOf(1,idx+1);
        }
        // set the distance for each neighbouring node that is stored in neighbourIdx as key value pairs in nodesLen object
        for (let j=0;j<neighbourIdx.length;j++){
            if(nodesLen[neighbourIdx[j]]===Infinity){
                nodesLen[neighbourIdx[j]]=nodesLen[current]+1;
                // to traverse the next node neighbours
                queue.push(neighbourIdx[j]);
            }
        }
    }
    return nodesLen;
};

// -----Quokka test case-----
// let adjMat = [
//     [0,1,1,1,0],
//     [0,0,1,0,0],
//     [1,1,0,0,0],
//     [0,0,0,1,0],
//     [0,1,0,0,0]
// ];
// computing the graph traversal array with distance of all nodes
// from the node 1 i.e the second entry in the adjMat
// console.log(bfs(adjMat,1));
