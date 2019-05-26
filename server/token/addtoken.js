const jwt = require('jsonwebtoken');
const serect = 'token'; //密钥，不能丢
module.exports = (userinfo) => { //创建token并导出
    const token = jwt.sign({
        login_name: userinfo.login_name,
        login_password: userinfo.login_password,
    }, serect, {
        expiresIn: '1h'
    });
    return token;
};