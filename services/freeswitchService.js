const os = require('os');
const axios = require('axios');

const freeswitch = require('../utils/freeswitch');

const { matchIp } = require('../utils/regex');
const { logger } = require('../utils/logger');

const { UPDATE_INTERVAL, GATEWAY_DOMAIN } = process.env;

async function checkCcrCalls(phoneNumber) {
  let command = `show channels count`;
  if (phoneNumber) command = `show channels count like ${phoneNumber}`;
  const result = await freeswitch.command(command);
  return parseInt(result.trim().replace(/\D/g, ''), 10);
}

async function showCcrDetailCalls() {
  const command = `show channels as json`;
  const response = await freeswitch.command(command);
  const { row_count: total, rows } = JSON.parse(response);
  let mapping;
  if (total !== 0) {
    mapping = {};
    for (const row of rows) {
      const { name, cid_num: caller } = row;
      const ip = matchIp(name);
      if (mapping[ip] === undefined) {
        mapping[ip] = {};
      }
      if (mapping[ip][caller] === undefined) mapping[ip][caller] = 1;
      else mapping[ip][caller].count += 1;
    }
  }
  return {
    total,
    osInfos: {
      // eslint-disable-next-line no-undef
      cpu: GLOBAL_CPUS,
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
    },
    calls: mapping,
  };
}

async function initUpdateIntervalFreeswitchStatus() {
  setInterval(async () => {
    try {
      const options = {
        method: 'POST',
        url: `${GATEWAY_DOMAIN}/api/`,
        data: showCcrDetailCalls(),
      };
      logger.info(options.url);
      const { status: statusCode, data } = await axios(options);
      if (statusCode !== 200) throw new Error(`statusCode: ${statusCode}`);
      logger.info(JSON.stringify(data));
    } catch (error) {
      logger.error(error.message);
    }
  }, UPDATE_INTERVAL);
}

module.exports = {
  checkCcrCalls,
  showCcrDetailCalls,
  initUpdateIntervalFreeswitchStatus,
};
