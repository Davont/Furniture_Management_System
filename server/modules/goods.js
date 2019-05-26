/**
├── modules
    └── goods.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Goods = Sequelize.import('../schema/goods');
const Business = Sequelize.import('../schema/business');
// 自动创建表
Goods.sync({
    force: false
});
Goods.belongsTo(Business, {
    as: 'Sales',
    foreignKey: 'business_id'
})
class GoodsModel {
    /**
     * 创建商品模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createGoods(data) {
        return await Goods.create({
            goods_name: data.goods_name,
            goods_image: data.goods_image,
            business_id: data.business_id,
            goods_price: data.goods_price,
            goods_intro: data.goods_intro
        })
    }

    /**
     * 查询取商品详情数据
     * @param id  商品ID
     * @returns {Promise<Model>}
     */
    static async getGoodsDetail(id) {
        if (id) {
            const goods = await Goods.findOne({
                where: {
                    id
                },
            });
            return goods
        } else {
            const goods = Goods.findAll()
            return goods
        }

    }
    /**
     * 修改商品详情数据
     * @param data  修改商品的数据
     * @param id  商品ID
     * @returns {Promise<Model>}
     */
    static async updateGoods(data, id) {

        const goods = await Goods.update({
            goods_name: data.goods_name,
            goods_image: data.goods_image,
            business_id: data.business_id,
            goods_price: data.goods_price,
            goods_intro: data.goods_intro

        }, {
            where: {
                id: id
            }
        })
        return goods
    }
    /**
     * 删除商品
     * @param id  商品ID
     * @returns {Promise<Model>}
     */
    static async deleteGoods(id) {

        const goods = await Goods.destroy({
            where: {
                id: id
            }
        })
        return goods


    }
}

module.exports = GoodsModel