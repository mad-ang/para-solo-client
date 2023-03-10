import { Schema, ArraySchema, SetSchema, MapSchema } from '@colyseus/schema';
import { IUserProfile } from 'src/api/chat';

export interface IPlayer extends Schema {
  name: string; // 일단 유지
  x: number;
  y: number;
  anim: string;
  readyToConnect: boolean;
  videoConnected: boolean;
  userId: string; // 일단 유지
  userProfile: IUserProfile;
}
export interface IChair extends Schema {
  occupied: boolean;
  clientId: string;
}
export interface ITable extends Schema {
  connectedUser: SetSchema<string>;
  containedChairs: MapSchema<IChair>;
}
export interface IChatMessage extends Schema {
  author: string;
  createdAt: number;
  content: string;
}

export interface ITownState extends Schema {
  players: MapSchema<IPlayer>;
  chatMessages: ArraySchema<IChatMessage>;
  tables: MapSchema<ITable>;
  chairs: MapSchema<IChair>;
}
