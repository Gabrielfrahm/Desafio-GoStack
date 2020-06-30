import Sequelize, { Model } from 'sequelize';

class Help_orders extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.INTEGER,
                question: Sequelize.TEXT,
                answer: Sequelize.TEXT,
                answer_at: Sequelize.DATE,
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
    }
}

export default Help_orders;
