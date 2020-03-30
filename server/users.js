// function managing user objects. creates, remoives, adds  uder to chat room.


//initialise user object
const users = [];


// user object has id, name and user nbelongs to a room
const addUser = ({id, name, room}) => {
 
    
// make sure data entered is all lowercase
name = name.trim().toLowerCase();
room = room.trim().toLowerCase();


// check if username already exists in chat group

const existingUser = users.find((user) => user.room === room && user.name === name);

if (!name || !room ) {
    return {error: "Username and room are required."}
}
if (existingUser){
    return {
        error: "Username is taken" 
    };
}

const user = {id, name, room };

// if user does not exist yet then add them to chart rpoom (array push) 
// by pushing uder object into array of users in chat room
users.push(user);

console.log({user});

return {user};
}

// toi remove user, find user using user id (determend by socker io) from chat room using the findIndex as below.
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    //delete the found user
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};