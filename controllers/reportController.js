const validate = require('../middlewares/validate');
const reportService = require('../services/reportService');
const { REPORT_STATUS } = require('../constants');

async function create(req, res) {
  const { reporter, receiver, reportId, status, type } = req.body;
  req
    .checkBody('reporter')
    .not()
    .isEmpty()
    .withMessage('field reporter is not empty');
  req
    .checkBody('receiver')
    .not()
    .isEmpty()
    .withMessage('field receiver is not empty');
  req
    .checkBody('reportId')
    .not()
    .isEmpty()
    .withMessage('field report_id is not empty');
  req
    .checkBody('status')
    .not()
    .isEmpty()
    .withMessage('field status is not empty')
    .custom(value => REPORT_STATUS[value])
    .withMessage('field status is invalid');

  validate.validateParams(req);

  await reportService.createLogReport({
    reporter,
    receiver,
    reportId,
    status,
    type,
  });
  return res.send({ status: 1 });
}

async function update(req, res) {
  const { id } = req.params;
  const { reportId, reporter, receiver, status, type } = req.body;
  req
    .checkParams('id')
    .not()
    .isEmpty()
    .withMessage('field id is not empty');
  validate.validateParams(req);
  await reportService.updateLogReport({
    id,
    reportId,
    reporter,
    receiver,
    status,
    type,
  });
  return res.send({ status: 1 });
}

async function remove(req, res) {
  const { id } = req.params;
  req
    .checkParams('id')
    .not()
    .isEmpty()
    .withMessage('field id is not empty');
  validate.validateParams(req);
  await reportService.deleteLogReport(id);
  return res.send({ status: 1 });
}

async function gets(req, res) {
  let { startTime, endTime } = req.query;
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

  const result = await reportService.getLogReportList({ startTime, endTime });
  return res.send({ status: 1, result });
}

async function getById(req, res) {
  const { reportId } = req.params;
  req
    .checkParams('reportId')
    .not()
    .isEmpty()
    .withMessage('field reportId is not empty');
  validate.validateParams(req);

  const result = await reportService.getLogReportByReportId(reportId);
  return res.send({ status: 1, result });
}

module.exports = {
  create,
  update,
  remove,
  gets,
  getById,
};
