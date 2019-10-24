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

async function getLogKPIByUserId({
  userId,
  startTime,
  endTime,
  limit = 10,
  pageNum = 1,
}) {
  const query = {
    userId,
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };

  const totalCount = await kpiModel.countDocuments(query);
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

  const result = await kpiModel
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

async function getLogKPIByDepartment({
  departmentId,
  startTime,
  endTime,
  limit = 10,
  pageNum = 1,
}) {
  const query = {
    departmentId,
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };

  const totalCount = await kpiModel.countDocuments(query);
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

  const result = await kpiModel
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

async function getLogKPIByTime({
  startTime,
  endTime,
  limit = 10,
  pageNum = 1,
}) {
  const query = {
    startDate: {
      $lt: new Date(startTime),
      $gte: new Date(endTime),
    },
  };
  const totalCount = await kpiModel.countDocuments(query);
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

  const result = await kpiModel
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
  createLogUser,
  getLogKPIByUserId,
  getLogKPIByDepartment,
  getLogKPIByTime,
};
