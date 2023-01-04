import { Schema, ArraySchema, SetSchema, MapSchema } from '@colyseus/schema'

export interface IPlayer extends Schema {
  name: string
  x: number
  y: number
  anim: string
  readyToConnect: boolean
  videoConnected: boolean
}
export interface ITable extends Schema {
  connectedUser: SetSchema<string>
}
export interface IChatMessage extends Schema {
  author: string
  createdAt: number
  content: string
}

export interface ITownState extends Schema {
  players: MapSchema<IPlayer>
  chatMessages: ArraySchema<IChatMessage>
  tables: MapSchema<ITable>
}
