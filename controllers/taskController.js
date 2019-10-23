const validate = require('../middlewares/validate');
const taskService = require('../services/taskService');
const CustomError = require('../errors/CustomError');
const statusCodes = require('../errors/statusCode');
const { TYPE_TASK } = require('../constants');

async function createLogTask(req, res) {
  const {
    taskId,
    createId,
    assignId,
    type,
    startDate,
    dueDate,
    endDate,
  } = req.body;

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
    .withMessage('field startDate is not empty')
    .custom(value => validate.isDateFormat(value))
    .withMessage('startDate format invalid yyyy-mm-dd');
  req
    .checkBody('dueDate')
    .not()
    .isEmpty()
    .withMessage('field dueDate is not empty')
    .custom(value => validate.isDateFormat(value))
    .withMessage('startDate format invalid yyyy-mm-dd')
    .custom(value => new Date(value) >= new Date(startDate))
    .withMessage('field dueDate < startDate');

  if (endDate) {
    req
      .checkBody('endDate')
      .custom(value => validate.isDateFormat(value))
      .withMessage('startDate format invalid yyyy-mm-dd')
      .custom(value => new Date(value) >= new Date(startDate))
      .withMessage('field endDate < startDate');
  }

  validate.validateParams(req);

  if (await taskService.checkTaskExist({ taskId })) {
    throw new CustomError(statusCodes.BAD_REQUEST, 'log task exists');
  }

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
