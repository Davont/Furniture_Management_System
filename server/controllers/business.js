/**
├── controllers
    └── business.js
*/
const BusinessModel = require('../modules/business')

class businessController {
    /**
     * 创建商户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端

        let req = ctx.request.body;
        console.log(req)
        if (req.business_name) {
            try {
                // 创建商户模型
                const ret = await BusinessModel.createBusiness(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await BusinessModel.getBusinessDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建商户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建商户失败',
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
     * 获取商户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await BusinessModel.getBusinessDetail(id);
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
                let data = await BusinessModel.getBusinessDetail(0);
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
     * 修改商户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.business_name &&
            id
        ) {
            try {
                // 创建商户模型
                const ret = await BusinessModel.updateBusiness(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await BusinessModel.getBusinessDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改商户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改商户失败',
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
     * 修改商户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateBusinessTotal(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.business_revenues &&
            id
        ) {
            try {
                // 创建商户模型
                console.log(1)
                const ret = await BusinessModel.updateBusinessTotal(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                console.log(3)
                const data = await BusinessModel.getBusinessDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改商户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改商户失败',
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
     * 删除商户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        // 接收客服端
        let id = ctx.params.id;
        if (id) {
            try {
                // 创建商户模型
                const ret = await BusinessModel.deleteBusiness(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除商户成功',
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '删除商户失败',
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

module.exports = businessController