export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'parasolo',
  CUSTOM = 'custom',
  DM = 'dm',
}

export interface IRoomData {
  name: string;
  description: string;
  password: string | null;
  autoDispose: boolean;
}
