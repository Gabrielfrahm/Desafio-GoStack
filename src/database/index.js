import Sequelize from 'sequelize'; // importando o Sequelize
import databaseConfig from '../config/database'; // importando as configurações do banco
import User from '../app/models/User'; // importando o model de User
import Students from '../app/models/Students';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Checkins from '../app/models/Checkins';
import Help_orders from '../app/models/Help_orders';

const models = [User, Students, Plan, Registration, Checkins, Help_orders]; // contante que vai ser utizlida  para armazenar todos os models importados em um array

// criação da classe Databas
class Database {
    // metodo construtur sera criado toda a vez que a classe for  chamada
    constructor() {
        this.init(); // metodo init
    }

    init() {
        this.connection = new Sequelize(databaseConfig); // fazendo a coneção com o banco

        models.map((model) => model.init(this.connection)); // percorrendo os models
    }
}

export default new Database();
