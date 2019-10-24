const router = require('express').Router();

const asyncMiddleware = require('../middlewares/wrapAsync');

const taskController = require('../controllers/taskController');

router.post('/log-task', asyncMiddleware(taskController.createLogTask));
router.put('/log-task', asyncMiddleware(taskController.updateLogTask));
router.delete(
  '/log-task/:taskId',
  asyncMiddleware(taskController.deleteLogTask),
);
router.get('/log-task/user', asyncMiddleware(taskController.getLogTaskByUser));

module.exports = router;
