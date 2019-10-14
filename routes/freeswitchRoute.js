const router = require('express').Router();

const asyncMiddlware = require('../middlewares/wrapAsync');
const freeswitchController = require('../controllers/freeswitchController');

router.get(
  '/freeswitch/status/ccr-calls',
  asyncMiddlware(freeswitchController.checkCcrCalls),
);

router.get('/freeswitch/status', asyncMiddlware(freeswitchController.status));

module.exports = router;
