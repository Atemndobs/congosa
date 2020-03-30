const express = require ('express');
const socketio = require ('socket.io');
const http = require('http')
const chalk = require('chalk');
const router = require('./router');
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());




//connect user to chat room

io.on('connection', (socket)=> {
    console.log('We  Got new connection !!! 👶 👼');
  
    

   // connect user to chat room and send error if connectin fails
    socket.on('join', ({name, room}, callback) =>{
        
        const {error, user} = addUser({id: socket.id, name, room});
        
        if (error) {
            return callback(error);
        }

             // Successful?? : inform user he joined chat
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room: ${user.room}.`});

        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    });


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room,  users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', ()=> {
        console.log('User Just left !!! 👿');

        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
        }

    });

});



server.listen(PORT,
    () => {
        console.log(chalk.green(`Server has started on port ${PORT}`));
    console.log(chalk.yellow('go to: '+'http://localhost:5000'));
    
    })
