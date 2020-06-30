import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controllers/SessionController';
import CheckinsController from './app/controllers/CheckinsController';
import StudentsController from './app/controllers/StudentsControlles';
import PlansController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import HelpController from './app/controllers/HelpController';
import AnswerControll from './app/controllers/AnswerControll';

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('teste');
});

routes.post('/students/:id/help-orders', HelpController.store); // rota para criar pergunta para academia
routes.get('/students/:id/help-orders', HelpController.index); // rota para listar todas as perguntas do aluno

routes.post('/students/:id/checkins', CheckinsController.store); // rota para cria checkin
routes.get('/students/:id/checkins', CheckinsController.index); // rota paralistar os checkin

routes.post('/session', SessionController.store); // rota que cria a sessão de login

routes.use(authMiddleware); // middleware de verificação de login
routes.post('/users', StudentsController.store); // rota apara criar aluno
routes.put('/users', StudentsController.update); // rota para modificar aluno

routes.post('/plans', PlansController.store); // rota para criar plano
routes.put('/plans/:id', PlansController.update); // rota para alterar os planos
routes.delete('/plans/:id', PlansController.delete); // rota para deletar um plano
routes.get('/plans/:id', PlansController.index); // rota para listar os planos

routes.post('/registrations', RegistrationController.store); // rota para criar matricula para aluno
routes.put('/registrations/:id', RegistrationController.update); // rota para editar matricula de aluno
routes.delete('/registrations/:id', RegistrationController.delete); // rota para deletar matricula de aluno
routes.get('/registrations/:id', RegistrationController.index); // rota para listar as matriculas

routes.get('/help-orders', AnswerControll.index); // rota para listar perguntas para a academia com os nulus
routes.put('/help-orders/:id/answer', AnswerControll.update); // rota para listar perguntas para a academia com os nulus

export default routes;
