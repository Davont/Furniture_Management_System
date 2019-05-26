const jwt = require('jsonwebtoken');
const serect = 'token'; //密钥，不能丢
module.exports = (token) => {
  if (token) {
    let tokenFlag = false;
    jwt.verify(token, serect, function (err, decode) {
      if (err) {
        tokenFlag = false;
      } else {
        tokenFlag = decode;
      }
    });
    return tokenFlag;
  }
};