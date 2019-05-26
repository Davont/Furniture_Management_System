/**
├── modules
    └── login.js
*/

// 引入建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的文章数据表模型文件
const Login = Sequelize.import('../schema/login');
// 自动创建表
Login.sync({
    force: false
});
class LoginModel {
    /**
     * 创建登录模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createLogin(data) {
        return await Login.create({
            login_name: data.login_name,
            login_password: data.login_password,
        })
    }

    /**
     * 查询取登录详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getLoginDetail(id) {
        if (id) {
            const login = await Login.findOne({
                where: {
                    id
                },
            });
            return login
        } else {
            const login = Login.findAll()
            return login
        }

    }

    /**
     * 登录验证
     * @param data  文章ID
     * @returns {Promise<Model>}
     */
    static async LoginCheck(data) {

        const login = await Login.findOne({
            where: {
                login_name: data.login_name
            },
        });
        return login


    }
    /**
     * 修改登录详情数据
     * @param data  修改登录的数据
     * @param id  登录ID
     * @returns {Promise<Model>}
     */
    static async updateLogin(data, id) {

        const login = await Login.update({
            login_name: data.login_name,
            login_password: data.login_password,
        }, {
            where: {
                id: id
            }
        })
        return login
    }
    /**
     * 删除登录
     * @param id  登录ID
     * @returns {Promise<Model>}
     */
    static async deleteLogin(id) {

        const login = await Login.destroy({
            where: {
                id: id
            }
        })
        return login
    }
}

module.exports = LoginModel