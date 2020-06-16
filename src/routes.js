import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';

import StudentsController from './app/controllers/StudentsControlles';

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('teste');
});

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', StudentsController.store);

export default routes;
