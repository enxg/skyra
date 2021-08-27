import { Events } from '#lib/types/Enums';
import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import { GatewayDispatchEvents, GatewayGuildMemberRemoveDispatch } from 'discord-api-types/v9';

@ApplyOptions<ListenerOptions>({ event: GatewayDispatchEvents.GuildMemberRemove, emitter: 'ws' })
export class UserListener extends Listener {
	public run(data: GatewayGuildMemberRemoveDispatch['d']) {
		const guild = this.container.client.guilds.cache.get(data.guild_id);
		if (!guild || !guild.available) return;

		const member = guild.members.cache.get(data.user.id) ?? null;
		this.container.client.emit(Events.RawMemberRemove, guild, member, data);
	}
}
