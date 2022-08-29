const mongoose = require('mongoose');

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an emailll'],
    },
    contactNo: {
      type: String,
      default: null,
    },
    users: {
      type: Array,
      default: [], //
    },
    events: {
      type: Array,
      default: [[], [], []], //
    },
    admin: {
      type: String,
      default: null, //
    },
    desc: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('orgs', orgSchema);
