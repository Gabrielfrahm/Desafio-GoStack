import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlansController {
    async index(req, res) {
        const plans = await Plan.findOne({
            where: { id: req.params.id },
        });

        if (!plans) {
            return res.status(401).json({ error: 'Plan is not registered' });
        }

        return res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const plans = await Plan.findOne({
            where: { title: req.body.title },
        });

        if (plans) {
            return res.status(401).json({ error: 'plan already registered' });
        }

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.json({ id, title, duration, price });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation Fails' });
        }

        const plans = await Plan.findByPk(req.params.id);

        if (!plans) {
            return res.status(401).json({ error: 'Plan is not  registered' });
        }

        const isPlanExist = await Plan.findOne({
            where: { title: req.body.title },
        });

        if (isPlanExist) {
            return res.status(401).json({ error: 'Plan already exists' });
        }

        const { id, title, duration, price } = await plans.update(req.body);

        return res.json({ id, title, duration, price });
    }

    async delete(req, res) {
        const plans = await Plan.findByPk(req.params.id);

        if (!plans) {
            return res.status(401).json({ error: 'Plan is not  registered' });
        }

        await plans.destroy();

        return res.json(plans);
    }
}
export default new PlansController();
