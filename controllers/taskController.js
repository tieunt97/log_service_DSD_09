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

async function deleteLogTask(req, res) {
  const { taskId } = req.params;

  await taskService.deleteLogTask(taskId);

  res.send({ status: 1, message: 'delete log task success' });
}

async function getLogTaskByUser(req, res) {
  const { userId, type, startDate, endDate, limit, page } = req.query;

  taskValidate.getLogTaskByUserValidation(req);

  const results = await taskService.getLogTaskByUser({
    userId,
    type,
    startDate,
    endDate,
    limit,
    page,
  });

  res.send({ status: 1, results });
}

module.exports = {
  createLogTask,
  updateLogTask,
  deleteLogTask,
  getLogTaskByUser,
};
