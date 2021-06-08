const client = require("../index")
client.on("guildMemberAdd", async member => {
  client.joins.ensure(member.guild.id, {
    "monday": 0,
    "tuesday": 0,
    "wednesday": 0,
    "thursday": 0,
    "friday": 0,
    "saturday": 0,
    "sunday": 0,
  })

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayName = days[new Date().getDay()].toLowerCase()

  client.joins.inc(member.guild.id, dayName)
})