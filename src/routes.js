import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import StudentsController from './app/controllers/StudentsControlles';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('teste');
});

routes.post('/session', SessionController.store);
routes.use(authMiddleware);

routes.post('/users', StudentsController.store);

export default routes;
