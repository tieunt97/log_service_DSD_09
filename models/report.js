const mongoose = require('mongoose');
const {
  REPORT_STATUS: { TODO, INPROGRESS, DONE },
} = require('../constants');

const reportSchema = new mongoose.Schema(
  {
    id: String,
    reporter: String,
    receiver: String,
    reportId: String,
    status: {
      enum: [TODO, INPROGRESS, DONE],
    },
    type: {
      type: String,
      default: 'PERSON',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('reportModel', reportSchema);
