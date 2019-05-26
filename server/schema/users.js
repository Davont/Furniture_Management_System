/**
├── schema
    └── users.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {

        // 用户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        // 用户账号
        users_email: {

            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            field: 'users_email',
        },
        // 收货地址
        users_address: {
            //unique: true,
            type: DataTypes.STRING,
            allowNull: false,
            field: 'users_address'
        },
        // 联系电话
        users_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'users_phone'
        },
        // 消费总额
        users_consumption: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0.00,
            field: 'users_consumption'
        },
        //创建时间
        users_resTime: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('users_resTime')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: DataTypes.NOW,
            field: 'users_resTime'
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true,
        timestamps: false,
        underscored: true
    })

}