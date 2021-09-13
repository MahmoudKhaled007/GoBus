exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
<<<<<<< HEAD
            user: 'root',
            password: '56734',
=======
            user: 'karim',
            password: '26713546',
>>>>>>> dad160502f7d5832974fc3c7a00d7a296ea1fecf
            database: 'go_bus'
        }
    });

    return knex
}