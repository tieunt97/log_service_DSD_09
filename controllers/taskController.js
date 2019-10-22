const validate = require('../middlewares/validate');
const taskService = require('../services/taskService');
const { TYPE_TASK } = require('../constants');

async function createLogTask(req, res) {
  req
    .checkBody('taskId')
    .not()
    .isEmpty()
    .withMessage('field taskId is not empty');
  req
    .checkBody('createId')
    .not()
    .isEmpty()
    .withMessage('field createId is not empty');
  req
    .checkBody('assignId')
    .not()
    .isEmpty()
    .withMessage('field assignId is not empty');
  req
    .checkBody('type')
    .not()
    .isEmpty()
    .withMessage('field type is not empty')
    .custom(value => TYPE_TASK[value])
    .withMessage('field type is invalid');
  req
    .checkBody('startDate')
    .not()
    .isEmpty()
    .withMessage('field startDate is not empty');
  req
    .checkBody('dueDate')
    .not()
    .isEmpty()
    .withMessage('field dueDate is not empty');

  validate.validateParams(req);

  const {
    taskId,
    createId,
    assignId,
    type,
    startDate,
    dueDate,
    endDate,
  } = req.body;

  await taskService.createLogTask({
    taskId,
    createId,
    assignId,
    type,
    startDate,
    dueDate,
    endDate,
  });

  return res.send({ status: 1, message: 'create log task success' });
}

module.exports = {
  createLogTask,
};
