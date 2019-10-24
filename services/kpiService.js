const kpiModel = require('../models/kpi');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function createLogUser({
  id,
  userId,
  departmentId,
  rateCompleted,
  score,
  startTime,
  endTime,
}) {
  const result = await kpiModel.create({
    id,
    userId,
    departmentId,
    rateCompleted,
    score,
    startTime,
    endTime,
  });
  if (!result) {
    throw CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Create Log KPI User Error',
    );
  }
}

async function getLogKPIByUserId({ userId, startTime, endTime }) {
  const query = {
    userId,
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };
  const result = await kpiModel.find(query);
  return result;
}

async function getLogKPIByDepartment({ departmentId, startTime, endTime }) {
  const query = {
    departmentId,
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };
  const result = await kpiModel.find(query);
  return result;
}

async function getLogKPIByTime({ startTime, endTime }) {
  const query = {
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };
  const result = await kpiModel.find(query);
  return result;
}

module.exports = {
  createLogUser,
  getLogKPIByUserId,
  getLogKPIByDepartment,
  getLogKPIByTime,
};
