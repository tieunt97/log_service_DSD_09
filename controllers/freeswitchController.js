const freeswitchService = require('../services/freeswitchService');

async function checkCcrCalls(req, res) {
  const { phoneNumber } = req.query;
  const results = await freeswitchService.checkCcrCalls(phoneNumber);
  return res.send(`res:${results}`);
}

async function status(req, res) {
  const results = await freeswitchService.showCcrDetailCalls();
  return res.send(results);
}

module.exports = {
  checkCcrCalls,
  status,
};
