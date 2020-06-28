import Sequelize, { Model } from 'sequelize';

class Checkins extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.INTEGER,
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

export default Checkins;
