import * as Yup from 'yup';
import { parseISO, endOfDay, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Registration from '../models/Registration';
import Students from '../models/Students';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import CreateMail from '../jobs/CreatedMail';
import UpdatedMail from '../jobs/UpdatedMail';

class RegistrationController {
    async index(req, res) {
        const registration = await Registration.findByPk(req.params.id);

        if (!registration) {
            return res.status(401).json({ error: 'Registration not fuld' });
        }

        return res.json(registration);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
        });

        // verifica as informações
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fials' });
        }

        const { start_date, student_id, plan_id } = req.body;
        // verifica se  id do estudante existe
        const isStudent = await Students.findByPk(student_id);

        if (!isStudent) {
            return res.status(400).json({ error: 'Student is not registred' });
        }
        // verifica se o plano existe
        const isPlan = await Plan.findByPk(plan_id);

        if (!isPlan) {
            return res.status(400).json({ error: 'Plan is not registred' });
        }

        // pega a data passada
        const date = endOfDay(parseISO(start_date));
        // dia atual
        const currentDay = new Date();
        // verifica se a data passada não e a anterior que a data de hoje
        if (date < currentDay) {
            return res
                .status(400)
                .json({ error: 'Past date are not permitted' });
        }
        // preço final do plano
        const price = parseFloat(isPlan.price) * parseFloat(isPlan.duration);

        // const month = date.getMonth() + 1 + isPlan.duration;

        // calculando a data final
        const endDate = addMonths(date, isPlan.duration);
        const formatDate = format(endDate, "dd 'de' MMMM', às' H:mm'h'", {
            locale: pt, // linguagem em pt
        });
        // verifica se o estudante ja nao tem um plano
        const register = await Registration.findOne({ where: { student_id } });

        if (register) {
            return res
                .status(401)
                .json({ error: 'Student already have exist registration' });
        }
        // cria os usuario
        const result = await Registration.create({
            student_id,
            plan_id,
            start_date,
            end_date: endDate,
            price,
        });

        await Queue.add(CreateMail.key, {
            isStudent,
            isPlan,
            formatDate,
            price,
        });

        return res.json(result);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            plan_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const idRegistration = req.params.id;

        const registration = await Registration.findByPk(idRegistration);

        if (!registration) {
            return res.status(400).json({ error: 'Registration not found' });
        }

        const { plan_id } = req.body;

        const plan = await Plan.findOne({
            where: { id: plan_id },
        });

        if (!plan) {
            return res.status(401).json({ error: 'plan is not found ' });
        }

        // if (isRegistration.plan_id === plan_id) {
        //     return res
        //         .status(401)
        //         .json({ error: 'student already has this plan ' });
        // }

        const end_date = addMonths(new Date(), plan.duration);
        const formatDate = format(end_date, "dd 'de' MMMM', às' H:mm'h'", {
            locale: pt, // linguagem em pt
        });

        const price = parseFloat(plan.price) * parseFloat(plan.duration);

        const up = { plan_id, start_date: new Date(), end_date, price };

        await registration.update(up);

        await Queue.add(UpdatedMail.key, {
            registration,
            plan,
            formatDate,
            price,
        });

        return res.json(up);
    }

    async delete(req, res) {
        const registration = await Registration.findByPk(req.params.id);

        if (!registration) {
            return res.status(401).json({ error: 'Registration dont no fuld' });
        }

        await registration.destroy();

        return res.json(registration);
    }
}

export default new RegistrationController();
