const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema(
  {
    id: String,
    userId: String,
    departmentId: String,
    rateCompleted: Number,
    score: Number,
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('kpiModel', kpiSchema);
