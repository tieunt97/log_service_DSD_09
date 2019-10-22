const router = require('express').Router();

const asyncMiddleware = require('../middlewares/wrapAsync');

const taskController = require('../controllers/taskController');

router.post('/log-task', asyncMiddleware(taskController.createLogTask));

module.exports = router;
