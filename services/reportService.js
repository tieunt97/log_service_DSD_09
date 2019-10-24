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

async function getLogReportList({ startTime, endTime, limit, pageNum }) {
  const query = {
    createdAt: {
      $lt: new Date(endTime),
      $gte: new Date(startTime),
    },
  };
  const totalCount = await reportModel.countDocuments(query);
  if (totalCount <= 0)
    return {
      pager: {
        offset: 0,
        limit: 0,
        currentPageNum: 0,
        totalCount: 0,
        hasPrev: false,
        hasNext: false,
        prevPageNum: undefined,
        nextPageNum: undefined,
        lastPageNum: 0,
      },
      data: [],
    };

  const totalPage = Math.ceil(totalCount / limit);
  const currentPageNum = totalPage >= pageNum ? pageNum : 1; // <= totalPage ? pageNum : totalPage;
  const hasPrev = currentPageNum > 1;
  const hasNext = currentPageNum < totalPage;
  const offset = currentPageNum > 0 ? (currentPageNum - 1) * limit : 0;

  const result = await reportModel
    .find(query)
    .limit(limit)
    .skip(offset);
  return {
    pager: {
      offset,
      limit,
      currentPageNum,
      totalCount,
      hasPrev,
      hasNext,
      prevPageNum: hasPrev ? currentPageNum - 1 : undefined,
      nextPageNum: hasNext ? currentPageNum + 1 : undefined,
      lastPageNum: totalPage,
    },
    data: result,
  };
}

module.exports = {
  createLogReport,
  updateLogReport,
  deleteLogReport,
  getLogReportByReportId,
  getLogReportList,
};
