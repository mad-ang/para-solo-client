import Phaser from "phaser";
import MyPlayer from "./MyPlayer";
import { PlayerBehavior } from "../types/PlayerBehavior";
import Item from "../items/Item";
import OtherPlayer from "./OtherPlayer";
import { NavKeys } from "../types/KeyboardState";
export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item;
  closePlayer?: OtherPlayer;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);

    scene.physics.add.existing(this);
  }

  update(player: MyPlayer, cursors: NavKeys) {
    if (!cursors) {
      return;
    }

    // no need to update player selection while sitting
    if (player.playerBehavior === PlayerBehavior.SITTING) {
      return;
    }

    // update player selection box position so that it's always in front of the player
    const { x, y } = player;
    if (cursors.left?.isDown || cursors.A?.isDown) {
      this.setPosition(x - 4, y);
    } else if (cursors.right?.isDown || cursors.D?.isDown) {
      this.setPosition(x + 4, y);
    } else if (cursors.up?.isDown || cursors.W?.isDown) {
      this.setPosition(x, y - 4);
    } else if (cursors.down?.isDown || cursors.S?.isDown) {
      this.setPosition(x, y + 4);
    }

    // while currently selecting an item,
    // if the selector and selection item stop overlapping, clear the dialog box and selected item
    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox();
        this.selectedItem = undefined;
      }
    }
    if (this.closePlayer) {
      if (!this.scene.physics.overlap(this, this.closePlayer)) {
        this.closePlayer = undefined;
      }
    }
  }
}
