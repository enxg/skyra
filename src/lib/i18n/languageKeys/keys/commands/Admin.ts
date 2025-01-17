import type { LanguageHelpDisplayOptions } from '#lib/i18n/LanguageHelp';
import { FT, T } from '#lib/types';

export const ConfGet = FT<{ key: string; value: string }, string>('commands/admin:confGet');
export const ConfGetNoExt = FT<{ key: string }, string>('commands/admin:confGetNoExt');
export const ConfGuarded = FT<{ name: string }, string>('commands/admin:confGuarded');
export const ConfMenuInvalidAction = T<string>('commands/admin:confMenuInvalidAction');
export const ConfMenuInvalidKey = T<string>('commands/admin:confMenuInvalidKey');
export const ConfMenuRenderAtFolder = FT<{ path: string }, string>('commands/admin:confMenuRenderAtFolder');
export const ConfMenuRenderAtPiece = FT<{ path: string }, string>('commands/admin:confMenuRenderAtPiece');
export const ConfMenuRenderBack = T<string>('commands/admin:confMenuRenderBack');
export const ConfMenuRenderCvalue = FT<{ value: string }, string>('commands/admin:confMenuRenderCvalue');
export const ConfMenuRenderNokeys = T<string>('commands/admin:confMenuRenderNokeys');
export const ConfMenuRenderRemove = T<string>('commands/admin:confMenuRenderRemove');
export const ConfMenuRenderReset = T<string>('commands/admin:confMenuRenderReset');
export const ConfMenuRenderSelect = T<string>('commands/admin:confMenuRenderSelect');
export const ConfMenuRenderUndo = T<string>('commands/admin:confMenuRenderUndo');
export const ConfMenuRenderUpdate = T<string>('commands/admin:confMenuRenderUpdate');
export const ConfMenuSaved = T<string>('commands/admin:confMenuSaved');
export const ConfNochange = FT<{ key: string }, string>('commands/admin:confNochange');
export const ConfReset = FT<{ key: string; value: string }, string>('commands/admin:confReset');
export const Conf = FT<{ key: string; list: string }, string>('commands/admin:confServer');
export const ConfDescription = T<string>('commands/admin:confServerDescription');
export const ConfExtended = T<LanguageHelpDisplayOptions>('commands/admin:confServerExtended');
export const ConfSettingNotSet = T<string>('commands/admin:confSettingNotSet');
export const ConfUpdated = FT<{ key: string; response: string }, string>('commands/admin:confUpdated');
export const ConfDashboardOnlyKey = FT<{ key: string }, string>('commands/admin:confDashboardOnlyKey');
export const RoleSetAdded = FT<{ name: string; roles: string[] }, string>('commands/admin:rolesetAdded');
export const RoleSetCreated = FT<{ name: string; roles: string[] }, string>('commands/admin:rolesetCreated');
export const RoleSetDescription = T<string>('commands/admin:rolesetDescription');
export const RoleSetExtended = T<LanguageHelpDisplayOptions>('commands/admin:rolesetExtended');
export const RoleSetNoRoleSets = T<string>('commands/admin:rolesetNoRolesets');
export const RoleSetRemoved = FT<{ name: string; roles: string[] }, string>('commands/admin:rolesetRemoved');
export const RoleSetResetAll = T<string>('commands/admin:rolesetResetAll');
export const RoleSetResetEmpty = T<string>('commands/admin:rolesetResetEmpty');
export const RoleSetResetGroup = FT<{ name: string }, string>('commands/admin:rolesetResetGroup');
export const RoleSetResetNotExists = FT<{ name: string }, string>('commands/admin:rolesetResetNotExists');
export const RoleSetUpdated = FT<{ name: string }, string>('commands/admin:rolesetUpdated');
