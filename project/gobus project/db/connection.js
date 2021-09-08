exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'karim',
            password: '26713546',
            database: 'go_bus'
        }
    });

    return knex
}//mahmoud2001