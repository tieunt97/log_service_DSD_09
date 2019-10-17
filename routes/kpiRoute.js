const router = require('express').Router();

const asyncMiddlware = require('../middlewares/wrapAsync');

const kpiController = require('../controllers/kpiController');

router.post('/kpi/user', asyncMiddlware(kpiController.createbyUser));
router.get('/kpi/user/:userId', asyncMiddlware(kpiController.getByUserId));
router.get(
  '/kpi/department/:departmentId',
  asyncMiddlware(kpiController.getByDepartment),
);
router.get('/kpi', asyncMiddlware(kpiController.getByTime));

module.exports = router;
