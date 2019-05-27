/**
├── modules
    └── business.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Business = Sequelize.import('../schema/business');
const Goods = Sequelize.import('../schema/goods');

// 自动创建表
Business.sync({
  force: false
});
Business.hasMany(Goods, {
  foreignKey: 'business_id'
})
class BusinessModel {
  /**
   * 创建商户模型
   * @param data
   * @returns {Promise<*>}
   */
  static async createBusiness(data) {
    return await Business.create({
      business_name: data.business_name,
    })
  }

  /**
   * 查询取商户详情数据
   * @param id  商户ID
   * @returns {Promise<Model>}
   */
  static async getBusinessDetail(id) {
    if (id) {
      const business = await Business.findOne({
        where: {
          id
        },
      });
      return business
    } else {
      const business = Business.findAll()
      return business
    }

  }
  /**
   * 修改商户详情数据
   * @param data  修改商户的数据
   * @param id  商户ID
   * @returns {Promise<Model>}
   */
  static async updateBusiness(data, id) {

    const business = await Business.update({
      business_name: data.business_name

    }, {
      where: {
        id: id
      }
    })
    return business
  }
  /**
   * 修改商户详情数据
   * @param data  修改商户的数据(递增)
   * @param id  商户ID
   * @returns {Promise<Model>}
   */
  static async updateBusinessTotal(data, id) {
    const business = await Business.findOne({
      where: {
        id: id
      }
    });
    const value = await business.increment('business_revenues', {
      by: data.business_revenues
    })
    return value
  }
  /**
   * 修改商户详情数据
   * @param data  修改商户的数据(递增)
   * @param id  商户ID
   * @returns {Promise<Model>}
   */
  static async returnsBusinessTotal(data, id) {
    const business = await Business.findOne({
      where: {
        id: id
      }
    });
    const value = await business.decrement('business_revenues', {
      by: data.returns_total
    })
    return value
  }
  /**
   * 删除商户
   * @param id  商户ID
   * @returns {Promise<Model>}
   */
  static async deleteBusiness(id) {

    const business = await Business.destroy({
      where: {
        id: id
      }
    })
    return business


  }
}

module.exports = BusinessModel
