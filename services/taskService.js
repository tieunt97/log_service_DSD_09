const taskModel = require('../models/task');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function createLogTask({
  taskId,
  createId,
  assignId,
  type,
  startDate,
  dueDate,
  endDate,
}) {
  const result = await taskModel.create({
    taskId,
    createId,
    assignId,
    type,
    startDate,
    dueDate,
    endDate,
  });

  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Create Log Task Error',
    );
  }
}

module.exports = {
  createLogTask,
};
