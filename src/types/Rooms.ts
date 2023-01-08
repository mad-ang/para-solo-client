export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'skyoffice',
  CUSTOM = 'custom',
  DM = 'dm',
}

export interface IRoomData {
  name: string
  description: string
  password: string | null
  autoDispose: boolean
}
