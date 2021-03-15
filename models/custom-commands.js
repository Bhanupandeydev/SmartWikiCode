const mongo = require('mongoose');

module.exports = mongo.model('custom-commands', new mongo.Schema({
  Guild: String,
  Command: String,
  Response: String
}))