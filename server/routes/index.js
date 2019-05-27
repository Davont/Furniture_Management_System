const Router = require('koa-router');
const UsersController = require('../controllers/users');
const BusinessController = require('../controllers/business');
const GoodsController = require('../controllers/goods');
const OrderController = require('../controllers/order');
const ReturnsController = require('../controllers/returns');
const LoginController = require('../controllers/login');
var upload = require('../utils/upload');

const router = new Router({
  prefix: ''
});
router.get('/', async (ctx) => {
  await ctx.render('dist/index')
})

/**
 * 登录权限接口
 */
// 创建用户接口（路由）
router.post('/login', LoginController.login);
router.get('/login/info', LoginController.detail);
router.post('/login/logout', LoginController.logout);

/**
 * 用户接口
 */
// 创建用户接口（路由）
router.post('/users', UsersController.create);
router.post('/users/:id', UsersController.update);
router.post('/deleteUsers/:id', UsersController.delete);
router.post('/updateUsersTotal/:id', UsersController.updateUsersTotal);
router.post('/returnsUsersTotal/:id', UsersController.returnsUsersTotal);
// 获取用户详情接口（路由）
router.get('/getUsersDetail/:id', UsersController.detail);
router.get('/getUsersDetail/', UsersController.detail);

/**
 * 商户接口
 */
// 创建商户接口（路由）
router.post('/business', BusinessController.create);
router.post('/business/:id', BusinessController.update);
router.post('/updateBusinessTotal/:id', BusinessController.updateBusinessTotal);
router.post('/returnsBusinessTotal/:id', BusinessController.returnsBusinessTotal);
router.post('/deleteBusiness/:id', BusinessController.delete);
// 获取商户详情接口（路由）
router.get('/getBusinessDetail/:id', BusinessController.detail);
router.get('/getBusinessDetail/', BusinessController.detail);

//图片上传

const redirect_test = ctx => {
  let url = ctx.request.url;
  let realUrl = url.slice(7)
  ctx.response.redirect(realUrl);
  // ctx.response.body = 'redirect_test!'; //无效
}
router.get('/public/uploads/*', redirect_test);

router.post('/upload', upload.single('file'), async ctx => {
  console.log(ctx.req.file);
  // ctx.body = ctx.request.body;
  ctx.body = {
    filename: ctx.req.file, //返回文件名
    destination: ctx.req.destination //返回文件路径
  };
});
/**
 * 商品接口
 */
// 创建商品接口（路由）
router.post('/goods', GoodsController.create);
router.post('/goods/:id', GoodsController.update);
router.post('/deleteGoods/:id', GoodsController.delete);
// 获取商品详情接口（路由）
router.get('/getGoodsDetail/:id', GoodsController.detail);
router.get('/getGoodsDetail/', GoodsController.detail);
/**
 * 订单接口
 */
// 创建订单接口（路由）
router.post('/order', OrderController.create);
router.post('/order/:id', OrderController.update);
router.post('/orderStatus/:id', OrderController.updateStatus);
router.post('/deleteOrder/:id', OrderController.delete);
// 获取订单详情接口（路由）
router.get('/getOrderDetail/:id', OrderController.detail);
router.get('/getOrderDetail/', OrderController.detail);
/**
 * 退货订单接口
 */
// 创建退货订单接口（路由）
router.post('/returns', ReturnsController.create);
router.post('/returns/:id', ReturnsController.update);
router.post('/deleteReturns/:id', ReturnsController.delete);
// 获取退货订单详情接口（路由）
router.get('/getReturnsDetail/:id', ReturnsController.detail);
router.get('/getReturnsDetail/', ReturnsController.detail);
module.exports = router;
