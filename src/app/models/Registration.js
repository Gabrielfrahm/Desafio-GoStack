import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.INTEGER,
                plan_id: Sequelize.INTEGER,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                price: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Students, {
            foreignKey: 'student_id',
            as: 'student',
        }); // associando metodo de chave estrangeira e dando apelido
        this.belongsTo(models.Plan, {
            foreignKey: 'plan_id',
            as: 'plan',
        });
    }
}

export default Registration;
