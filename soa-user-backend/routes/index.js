const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const sessionRouter = require('./sessionRouter');
const roleRouter = require('./roleRouter');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/session', sessionRouter);
router.use('/roles', roleRouter);

module.exports = router;