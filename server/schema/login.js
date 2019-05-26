/**
├── schema
    └── login.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('login', {

        // 登录ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        // 登录账号
        login_name: {

            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            field: 'login_name',
        },
        login_password: {

            type: DataTypes.STRING,
            //unique: true,
            allowNull: false,
            field: 'login_password',
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 login
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })
}