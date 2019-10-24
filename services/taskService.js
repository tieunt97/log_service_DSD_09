const taskModel = require('../models/task');
const { USER_TASK_QUERY } = require('../constants');
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

async function deleteLogTask(taskId) {
  if (!(await checkTaskExist({ taskId }))) {
    throw new CustomError(statusCode.BAD_REQUEST, 'task not exist');
  }

  const result = await taskModel.remove({ taskId });

  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Delete Log Task Error',
    );
  }
}

async function getLogTaskById(taskId) {
  const result = await taskModel.findOne({ taskId });

  return result;
}

async function getLogTaskByProject({
  projectId,
  startDate,
  endDate,
  limit,
  page,
}) {
  page = page || 1;
  limit = limit || 10;

  const queryOpts = { 'project.id': projectId };

  if (startDate) {
    queryOpts.startDate = { $gte: new Date(startDate) };
  }
  if (endDate) {
    queryOpts.endDate = { $lte: new Date(endDate) };
  }

  const results = await taskModel
    .find(queryOpts)
    .skip((page - 1) * limit)
    .limit(+limit);

  if (!results) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Get Log Task By Project Error',
    );
  }

  return results;
}

async function getLogTaskByUser({
  userId,
  type,
  startDate,
  endDate,
  limit,
  page,
}) {
  type = type || USER_TASK_QUERY.ALL;
  page = page || 1;
  limit = limit || 10;

  const queryOpts = {};

  if (type === USER_TASK_QUERY.ALL) {
    queryOpts.$or = [{ 'creator.id': userId }, { 'assignee.id': userId }];
  } else if (type === USER_TASK_QUERY.CREATOR) {
    queryOpts['creator.id'] = userId;
  } else {
    queryOpts['assignee.id'] = userId;
  }
  if (startDate) {
    queryOpts.startDate = { $gte: new Date(startDate) };
  }
  if (endDate) {
    queryOpts.endDate = { $lte: new Date(endDate) };
  }

  const results = await taskModel
    .find(queryOpts)
    .skip((page - 1) * limit)
    .limit(+limit);

  if (!results) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Get Log Task By User Error',
    );
  }

  return results;
}

async function checkTaskExist({ taskId }) {
  const result = await taskModel.findOne({ taskId });
  return result != null;
}

module.exports = {
  createLogTask,
  updateLogTask,
  deleteLogTask,
  getLogTaskById,
  getLogTaskByProject,
  getLogTaskByUser,
};
