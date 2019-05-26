/**
├── controllers
    └── users.js
*/
const UsersModel = require('../modules/users')

class usersController {
    /**
     * 创建用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端

        let req = ctx.request.body;
        if (req.users_email &&
            req.users_phone &&
            req.users_address
        ) {
            try {
                // 创建用户模型
                const ret = await UsersModel.createUsers(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await UsersModel.getUsersDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建用户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建用户失败',
                    data: err.errors[0].message,
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
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;
        if (id) {
            try {
                // 查询文章详情模型
                let data = await UsersModel.getUsersDetail(id);
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
        } else {
            try {
                // 查询文章详情模型
                let data = await UsersModel.getUsersDetail(0);
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
     * 修改用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.users_email &&
            req.users_phone &&
            req.users_address &&
            id
        ) {
            try {
                // 创建用户模型
                const ret = await UsersModel.updateUsers(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await UsersModel.getUsersDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改用户成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改用户失败',
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
     * 修改用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateUsersTotal(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (
            req.users_consumption &&
            id
        ) {
            try {
                // 创建用户模型
                const ret = await UsersModel.updateUsersTotal(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await UsersModel.getUsersDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改用户成功',
                    data
                }

            } catch (err) {
                console.log("出错的原因是")
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改用户失败',
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
     * 删除用户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        // 接收客服端
        let id = ctx.params.id;
        if (id) {
            try {
                // 创建用户模型
                const ret = await UsersModel.deleteUsers(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除用户成功',
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '删除用户失败',
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

module.exports = usersController