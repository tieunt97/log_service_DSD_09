const validate = require('../middlewares/validate');
const { TYPE_TASK } = require('../constants');

function createLogTaskValidation(req) {
  const { startDate, endDate, assignee } = req.body;

  req
    .checkBody('taskId')
    .not()
    .isEmpty()
    .withMessage('field taskId is not empty');
  req
    .checkBody('taskName')
    .not()
    .isEmpty()
    .withMessage('field taskName is not empty');
  req
    .checkBody('project')
    .exists({
      checkNull: true,
    })
    .withMessage('field project not null')
    .custom(value => {
      return (
        value.id && typeof value.id === 'string' && value.id.trim().length > 0
      );
    })
    .withMessage('field project.id invalid length > 0')
    .custom(value => {
      return (
        value.name &&
        typeof value.name === 'string' &&
        value.name.trim().length > 0
      );
    })
    .withMessage('field project.name invalid length > 0');
  req
    .checkBody('creator')
    .exists({
      checkNull: true,
    })
    .withMessage('field creator not null')
    .custom(value => {
      return (
        value.id && typeof value.id === 'string' && value.id.trim().length > 0
      );
    })
    .withMessage('field creator.id invalid length > 0')
    .custom(value => {
      return (
        value.name &&
        typeof value.name === 'string' &&
        value.name.trim().length > 0
      );
    })
    .withMessage('field creator.name invalid length > 0');
  if (assignee) {
    req
      .checkBody('assignee')
      .custom(value => {
        return (
          value.id && typeof value.id === 'string' && value.id.trim().length > 0
        );
      })
      .withMessage('field assignee.id invalid length > 0')
      .custom(value => {
        return (
          value.name &&
          typeof value.name === 'string' &&
          value.name.trim().length > 0
        );
      })
      .withMessage('field assignee.name invalid length > 0');
  }
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
  const { taskName, assignee, type, startDate, dueDate, endDate } = req.body;
  req
    .checkBody('taskId')
    .not()
    .isEmpty()
    .withMessage('field taskId is not empty');
  if (taskName != null) {
    req
      .checkBody('taskName')
      .not()
      .isEmpty()
      .withMessage('field taskName is not empty');
  }
  if (assignee) {
    req
      .checkBody('assignee')
      .custom(value => {
        return (
          value.id && typeof value.id === 'string' && value.id.trim().length > 0
        );
      })
      .withMessage('field assignee.id invalid length > 0')
      .custom(value => {
        return (
          value.name &&
          typeof value.name === 'string' &&
          value.name.trim().length > 0
        );
      })
      .withMessage('field assignee.name invalid length > 0');
  }
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
