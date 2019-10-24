const reportModel = require('../models/report');
const statusCode = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

async function createLogReport({
  reporter,
  receiver,
  reportId,
  status,
  type,
  id,
}) {
  const result = await reportModel.create({
    id,
    reporter,
    receiver,
    reportId,
    status,
    type,
  });
  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Create Log Report Error',
    );
  }
}

async function updateLogReport({
  id,
  reporter,
  receiver,
  reportId,
  status,
  type,
}) {
  const result = await reportModel.findByIdAndUpdate(id, {
    reporter,
    receiver,
    reportId,
    status,
    type,
  });

  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Update Log Report Error',
    );
  }
}

async function deleteLogReport(id) {
  const result = await reportModel.findByIdAndDelete(id);
  if (!result) {
    throw new CustomError(
      statusCode.INTERNAL_SERVER_ERROR,
      'Delete Log Report Error',
    );
  }
}

async function getLogReportByReportId(reportId) {
  return reportModel.find({ reportId });
}

async function getLogReportList({ startTime, endTime }) {
  const query = {
    createdAt: {
      $lt: new Date(endTime),
      $gte: new Date(startTime),
    },
  };
  const result = await reportModel.find(query);
  return result;
}

module.exports = {
  createLogReport,
  updateLogReport,
  deleteLogReport,
  getLogReportByReportId,
  getLogReportList,
};
