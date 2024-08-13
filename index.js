const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const _ = require('lodash');
require('dotenv').config();
require('module-alias/register')
const errorHandler = require('./middlewares/middleware.error');
const ipLoggerMiddleware = require('./middlewares/middleware.ip');
const initializeDynamoDB = require('./utils/util.connection');
const cors = require('cors')
const userRoutes = require('./routes/auth/route.auth');
const storeRoutes = require('./routes/store/route.store');

const app = express();
const PORT = process.env.PORT || 1234;

const httpServer = http.createServer(app);

app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ipLoggerMiddleware);
app.use((req, res, next) => {
    req.url = _.toLower(req.url);
    next();
});

app.get('/', (req, res) => {
    res.send({ root: "ok" });
});

app.use('/api/auth', userRoutes);
app.use('/api/store', storeRoutes);

app.use((req, res) => {
    res.redirect('/');
});

app.use(errorHandler);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`Message received: ${data}`);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
