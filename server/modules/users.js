/**
├── modules
    └── users.js
*/
const seq = require("sequelize");
// 引入建立连接mysql数据库的db.js文件
const db = require("../config/db");
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Users = Sequelize.import("../schema/users");
const Order = Sequelize.import("../schema/order");
// 自动创建表
Users.sync({
  force: false
});
Users.hasMany(Order, {
  foreignKey: "users_id",
  constraints: false
});
class UsersModel {
  /**
   * 创建用户模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createUsers(data) {
    return await Users.create({
      users_email: data.users_email,
      users_phone: data.users_phone,
      users_address: data.users_address
    });
  }

  /**
   * 查询取用户详情数据
   * @param id  文章ID
   * @returns {Promise<Model>}
   */
  static async getUsersDetail(id) {
    if (id) {
      let users = await Users.findOne({
        where: {
          [seq.Op.or]: [{
              id: id
            },
            {
              users_email: id
            }
          ]
        }
      });
      console.log('找到的用户为：')
      console.log(users.users_email)
      return users;
    } else {
      const users = Users.findAll();
      return users;
    }
  }
  /**
   * 修改用户详情数据
   * @param data  修改用户的数据
   * @param id  用户ID
   * @returns {Promise<Model>}
   */
  static async updateUsers(data, id) {
    const users = await Users.update({
      users_email: data.users_email,
      users_phone: data.users_phone,
      users_address: data.users_address
    }, {
      where: {
        id: id
      }
    });
    return users;
  }
  /**
   * 增加用户金额数据
   * @param data  修改用户的数据（递增）
   * @param id  用户ID
   * @returns {Promise<Model>}
   */
  static async updateUsersTotal(data, id) {
    let users = await Users.findOne({
      where: {
        [seq.Op.or]: [{
            id: id
          },
          {
            users_email: id
          }
        ]
      }
    });
    const value = await users.increment('users_consumption', {
      by: data.users_consumption
    })
    return value
  }
  /**
   * 减少用户金额数据
   * @param data  修改用户的数据（递增）
   * @param id  用户ID
   * @returns {Promise<Model>}
   */
  static async returnsUsersTotal(data, id) {
    let users = await Users.findOne({
      where: {
        [seq.Op.or]: [{
            id: id
          },
          {
            users_email: id
          }
        ]
      }
    });
    const value = await users.decrement('users_consumption', {
      by: data.returns_total
    })
    return value
  }
  /**
   * 删除用户
   * @param id  用户ID
   * @returns {Promise<Model>}
   */
  static async deleteUsers(id) {
    console.log("用户id：");
    console.log(id);
    const users = await Users.destroy({
      where: {
        id: id
      }
    });
    return users;
  }
}

module.exports = UsersModel;
