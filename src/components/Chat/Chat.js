import React, {useEffect, useState } from 'react';
import  queryString from 'query-string'

import io from 'socket.io-client'

import '../Chat/Chat.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'

import TextContainer from '../TextContainer/TextContainer'

let socket;
const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    
    const ENDPOINT = 'https://chatter-socket-react.herokuapp.com/';
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
    
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
    
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // cunction forsendoing message (to be use in JSX)
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            // remember emit function recieves 3 params, function name, function to run and callback
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    console.log(message, messages);




    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room= {room}/>
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    );
};

export default Chat;
