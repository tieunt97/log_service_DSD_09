// Dùng để kiểm tra đầu vào các request
const statusCodes = require('../errors/statusCode');
const CustomError = require('../errors/CustomError');

function validateParams(req) {
  const errors = req.validationErrors();
  if (errors) {
    const messages = errors.map(error => error.msg);
    throw new CustomError(statusCodes.BAD_REQUEST, messages[0]);
  }
}

function isPhoneNumber(str) {
  const regex = /^(\+?)(?:[-0-9] ?){6,15}[0-9]$/;
  return regex.test(str);
}

function isUrl(str) {
  const urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  const url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

function isDateFormat(str) {
  // eslint-disable-next-line no-useless-escape
  const dateRegex = /^((((19|[2-9]\d)\d{2})\-(0[13578]|1[02])\-(0[1-9]|[12]\d|3[01]))|(((19|[2-9]\d)\d{2})\-(0[13456789]|1[012])\-(0[1-9]|[12]\d|30))|(((19|[2-9]\d)\d{2})\-02\-(0[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\-02\-29))$/g;
  return dateRegex.test(str);
}

module.exports = {
  validateParams,
  isPhoneNumber,
  isUrl,
  isDateFormat,
};
