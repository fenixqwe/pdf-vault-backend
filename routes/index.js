const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const sessionRouter = require('./sessionRouter');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/session', sessionRouter);

module.exports = router;