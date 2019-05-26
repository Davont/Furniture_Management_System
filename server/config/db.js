const Sequelize = require('sequelize');

const sequelize = new Sequelize('koasql', 'root', '981417972zhy@', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        dateStrings: true,
        typeCast(field, next) {
            // for reading from database
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        }
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区

});

module.exports = {
    sequelize
}