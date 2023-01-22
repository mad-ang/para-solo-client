export enum RoomType {
  LOBBY = 'lobby',
  PUBLIC = 'parasolo',
}

export interface IRoomData {
  name: string;
  description: string;
  password: string | null;
  autoDispose: boolean;
}
