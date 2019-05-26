/**
├── schema
    └── goods.js
*/
const Business = require("./business");
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "goods", {
      // 商品ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      // 商品名称
      goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "goods_name"
      },
      //商品简介
      goods_intro: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "goods_intro"
      },

      // 价格
      goods_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: "goods_price"
      },
      //商品图片地址
      goods_image: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "goods_image"
      }
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