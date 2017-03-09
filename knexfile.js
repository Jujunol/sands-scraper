require('dotenv').config();

module.exports = {

    development: {
        client: process.env.db_client,
        connection: {
            host: process.env.db_host,
            database: process.env.db_name,
            user: process.env.db_user,
            password: process.env.db_password,
        },
    }

};
