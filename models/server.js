const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Connection to the database
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes of the application
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS 
        this.app.use(cors());

        // Parse and Read of the body
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} 🚀`);
        });
    }
}

module.exports = Server;