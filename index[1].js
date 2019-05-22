const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const client = new Discord.Client();
const member = new Discord.Client();
const cmd = new Discord.Client();
const prefix = require("./botconfig.json")
const message = new Discord.Client();
const tokenfile = require("./token.json");
const token = require("./token.json");
const bot = new Discord.Client({disableEveryone: true});
const chat = new Discord.Client();
const send = new Discord.Client();
const fs = require('fs');
const ms = require("ms");
let purple = "#d604cf";
const createdAt = new Discord.Client();
const version = "V.1"
const footer = "Hopza By BillyHorler#8736"

//= Set
//== Soft Compare
//=== Hard Compare
//let x = 1
//sets variable x to 1


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`)

  bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('purple')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | You are member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(footer)
        .setTimestamp()

        channel.send(embed);
});



  bot.user.setActivity("Hopza V1 !help");



});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //Ticket System
		if (cmd === `${prefix}new`){
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!reason) return message.channel.send("You must specify a reason for opening your ticket. Correct usage !new {reason}")
        if (!message.guild.roles.exists("name", "Staff")) return message.channel.send(`This server doesn't have a \`Deluxie Staff\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            let ticket_Created = new Discord.RichEmbed()
            .setFooter(footer)
            .setColor(blue)
            .setTitle("** :white_check_mark: Ticket Created**")
            .addField("Discuss your issue that needs solving in the ticket." , "Ticket Name: #" + c.name )
            .addField("Once you are happy that your problem has been solved type" , "!close in your ticket channel" + c.name)
            message.channel.send(ticket_Created);
            
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setTitle("Hopza - Ticket System")
                .addField("Reason", reason)
                .addField(`New Ticket`, `You've created a new ticket request to receive assistance from a member of our team. Please note that it can often take time for our team to give you a full and comprehensive resolution to your issue.`)
                .addField("Contact Us", "If you would like to contact a member of our senior team directly, we ask that you email us directly at 'coming soon'.")
                .setFooter(footer)
            c.send("[" + role + "] A new ticket has been opened by " + message.author)
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console
		}
		    // Close ticket command
if (cmd === `${prefix}close`) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        // Confirm delete - with timeout (Not command)
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`/confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '/confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
		if (cmd === `${prefix}apply`){
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!reason) return message.channel.send("You must specify a reason for opening your ticket. Correct usage !new {reason}")
        if (!message.guild.roles.exists("name", "Staff")) return message.channel.send(`This server doesn't have a \`Deluxie Staff\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            let ticket_Created = new Discord.RichEmbed()
            .setFooter(footer)
            .setColor(blue)
            .setTitle("** :white_check_mark: Ticket Created**")
            .addField("Staff will ask you some questions about your application." , "Ticket Name: #" + c.name )
            .addField("Once you are happy that your problem has been solved type" , "!close in your ticket channel" + c.name)
            message.channel.send(ticket_Created);
            
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setTitle("Hopza - Ticket System")
                .addField("Reason", reason)
                .addField(`New Ticket`, `You've created a new ticket request to receive assistance from a member of our team. Please note that it can often take time for our team to give you a full and comprehensive resolution to your issue.`)
                .addField("Contact Us", "If you would like to contact a member of our senior team directly, we ask that you email us directly at 'coming soon'.")
                .setFooter(footer)
            c.send("[" + role + "] A new ticket has been opened by " + message.author)
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console
		}
		   if (cmd === `${prefix}admin`){
	let adminCommand = args[0]
	//Ban Command
	if (adminCommand === "ban"){
	    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)
    .setFooter(footer);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;	
	}
	//END OF Ban
	//Start of kick
	if (adminCommand === "kick"){
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
    if(!kUser) return message.channel.send("Can't find user!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .setFooter(footer);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
	}
	//end of kick
	if (adminCommand === "addrole"){
	 if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You do not have permissions.")
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
    if (!rMember) return message.reply("Please provide a user name")
    let role = args[2]

    if (!role) return message.reply("Please provide a role name.");
    let aRole = message.guild.roles.find(`name`, role);
    if (!aRole) return message.reply(`I can't find the role.`);

    if (rMember.roles.has(aRole.id)) return message.reply("The user already have this role!");
    await (rMember.addRole(aRole.id))
	message.reply("I have successfully added the role: " + role)
	}
   }

 

 

});

bot.login(token.token);
