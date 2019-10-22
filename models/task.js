const mongoose = require('mongoose');

const {
  TYPE_TASK: { NEW, ENHANCE },
} = require('../constants');

const taskSchema = new mongoose.Schema(
  {
    id: String,
    taskId: String,
    createId: String,
    assignId: String,
    type: {
      type: String,
      enum: [NEW, ENHANCE],
      default: NEW,
    },
    startDate: {
      type: Date,
      default: null,
    },
    dueDate: {
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

module.exports = mongoose.model('task', taskSchema);
