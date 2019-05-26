/**
├── modules
    └── returns.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Order = Sequelize.import('../schema/order');
const Returns = Sequelize.import('../schema/returns');

// 自动创建表
Returns.sync({
    force: false
});
class ReturnsModel {
    /**
     * 创建退货订单模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createReturns(data) {
        return await Returns.create({
            order_id: data.order_id,
            returns_reason: data.returns_reason,
        })
    }

    /**
     * 查询取退货订单详情数据
     * @param id  退货订单ID
     * @returns {Promise<Model>}
     */
    static async getReturnsDetail(id) {
        if (id) {
            const returns = await Returns.findOne({
                where: {
                    id
                },
            });
            return returns
        } else {
            const returns = Returns.findAll()
            return returns
        }

    }
    /**
     * 修改退货订单详情数据
     * @param data  修改退货订单的数据
     * @param id  退货订单ID
     * @returns {Promise<Model>}
     */
    static async updateReturns(data, id) {

        const returns = await Returns.update({
            order_id: data.order_id,
            returns_reason: data.returns_reason,

        }, {
            where: {
                id: id
            }
        })
        return returns
    }
    /**
     * 删除退货订单
     * @param id  退货订单ID
     * @returns {Promise<Model>}
     */
    static async deleteReturns(id) {

        const returns = await Returns.destroy({
            where: {
                id: id
            }
        })
        return returns


    }
}

module.exports = ReturnsModel