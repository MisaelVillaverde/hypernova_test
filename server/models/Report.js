const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  // imgUrl: {
  //   type: String,
  // },
});

const InfoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  supervisor: {
    type: String,
    required: true,
  },
  table: {
    type: [TableSchema],
    required: true,
  },
});

const ReportSchema = mongoose.Schema({
  concept: {
    type: String,
    required: true,
  },
  dateFrom: {
    type: Date,
    required: true,
  },
  dateTo: {
    type: Date,
    required: true,
  },
  info: {
    type: InfoSchema,
    required: true,
  },
  approvedBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Reports', ReportSchema);
