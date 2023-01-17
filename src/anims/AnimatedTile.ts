export type TilesetTileData = { [key: number]: { animation?: TileAnimationData } };

export type TileAnimationData = Array<{ duration: number; tileid: number }>;

export class AnimatedTile {
  private tile: Phaser.Tilemaps.Tile;
  private tileAnimationData: TileAnimationData;
  private firstgid: number;
  private elapsedTime: number;
  private animationDuration: number;

  constructor(tile: Phaser.Tilemaps.Tile, tileAnimationData: TileAnimationData, firstgid: number) {
    this.tile = tile;
    this.tileAnimationData = tileAnimationData;
    this.firstgid = firstgid;
    this.elapsedTime = 0;
    this.animationDuration = tileAnimationData[0].duration * tileAnimationData.length;
  }

  public update(delta: number): void {
    this.elapsedTime += delta;
    this.elapsedTime %= this.animationDuration;

    const animatonFrameIndex = Math.floor(this.elapsedTime / this.tileAnimationData[0].duration);

    this.tile.index = this.tileAnimationData[animatonFrameIndex].tileid + this.firstgid;
  }
}
