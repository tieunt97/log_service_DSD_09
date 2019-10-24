const taskModel = require('../models/task');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function createLogTask({
  project,
  taskId,
  taskName,
  creator,
  assignee,
  type,
  startDate,
  dueDate,
  endDate,
}) {
  if (await checkTaskExist({ taskId })) {
    throw new CustomError(statusCode.BAD_REQUEST, 'log task exists');
  }

  const result = await taskModel.create({
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

  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Create Log Task Error',
    );
  }
}

async function updateLogTask({
  taskId,
  taskName,
  assignee,
  type,
  startDate,
  dueDate,
  endDate,
}) {
  if (!(await checkTaskExist({ taskId }))) {
    throw new CustomError(statusCode.BAD_REQUEST, 'taskId not exists');
  }

  const updateObj = {};

  if (taskName) {
    updateObj.taskName = taskName;
  }
  if (assignee) {
    updateObj.assignee = assignee;
  }
  if (type) {
    updateObj.type = type;
  }
  if (startDate) {
    updateObj.startDate = startDate;
  }
  if (dueDate) {
    updateObj.dueDate = dueDate;
  }
  if (endDate) {
    updateObj.endDate = endDate;
  }

  if (!startDate) {
    const rsStartDate = await taskModel.findOne(
      { taskId },
      { startDate: 1, _id: 0 },
    );

    if (dueDate && new Date(rsStartDate.startDate) > new Date(dueDate)) {
      throw new CustomError(
        statusCode.BAD_REQUEST,
        `field dueDate < startDate: ${new Date(
          rsStartDate.startDate,
        ).toISOString()}`,
      );
    }

    if (endDate && new Date(rsStartDate.startDate) > new Date(endDate)) {
      throw new CustomError(
        statusCode.BAD_REQUEST,
        `field endDate < startDate: ${new Date(
          rsStartDate.startDate,
        ).toISOString()}`,
      );
    }
  }

  const result = await taskModel.updateOne({ taskId }, { $set: updateObj });

  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Update Log Task Error',
    );
  }
}

async function checkTaskExist({ taskId }) {
  const result = await taskModel.findOne({ taskId });
  return result != null;
}

module.exports = {
  createLogTask,
  updateLogTask,
};
