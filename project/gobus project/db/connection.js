exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '56734',
            database: 'go_bus'
        }
    });

    return knex
}//mahmoud2001
