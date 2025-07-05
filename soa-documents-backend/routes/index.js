const Router = require('express');
const router = new Router();

const documentRouter = require("./documentRouter");

router.use('/documents', documentRouter);

module.exports = router;