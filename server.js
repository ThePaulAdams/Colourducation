const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Multiplayer Logic
const players = {};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Create new player entry
    players[socket.id] = {
        id: socket.id,
        tileId: null,
        isShip: false,
        color: Math.random() * 0xffffff
    };

    // Send current players to new player
    socket.emit('currentPlayers', players);
    
    // Broadcast new player to others
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('playerMove', (data) => {
        if (players[socket.id]) {
            players[socket.id].tileId = data.tileId;
            players[socket.id].isShip = data.isShip;
            socket.broadcast.emit('playerMoved', { id: socket.id, ...data });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Hex Planet game server running on port ${port}`);
});