import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import CheckinsController from './app/controllers/CheckinsController';
import StudentsController from './app/controllers/StudentsControlles';
import PlansController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('teste');
});
routes.post('/students/:id/checkins', CheckinsController.store);

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', StudentsController.store);
routes.put('/users', StudentsController.update);

routes.post('/plans', PlansController.store);
routes.put('/plans/:id', PlansController.update);
routes.delete('/plans/:id', PlansController.delete);
routes.get('/plans/:id', PlansController.index);

routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);
routes.get('/registrations/:id', RegistrationController.index);

export default routes;
