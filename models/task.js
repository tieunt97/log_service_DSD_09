const mongoose = require('mongoose');

const {
  TYPE_TASK: { NEW, ENHANCE },
} = require('../constants');

const taskSchema = new mongoose.Schema(
  {
    id: String,
    project: {
      id: String,
      name: String,
    },
    taskId: String,
    taskName: String,
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
    type: {
      type: String,
      enum: [NEW, ENHANCE],
      default: NEW,
    },
    creator: {
      id: String,
      name: String,
    },
    assignee: {
      id: String,
      name: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('task', taskSchema);
