const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {User} = require('./models/user');
dotenv.config();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: [process.env.LOCAL_URL, process.env.FRONTEND_URL]
    }
});

app.use(express.json());
app.use(cors({
    origin: [process.env.LOCAL_URL, process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials:true,            
    optionSuccessStatus:200
}));

app.get('/', (req, res) => {
    res.send(`<h3>Server running...</h3>`);
});

io.on('connection', socket =>  {
    // create user
    socket.on('createUserReq', data => {
        const createUser = async () => {
            try {
                const user = new User(data);
                const result = await user.save();
                socket.emit('createUserRes', {data: result, message: "User created successfully."});
            } catch (error) {
                socket.emit('createUserFailed',{data: result, message: "User created successfully."});
            }
        }
        createUser();
    });

    socket.on('createUserReq', data => {
        const createUser = async () => {
            try {
                const user = new User(data);
                const result = await user.save();
                socket.emit('createUserRes', {data: result, message: "User created successfully."});
            } catch (error) {
                socket.emit('createUserFailed',{data: result, message: "User created successfully."});
            }
        }
        createUser();
    });
});

const DB = process.env.MONGODB_URL;
mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB successfully.')
    })
    .catch(err => {
        console.log('MongoDB connection failed.');
    });

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});