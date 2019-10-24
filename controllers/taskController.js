const taskService = require('../services/taskService');
const taskValidate = require('../validations/taskValidation');

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

  taskValidate.createLogTaskValidation(req);

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

async function updateLogTask(req, res) {
  const {
    taskId,
    createId,
    assignId,
    type,
    startDate,
    dueDate,
    endDate,
  } = req.body;

  taskValidate.updateLogTaskValidation(req);

  await taskService.updateLogTask({
    taskId,
    createId,
    assignId,
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
