/**
├── controllers
    └── order.js
*/
const OrderModel = require('../modules/order')

class orderController {
    /**
     * 创建订单
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        console.log(req)
        console.log(req.order_status)
        if (
            req.order_goods &&
            req.order_status &&
            req.order_totals &&
            req.users_id
        ) {
            try {
                console.log(123)
                // 创建订单模型
                const ret = await OrderModel.createOrder(req);
                console.log(ret)
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await OrderModel.getOrderDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建订单成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建订单失败',
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
     * 获取订单详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await OrderModel.getOrderDetail(id);
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
                let data = await OrderModel.getOrderDetail(0);
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
     * 修改订单
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.users_id &&
            req.order_goods &&
            req.order_status &&
            req.order_totals &&
            id
        ) {
            try {
                // 创建订单模型
                const ret = await OrderModel.updateOrder(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await OrderModel.getOrderDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改订单成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改订单失败',
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
     * 修改订单
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateStatus(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        console.log(req)
        if (
            req.order_status &&
            id
        ) {
            try {
                // 创建订单模型
                const ret = await OrderModel.updateOrderStatus(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await OrderModel.getOrderDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改订单状态成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改订单失败',
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
     * 删除订单
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        // 接收客服端
        let id = ctx.params.id;
        if (id) {
            try {
                // 创建订单模型
                const ret = await OrderModel.deleteOrder(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除订单成功',
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '删除订单失败',
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

module.exports = orderController