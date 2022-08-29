const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },

    users: {
      type: Array,
      default: [], //
    },
    org: {
      type: String,
      default: '', //
    },
    desc: {
      type: String,
      default: '',
    },
    startTime: {
      type: String,
      default: null,
    },
    endTime: {
      type: String,
      default: null,
    },
    dateStart: {
      type: Date,
      default: null,
    },
    dateEnd: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('events', eventSchema);
