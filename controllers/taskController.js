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
    action,
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
    action,
  });

  return res.send({ status: 1, message: 'create log task success' });
}

// async function updateLogTask(req, res) {
//   const {
//     taskId,
//     taskName,
//     assignee,
//     type,
//     startDate,
//     dueDate,
//     endDate,
//   } = req.body;

//   taskValidate.updateLogTaskValidation(req);

//   await taskService.updateLogTask({
//     taskId,
//     taskName,
//     assignee,
//     type,
//     startDate,
//     dueDate,
//     endDate,
//   });

//   return res.send({ status: 1, message: 'update log task success' });
// }

// async function deleteLogTask(req, res) {
//   const { taskId } = req.params;

//   await taskService.deleteLogTask(taskId);

//   res.send({ status: 1, message: 'delete log task success' });
// }

async function getLogTaskById(req, res) {
  const { taskId } = req.params;

  const result = await taskService.getLogTaskById(taskId);

  if (!result) {
    res.send({ status: 0, message: 'Log Task not found' });
  }

  res.send({ status: 1, result });
}

async function getLogTaskByProject(req, res) {
  const { projectId } = req.params;
  const { startDate, endDate, limit, page } = req.query;

  taskValidate.getLogTaskByProjectValidation(req);

  const results = await taskService.getLogTaskByProject({
    projectId,
    startDate,
    endDate,
    limit,
    page,
  });

  res.send({ status: 1, results });
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
  // updateLogTask,
  // deleteLogTask,
  getLogTaskById,
  getLogTaskByProject,
  getLogTaskByUser,
};
