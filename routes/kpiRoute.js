const router = require('express').Router();

const asyncMiddlware = require('../middlewares/wrapAsync');

const kpiController = require('../controllers/kpiController');

router.post('/kpi/user', asyncMiddlware(kpiController.createByUser));
router.get('/kpi/user', asyncMiddlware(kpiController.getByUserId));
router.get('/kpi/department', asyncMiddlware(kpiController.getByDepartment));
router.get('/kpi', asyncMiddlware(kpiController.getByTime));

module.exports = router;
