import { GuildSettings } from '#lib/database';
import { LanguageKeys } from '#lib/i18n/languageKeys';
import { ModerationCommand } from '#lib/structures';
import type { GuildMessage } from '#lib/types';
import { Moderation } from '#utils/constants';
import { getImage } from '#utils/util';
import { ApplyOptions } from '@sapphire/decorators';
import { ArgumentTypes, isNumber } from '@sapphire/utilities';

@ApplyOptions<ModerationCommand.Options>({
	aliases: ['sb'],
	description: LanguageKeys.Commands.Moderation.SoftBanDescription,
	extendedHelp: LanguageKeys.Commands.Moderation.SoftBanExtended,
	requiredMember: false,
	requiredPermissions: ['BAN_MEMBERS']
})
export default class extends ModerationCommand {
	public async prehandle(...[message]: ArgumentTypes<ModerationCommand['prehandle']>) {
		const [banAdd, banRemove] = await message.guild.readSettings([GuildSettings.Events.BanAdd, GuildSettings.Events.BanRemove]);
		return banAdd || banRemove ? { unlock: message.guild.moderation.createLock() } : null;
	}

	public async handle(...[message, context]: ArgumentTypes<ModerationCommand['handle']>) {
		return message.guild.security.actions.softBan(
			{
				userID: context.target.id,
				moderatorID: message.author.id,
				duration: context.duration,
				reason: context.reason,
				imageURL: getImage(message)
			},
			await this.getDays(message),
			await this.getTargetDM(message, context.target)
		);
	}

	public posthandle(...[, { preHandled }]: ArgumentTypes<ModerationCommand<Moderation.Unlock>['posthandle']>) {
		if (preHandled) preHandled.unlock();
	}

	public async checkModeratable(...[message, t, context]: ArgumentTypes<ModerationCommand['checkModeratable']>) {
		const member = await super.checkModeratable(message, t, context);
		if (member && !member.bannable) throw t(LanguageKeys.Commands.Moderation.BanNotBannable);
		return member;
	}

	private async getDays(message: GuildMessage) {
		const regex = new RegExp(await message.resolveKey(LanguageKeys.Commands.Moderation.ModerationDays), 'i');
		for (const [key, value] of Object.entries(message.flagArgs)) {
			if (regex.test(key)) {
				const parsed = Number(value);
				if (isNumber(parsed) && parsed >= 0 && parsed <= 7) return parsed;
			}
		}
		return 0;
	}
}
