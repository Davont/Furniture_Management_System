/**
├── controllers
    └── login.js
*/
const LoginModel = require('../modules/login')
const addtoken = require('../token/addtoken');
const proving = require('../token/proving');
class loginController {
    /**
     * 创建登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        // 接收客服端

        let req = ctx.request.body;
        if (req.login_name &&
            req.login_password
        ) {
            try {
                // 创建登录模型
                const ret = await LoginModel.createLogin(req);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await LoginModel.getLoginDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建登录成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '创建登录失败',
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
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {
        let req = ctx.request.body;
        if (req.login_name &&
            req.login_password
        ) {
            try {
                // 查询登录用户详情模型
                let ret = await LoginModel.LoginCheck(req);
                const data = await LoginModel.getLoginDetail(ret.id);
                if (data.login_password == req.login_password) {
                    let token = addtoken({
                        login_name: data.login_name,
                        login_password: data.login_password,
                    }) //token中要携带的信息，自己定义
                    ctx.response.status = 200;
                    ctx.body = {
                        login_name: data.login_name,
                        code: 200,
                        msg: '登录成功',
                        token,
                    }
                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        msg: '密码或用户名错误',
                    }
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
     * 获取登录详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let req = ctx.request.header;
        let heads = ctx.request;
        let token = req['x-token'];
        let decode = proving(token);
        if (decode) {
            // 查询登录详情模型
            //let data = await LoginModel.getLoginDetail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                data: 'success',
                decode
            }
        } else {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                msg: '无权访问',
                decode
            }
        }
    }
    /**
     * 获取登录详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async logout(ctx) {
        try {
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '退出成功',
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '退出失败',
                err
            }
        }
    }
    /**
     * 修改登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        // 接收客服端
        let req = ctx.request.body;
        let id = ctx.params.id;
        if (req.login_name &&
            req.login_password &&
            id
        ) {
            try {
                // 创建登录模型
                const ret = await LoginModel.updateLogin(req, id);
                // 把刚刚新建的文章ID查询文章详情，且返回新创建的文章信息
                const data = await LoginModel.getLoginDetail(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改登录成功',
                    data
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '修改登录失败',
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
     * 删除登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        // 接收客服端
        let id = ctx.params.id;
        if (id) {
            try {
                // 创建登录模型
                const ret = await LoginModel.deleteLogin(id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除登录成功',
                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 200,
                    msg: '删除登录失败',
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

module.exports = loginController