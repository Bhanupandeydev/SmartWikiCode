const { model, Schema } = require("mongoose");

module.exports = model(
  "automeme",
  new Schema({
    guild: String,
    enabled: Boolean,
    channelID: String,
  })
);