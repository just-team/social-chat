import * as io from 'socket.io-client/socket.io';
import ChatEmitter from '../emitters/chat';
import LoginEmitter from '../emitters/login'
import config from '../config';

const socket = io.connect(`${config.host}:${config.port}`, {
  transports: ['websocket']
});

ChatEmitter.addListener('connect', (data) => {
    console.log("Emitting connect. Data is :", data);
    socket.emit('connectToChat', data);
});

ChatEmitter.addListener('send message', (data) => {
    socket.emit('send message', data);
});

ChatEmitter.addListener('send_user_data', (data) => {
    socket.emit('login', data);
});

socket.on('get message', (data) => {
    ChatEmitter.emit('get message', data);
});

socket.on('userTyping', (data) => {
   ChatEmitter.emit('userTyping', data); 
});

socket.on('get messages', (data) => {
    ChatEmitter.emit('get messages', data);
});

socket.on('login complete', (userId) => {
    LoginEmitter.emit('loggedIn', userId);
});

socket.on('connect_failed', function() {
    console.log("There seems to be an issue with the connection!");
});

socket.on('error', function(err) {
    console.log("Error on socket:", err);
});