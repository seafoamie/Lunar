/* eslint-disable linebreak-style */
var request = require("request");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const url = "https://nekos.life/api/v2/img/tickle";
  let target;
  try {
    target = message.mentions.users.first() || client.users.get(args[0]) || await client.fetchUser(args[0]);
  // eslint-disable-next-line no-empty
  } catch (e) { }
  const member = message.guild.member(target);
  if (!target || !member) return message.reply("You Really wanna tickle yourself?");
  request({
    url: url,
    json: true
  }, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      const imageurl = body.url;
      return message.channel.send(`${message.author.tag} tickled ${member}`, {files: [imageurl]}); // Print the json response
    }
  });

};
  
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};
  
exports.help = {
  name: "tickle",
  category: "Roleplaying",
  description: "Get their weakness! Tickle fight!",
  usage: "tickle"
};
  
