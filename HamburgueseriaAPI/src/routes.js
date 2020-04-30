const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const hamburguer = require('./routes/hamburguer')
const ingredient = require('./routes/ingredient')

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/hamburguesa', hamburguer.routes());
router.use('/ingrediente', ingredient.routes());

module.exports = router;
