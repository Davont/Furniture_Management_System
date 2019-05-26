/**
├── schema
    └── order.js
*/
const Users = require("./users");
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "order", {
            // 订单ID
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: true
            },
            //所购商品
            order_goods: {
                type: DataTypes.JSON,
                allowNull: false,
                field: "order_goods"
            },
            //订单状态
            order_status: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "order_status"
            },
            // 订单总额
            order_totals: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                field: "order_totals"
            },
            //创建时间
            order_time: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('order_time')).format('YYYY-MM-DD HH:mm:ss');
                },
                defaultValue: DataTypes.NOW,
                field: 'order_time'
            },
        }, {
            // 如果为 true 则表的名称和 model 相同，即 user
            // 为 false MySQL创建的表名称会是复数 users
            // 如果指定的表名称本就是复数形式则不变
            freezeTableName: true,
            timestamps: false,
            underscored: true
        }
    );
};