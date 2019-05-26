/**
├── schema
    └── returns.js
*/
const moment = require("moment");
const Order = require("./order");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "returns", {
            // 退货订单ID
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: true
            },
            //退货原因
            returns_reason: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "returns_reason"
            },
            order_id: {
                type: DataTypes.INTEGER,
                unique: true,
                references: {
                    model: "order",
                    key: "id"
                }
            },
            //创建时间
            returns_time: {
                type: DataTypes.DATE,
                get() {
                    return moment(this.getDataValue('returns_time')).format('YYYY-MM-DD HH:mm:ss');
                },
                defaultValue: DataTypes.NOW,
                field: 'returns_time'
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