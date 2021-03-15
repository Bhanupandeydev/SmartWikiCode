const { sendErrorLog } = require("../utils/functions");

module.exports = (client) => {
  name: "error",
(_client, error) => {
    sendErrorLog(_client, error, "error")
   }}