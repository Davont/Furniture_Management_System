/**
├── controllers
    └── goods.js
*/
const GoodsModel = require('../modules/goods')

class goodsController {
    /**
     * 创建商品
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端

        let req = ctx.request.body;
        console.log(req)
        if (req.goods_name &&
            req.goods_image &&
            req.goods_price &&
            req.goods_intro &&
            req.business_id
        ) {
            try {
                // 创建商品模型
                const ret = await GoodsModel.createGoods(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await GoodsModel.getGoodsDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建商品成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建商品失败',
                    data: err,

                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    }

    /**
     * 获取商品详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await GoodsModel.getGoodsDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        } else {
            try {
                // 查询文章详情模型
                let data = await GoodsModel.getGoodsDetail(0);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    err
                }
            }
        }
    }
    /**
     * 修改商品
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.goods_name &&
            req.goods_image &&
            req.goods_price &&
            req.business_id &&
            req.goods_intro &&
            id !== 'undefined'
        ) {
            try {
                // 创建商品模型
                const ret = await GoodsModel.updateGoods(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await GoodsModel.getGoodsDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改商品成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改商品失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    }
    /**
     * 删除商品
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        // 接收客服端
        let id = ctx.params.id;
        if (id) {
            try {
                // 创建商品模型
                const ret = await GoodsModel.deleteGoods(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除商品成功',
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '删除商品失败',
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全',
            }
        }

    }
}

module.exports = goodsController