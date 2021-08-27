import { LockdownManager } from '#lib/structures';
import type { Guild } from 'discord.js';
import { ModerationActions } from './ModerationActions';

/**
 * @version 3.0.0
 */
export class GuildSecurity {
	/**
	 * The {@link Guild} instance which manages this instance
	 */
	public guild: Guild;

	/**
	 * The moderation actions
	 */
	public actions: ModerationActions;

	/**
	 * The lockdowns map
	 */
	public lockdowns = new LockdownManager();

	public constructor(guild: Guild) {
		this.guild = guild;
		this.actions = new ModerationActions(this.guild);
	}
}
