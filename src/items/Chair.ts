import { ItemType } from "../types/Items";
import Item from "./Item";

export default class Chair extends Item {
  chairId?: string;
  itemDirection?: string;
  occupied?: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.occupied = false;
    this.itemType = ItemType.CHAIR;
  }
}
