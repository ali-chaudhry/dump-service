
const dotenv = require('dotenv');
dotenv.config("../.env");

console.log(process.env);

module.exports = {
    postgress: {
        db1:{
            host:process.env.POSTGRESSQL_HOST_1,
            port: process.env.POSTGRESSQL_PORT_1,
            database: process.env.POSTGRESSQL_DATABASE_NAME_1,
            user: process.env.POSTGRESSQL_USER_1,
            password: process.env.POSTGRESSQL_PASSWORD_1,
        },
        db2: {
            host:process.env.POSTGRESSQL_HOST_2,
            port: process.env.POSTGRESSQL_PORT_2,
            database: process.env.POSTGRESSQL_DATABASE_NAME_2,
            user: process.env.POSTGRESSQL_USER_2,
            password: process.env.POSTGRESSQL_PASSWORD_2,
        }
       
    },
    mysql: {
        db1: {
            host:process.env.MYSQL_HOST_1,
            port: process.env.MYSQL_PORT_1,
            database: process.env.MYSQL_DATABASE_NAME_1,
            user: process.env.MYSQL_USER_1,
            password: process.env.MYSQL_PASSWORD_1,
        }
    }
}
