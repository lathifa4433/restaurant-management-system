const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Set io globally
app.set('io', io);

// Routes Setup
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));

// Socket.io
io.on('connection', (socket) => {
    console.log('Socket client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Socket client disconnected:', socket.id);
    });
});

// Run Seeder
const seedDatabase = require('./seedData');
seedDatabase().then(() => {
    const PORT = process.env.PORT || 5002;
    server.listen(PORT, () => {
        console.log(`Server successfully booted and running on port ${PORT}`);
        console.log(`=> CORS Middleware Active`);
        console.log(`=> Sockets Active`);
    });
});
