/**
├── modules
    └── order.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Users = Sequelize.import('../schema/users');
const Order = Sequelize.import('../schema/order');
const Returns = Sequelize.import('../schema/returns');

// 自动创建表
Order.sync({
    force: false
});
Order.belongsTo(Users, {
    as: 'orderUsers',
    foreignKey: 'users_id',
})
class OrderModel {
    /**
     * 创建订单模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createOrder(data) {
        console.log(data)
        return await Order.create({
            users_id: data.users_id,
            order_goods: data.order_goods,
            order_status: data.order_status,
            order_totals: data.order_totals,
        })
    }

    /**
     * 查询取订单详情数据
     * @param id  订单ID
     * @returns {Promise<Model>}
     */
    static async getOrderDetail(id) {
        if (id) {
            const order = await Order.findOne({
                where: {
                    id
                },
            });
            return order
        } else {
            const order = Order.findAll()
            return order
        }

    }
    /**
     * 修改订单详情数据
     * @param data  修改订单的数据
     * @param id  订单ID
     * @returns {Promise<Model>}
     */
    static async updateOrder(data, id) {

        const order = await Order.update({
            users_id: data.users_id,
            order_goods: data.order_goods,
            order_status: data.order_status,
            order_totals: data.order_totals,

        }, {
            where: {
                id: id
            }
        })
        return order
    }
    /**
     * 修改订单状态数据
     * @param data  修改订单状态的数据
     * @param id  订单ID
     * @returns {Promise<Model>}
     */
    static async updateOrderStatus(data, id) {

        const order = await Order.update({
            users_id: data.users_id,
            order_status: data.order_status,
        }, {
            where: {
                id: id
            }
        })
        return order
    }
    /**
     * 删除订单
     * @param id  订单ID
     * @returns {Promise<Model>}
     */
    static async deleteOrder(id) {

        const order = await Order.destroy({
            where: {
                id: id
            }
        })
        return order


    }
}

module.exports = OrderModel