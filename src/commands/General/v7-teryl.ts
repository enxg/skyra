import { LanguageKeys } from '#lib/i18n/languageKeys';
import { SkyraCommand } from '#lib/structures';
import { getColor } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { send } from '@sapphire/plugin-editable-commands';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SkyraCommand.Options>({
	name: '\u200Bv7-teryl',
	aliases: [
		'add-emoji',
		'choice',
		'choise',
		'choose',
		'color',
		'colour',
		'content',
		'create-emoji',
		'currency',
		'def',
		'defination',
		'define',
		'definition',
		'dictionary',
		'emoji',
		'emote',
		'exchange',
		'followage',
		'message-source',
		'money',
		'msg-source',
		'pick',
		'poll',
		'price',
		'saelem',
		'source',
		'spoll',
		'twitch',
		'weather',
		'wiki',
		'wikipedia',
		'youtube',
		'yt'
	],
	description: LanguageKeys.Commands.General.V7Description,
	detailedDescription: LanguageKeys.Commands.General.V7Extended,
	hidden: true,
	requiredClientPermissions: [PermissionFlagsBits.EmbedLinks]
})
export class UserCommand extends SkyraCommand {
	public messageRun(message: Message, args: SkyraCommand.Args) {
		const embed = new MessageEmbed()
			.setColor(getColor(message))
			.setAuthor({
				name: this.container.client.user!.tag,
				iconURL: this.container.client.user!.displayAvatarURL({ size: 128, format: 'png', dynamic: true })
			})
			.setDescription(args.t(LanguageKeys.Commands.General.V7TerylMessage, { command: args.commandContext.commandName }))
			.setTimestamp();
		return send(message, { embeds: [embed] });
	}
}