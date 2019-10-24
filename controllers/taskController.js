const taskService = require('../services/taskService');
const taskValidate = require('../validations/taskValidation');

async function createLogTask(req, res) {
  const {
    project,
    taskId,
    taskName,
    creator,
    assignee,
    type,
    startDate,
    dueDate,
    endDate,
  } = req.body;

  taskValidate.createLogTaskValidation(req);

  await taskService.createLogTask({
    project,
    taskId,
    taskName,
    creator,
    assignee,
    type,
    startDate,
    dueDate,
    endDate,
  });

  return res.send({ status: 1, message: 'create log task success' });
}

async function updateLogTask(req, res) {
  const {
    taskId,
    taskName,
    assignee,
    type,
    startDate,
    dueDate,
    endDate,
  } = req.body;

  taskValidate.updateLogTaskValidation(req);

  await taskService.updateLogTask({
    taskId,
    taskName,
    assignee,
    type,
    startDate,
    dueDate,
    endDate,
  });

  return res.send({ status: 1, message: 'update log task success' });
}

module.exports = {
  createLogTask,
  updateLogTask,
};
