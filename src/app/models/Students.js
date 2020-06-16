import Sequelize, { Model } from 'sequelize'; // importando o Sequelize e o Modal

class Students extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                idade: Sequelize.INTEGER,
                peso: Sequelize.FLOAT,
                altura: Sequelize.FLOAT,
            },
            {
                sequelize,
            }
        );
    }
}
export default Students;
