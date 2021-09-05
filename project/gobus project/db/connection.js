exports.openConnection = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'karim',
            password: '26713546',
            database: 'go_bus'
        }
    });

    return knex
}