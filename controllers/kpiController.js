const validate = require('../middlewares/validate');
const kpiService = require('../services/kpiService');

async function createByUser(req, res) {
  const {
    id,
    userId,
    departmentId,
    rateCompleted,
    score,
    startTime,
    endTime,
  } = req.body;
  req
    .checkBody('score')
    .not()
    .isEmpty()
    .withMessage('field score is not empty');
  req
    .checkBody('rateCompleted')
    .not()
    .isEmpty()
    .withMessage('field rate_completed is not empty');
  req
    .checkBody('startTime')
    .not()
    .isEmpty()
    .withMessage('field start_time is not empty')
    .isInt()
    .withMessage('field start_time is number')
    .isLength({
      min: 3,
      max: 13,
    })
    .withMessage('field start_time is timestamp')
    .custom(value => req.body.endTime - value >= 0)
    .withMessage('field start_time < end_time');
  req
    .checkBody('endTime')
    .not()
    .isEmpty()
    .withMessage('field end_time is not empty')
    .isInt()
    .withMessage('field end_time is number')
    .isLength({
      min: 3,
      max: 13,
    })
    .withMessage('field end_time is timestamp');
  validate.validateParams(req);

  await kpiService.createLogUser({
    userId,
    departmentId,
    rateCompleted,
    score,
    startTime,
    endTime,
    id,
  });

  return res.send({ status: 1 });
}

async function getByUserId(req, res) {
  const { userId } = req.query;
  let { startTime, endTime } = req.query;
  req
    .checkQuery('userId')
    .not()
    .isEmpty()
    .withMessage('field user_id is not empty');
  if (startTime)
    req
      .checkBody('startTime')
      .not()
      .isEmpty()
      .withMessage('field start_time is not empty')
      .isInt()
      .withMessage('field start_time is number')
      .isLength({
        min: 3,
        max: 13,
      })
      .withMessage('field start_time is timestamp');
  if (endTime)
    req
      .checkBody('endTime')
      .not()
      .isEmpty()
      .withMessage('field end_time is not empty')
      .isInt()
      .withMessage('field end_time is number')
      .isLength({
        min: 3,
        max: 13,
      })
      .withMessage('field end_time is timestamp');
  if (startTime && endTime)
    req
      .checkBody('startTime')
      .custom(value => req.body.endTime - value >= 0)
      .withMessage('field start_time < end_time');
  validate.validateParams(req);
  if (!startTime) startTime = 1;
  if (!endTime) endTime = new Date().valueOf();

  const result = await kpiService.getLogKPIByUserId({
    userId,
    startTime,
    endTime,
  });
  return res.send({ status: 1, result });
}

async function getByDepartment(req, res) {
  const { departmentId } = req.query;
  let { startTime, endTime } = req.query;
  req
    .checkQuery('departmentId')
    .not()
    .isEmpty()
    .withMessage('field department_id is not empty');
  if (startTime)
    req
      .checkQuery('startTime')
      .not()
      .isEmpty()
      .withMessage('field start_time is not empty')
      .isInt()
      .withMessage('field start_time is number')
      .isLength({
        min: 3,
        max: 13,
      })
      .withMessage('field start_time is timestamp');
  if (endTime)
    req
      .checkQuery('endTime')
      .not()
      .isEmpty()
      .withMessage('field end_time is not empty')
      .isInt()
      .withMessage('field end_time is number')
      .isLength({
        min: 3,
        max: 13,
      })
      .withMessage('field end_time is timestamp');
  if (startTime && endTime)
    req
      .checkQuery('startTime')
      .custom(value => req.body.endTime - value >= 0)
      .withMessage('field start_time < end_time');
  validate.validateParams(req);

  if (!startTime) startTime = 1;
  if (!endTime) endTime = new Date().valueOf();

  const result = await kpiService.getLogKPIByDepartment({
    departmentId,
    startTime,
    endTime,
  });
  return res.send({ status: 1, result });
}

async function getByTime(req, res) {
  const { startTime, endTime } = req.query;
  req
    .checkBody('startTime')
    .not()
    .isEmpty()
    .withMessage('field start_time is not empty')
    .isInt()
    .withMessage('field start_time is number')
    .isLength({
      min: 3,
      max: 13,
    })
    .withMessage('field start_time is timestamp')
    .custom(value => req.body.endTime - value >= 0)
    .withMessage('field start_time < end_time');
  req
    .checkBody('endTime')
    .not()
    .isEmpty()
    .withMessage('field end_time is not empty')
    .isInt()
    .withMessage('field end_time is number')
    .isLength({
      min: 3,
      max: 13,
    })
    .withMessage('field end_time is timestamp');
  validate.validateParams(req);
  const result = await kpiService.getLogKPIByTime({
    startTime,
    endTime,
  });
  return res.send({ status: 1, result });
}

module.exports = {
  createByUser,
  getByUserId,
  getByDepartment,
  getByTime,
};
