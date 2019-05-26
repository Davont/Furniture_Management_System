/**
├── schema
    └── business.js
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('business', {

        // 商户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        // 商户名称
        business_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'business_name',
        },
        // 收入
        business_revenues: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: 0.00,
            field: 'business_revenues'
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