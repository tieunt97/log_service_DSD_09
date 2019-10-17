const router = require('express').Router();

const asyncMiddlware = require('../middlewares/wrapAsync');

const reportController = require('../controllers/reportController');

router.post('/reports', asyncMiddlware(reportController.create));
router.put('/reports/:reportId', asyncMiddlware(reportController.update));
router.delete('/reports/:reportId', asyncMiddlware(reportController.remove));
router.get('/reports', asyncMiddlware(reportController.gets));
router.get('/reports/:reportId', asyncMiddlware(reportController.getById));

module.exports = router;
