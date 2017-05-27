function progress(prog) {
  let l = 0;
  if (prog.act1) l++;
  if (prog.act2) l++;
  if (prog.act3) l++;
  if (prog.act4) l++;
  if (prog.act5) l++;
  return l;
}

exports.run = async (client, msg, [server, user]) => {
  const { blizzard } = client.constants.getConfig.tokens;

  const url = `https://${server}.api.battle.net/d3/profile/${encodeURIComponent(user.replace(/#/gi, "-"))}/?locale=en_US&apikey=${blizzard}`;
  try {
    msg.channel.startTyping();
    const { data } = await client.fetch.JSON(url);
    if (data.code === "NOTFOUND") throw new Error(client.constants.httpResponses(404));
    const embed = new client.methods.Embed()
      .setTitle(`**Diablo 3 Stats:** *${data.battleTag}*`)
      .setColor(0xEF8400)
      .setDescription(client.indents`
        Paragon level: **${data.paragonLevel}**
        Killed: ${data.kills.monsters ? `**${data.kills.monsters}** monsters${data.kills.elites ? ` and **${data.kills.elites}** elites.` : "."}` : "zero."}${data.fallenHeroes === undefined ? `\n${data.fallenHeroes.join(", ")}` : ""}
        Progression: Act **${progress(data.progression)}**.
        \u200B
        `)
      .setFooter("📊 Statistics")
      .setThumbnail("https://upload.wikimedia.org/wikipedia/en/8/80/Diablo_III_cover.png")
      .setTimestamp();
    for (let i = 0; i < 4; i++) {
      if (data.heroes[i]) {
        embed.addField(`❯ ${data.heroes[i].name} ${data.heroes[i].gender ? "♀" : "♂"}`, client.indents`
        \u200B  Class: **${data.heroes[i].class}**
        \u200B  Level: **${data.heroes[i].level}**
        \u200B  Elite kills: **${data.heroes[i].kills.elites}**
        \u200B  ${data.heroes[i].hardcore ? `Hardcore${data.heroes[i].dead ? ", dead." : "."}` : ""}
        `, true);
      }
    }
    await msg.sendEmbed(embed);
  } catch (e) {
    msg.error(e);
  } finally {
    msg.channel.stopTyping(true);
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["diablo3"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  spam: false,
  mode: 1,
  cooldown: 30,
};

exports.help = {
  name: "d3",
  description: "Check your stats on Diablo3.",
  usage: "<us|eu|kr|tw> <username:string>",
  usageDelim: " ",
  extendedHelp: [
    "Warriors! Do you want to check your stats on Diablo 3?",
    "",
    "Usage:",
    "&d3 <server> <username>",
    "",
    " ❯ Server: choose between us, eu, kr or tw.",
    " ❯ Username: write your username.",
    "",
    "Examples:",
    "&d3 eu kyra",
    "❯❯ I show you a lot of stuff from your account. (The example is random)",
  ].join("\n"),
};
