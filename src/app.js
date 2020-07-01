import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
    constructor() {
        this.server = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.server.use(express.json());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')) // metodo que foi criado para exibir a imagem de avatar utilizando um metodo static
        );
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
