const users = [];

// Join user to the chatroom array users
function userJoin(id,username,room){
    const user = {id,username,room};
    
    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

// User leaves chat
// removes the user from users array
function userLeave(id){
    const index = users.findIndex(user=> user.id === id);
    
    // i.e user found in the array users for a room
    // then remove this user
    if(index!== -1){
        // removing a user
        // return the user which got removed
        return users.splice(index,1)[0];
    }

}

// Get all the room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}