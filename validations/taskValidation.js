const validate = require('../middlewares/validate');
const { TYPE_TASK } = require('../constants');

function createLogTaskValidation(req) {
  const { startDate, endDate } = req.body;

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
}

function updateLogTaskValidation(req) {
  const { type, startDate, dueDate, endDate } = req.body;
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
  if (type) {
    req
      .checkBody('type')
      .custom(value => TYPE_TASK[value])
      .withMessage('field type is invalid');
  }
  if (startDate) {
    req
      .checkBody('startDate')
      .custom(value => validate.isDateFormat(value))
      .withMessage('startDate format invalid yyyy-mm-dd');
  }
  if (dueDate) {
    req
      .checkBody('dueDate')
      .custom(value => validate.isDateFormat(value))
      .withMessage('startDate format invalid yyyy-mm-dd');
  }
  if (startDate && dueDate) {
    req
      .checkBody('dueDate')
      .custom(value => new Date(value) >= new Date(startDate))
      .withMessage('field dueDate < startDate');
  }
  if (endDate) {
    req
      .checkBody('endDate')
      .custom(value => validate.isDateFormat(value))
      .withMessage('startDate format invalid yyyy-mm-dd');
  }
  if (startDate && endDate) {
    req
      .checkBody('endDate')
      .custom(value => new Date(value) >= new Date(startDate))
      .withMessage('field endDate < startDate');
  }

  validate.validateParams(req);
}

module.exports = {
  createLogTaskValidation,
  updateLogTaskValidation,
};
