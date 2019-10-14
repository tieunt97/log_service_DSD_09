const router = require('express').Router();

const asyncMiddlware = require('../middlewares/wrapAsync');

const controller = require('../controllers');

router.get('/helloworld', asyncMiddlware(controller.helloworld));

module.exports = router;
