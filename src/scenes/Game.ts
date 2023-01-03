// import Phaser from "phaser";

// import { debugDraw } from '../utils/debug'
import { createCharacterAnims } from "../anims/CharacterAnims";

import Item from "../items/Item";
import "../characters/MyPlayer";
import "../characters/OtherPlayer";
import MyPlayer from "../characters/MyPlayer";
import OtherPlayer from "../characters/OtherPlayer";
import PlayerSelector from "../characters/PlayerSelector";
import Network from "../services/Network";
import { IPlayer } from "../types/IOfficeState";
import { PlayerBehavior } from "../types/PlayerBehavior";
import { ItemType } from "../types/Items";

import store from "../stores";
import { setFocused, setShowChat } from "../stores/ChatStore";
import { NavKeys, Keyboard } from "../types/KeyboardState";
import { Grass } from "@mui/icons-material";

export default class Game extends Phaser.Scene {
  network!: Network;
  private cursors!: NavKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  myPlayer!: MyPlayer;
  private playerSelector!: Phaser.GameObjects.Zone;
  private otherPlayers!: Phaser.Physics.Arcade.Group;
  private otherPlayerMap = new Map<string, OtherPlayer>();

  constructor() {
    super("game");
  }

  registerKeys() {
    this.cursors = {
      ...this.input.keyboard.createCursorKeys(),
      ...(this.input.keyboard.addKeys("W,S,A,D") as Keyboard),
    };

    // maybe we can have a dedicated method for adding keys if more keys are needed in the future
    this.keyE = this.input.keyboard.addKey("E");
    this.keyR = this.input.keyboard.addKey("R");
    this.input.keyboard.disableGlobalCapture();
    this.input.keyboard.on("keydown-ENTER", (event) => {
      store.dispatch(setShowChat(true));
      store.dispatch(setFocused(true));
    });
    this.input.keyboard.on("keydown-ESC", (event) => {
      store.dispatch(setShowChat(false));
    });
  }

  disableKeys() {
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    this.input.keyboard.enabled = true;
  }

  create(data: { network: Network }) {
    if (!data.network) {
      throw new Error("server instance missing");
    } else {
      this.network = data.network;
    }

    createCharacterAnims(this.anims);

    this.map = this.make.tilemap({ key: "tilemap" });

    const TileImage = this.map.addTilesetImage("tiles", "tiles");

    const BuildingImage = this.map.addTilesetImage("buildings", "buildings");

    const InteriorImage = this.map.addTilesetImage("interior", "interior");

    // debugDraw(groundLayer, this)
    const GrassLayer = this.map.createLayer("grass", TileImage);

    const BuildingLayer = this.map.createLayer("buildings", BuildingImage);

    const BenchLayer = this.map.createLayer("bench", InteriorImage);

    const SwingLayer = this.map.createLayer("swing", TileImage);

    const ForeGround = this.map.createLayer("foreground", [
      TileImage,
      BuildingImage,
    ]);

    ForeGround.setDepth(6000);

    GrassLayer.setCollisionByProperty({ collisions: true });
    BuildingLayer.setCollisionByProperty({ collisions: true });
    BenchLayer.setCollisionByProperty({ collisions: true });
    SwingLayer.setCollisionByProperty({ collisions: true });

    this.myPlayer = this.add.myPlayer(
      705,
      500,
      "adam",
      this.network.mySessionId
    );
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16);

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer });

    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      GrassLayer
    );

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      BuildingLayer
    );

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      BenchLayer
    );

    this.physics.add.collider(
      [this.myPlayer, this.myPlayer.playerContainer],
      SwingLayer
    );

    this.physics.add.overlap(
      this.myPlayer,
      this.otherPlayers,
      this.handlePlayersOverlap,
      undefined,
      this
    );

    // register network event listeners
    this.network.onPlayerJoined(this.handlePlayerJoined, this);
    this.network.onPlayerLeft(this.handlePlayerLeft, this);
    this.network.onMyPlayerReady(this.handleMyPlayerReady, this);
    this.network.onMyPlayerVideoConnected(this.handleMyVideoConnected, this);
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this);
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this);
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item;
    // currentItem is undefined if nothing was perviously selected
    if (currentItem) {
      // if the selection has not changed, do nothing
      if (
        currentItem === selectionItem ||
        currentItem.depth >= selectionItem.depth
      ) {
        return;
      }
      // if selection changes, clear pervious dialog
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING)
        currentItem.clearDialogBox();
    }

    // set selected item and set up new dialog
    playerSelector.selectedItem = selectionItem;
    selectionItem.onOverlapDialog();
  }

  private addObjectFromTiled(
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
    const obj = group
      .get(
        actualX,
        actualY,
        key,
        object.gid! - this.map.getTileset(tilesetName).firstgid
      )
      .setDepth(actualY);
    return obj;
  }

  private addGroupFromTiled(
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    const group = this.physics.add.staticGroup();
    const objectLayer = this.map.getObjectLayer(objectLayerName);
    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5;
      const actualY = object.y! - object.height! * 0.5;
      group
        .get(
          actualX,
          actualY,
          key,
          object.gid! - this.map.getTileset(tilesetName).firstgid
        )
        .setDepth(actualY);
    });
    if (this.myPlayer && collidable)
      this.physics.add.collider(
        [this.myPlayer, this.myPlayer.playerContainer],
        group
      );
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(
      newPlayer.x,
      newPlayer.y,
      "adam",
      id,
      newPlayer.name
    );
    this.otherPlayers.add(otherPlayer);
    this.otherPlayerMap.set(id, otherPlayer);
  }

  // function to remove the player who left from the otherPlayer group
  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id);
      if (!otherPlayer) return;
      this.otherPlayers.remove(otherPlayer, true, true);
      this.otherPlayerMap.delete(id);
    }
  }

  private handleMyPlayerReady() {
    this.myPlayer.readyToConnect = true;
  }

  private handleMyVideoConnected() {
    this.myPlayer.videoConnected = true;
  }

  // function to update target position upon receiving player updates
  private handlePlayerUpdated(
    field: string,
    value: number | string,
    id: string
  ) {
    const otherPlayer = this.otherPlayerMap.get(id);
    otherPlayer?.updateOtherPlayer(field, value);
  }

  private handlePlayersOverlap(myPlayer, otherPlayer) {
    otherPlayer.makeCall(myPlayer, this.network?.webRTC);
  }

  private handleChatMessageAdded(playerId: string, content: string) {
    const otherPlayer = this.otherPlayerMap.get(playerId);
    otherPlayer?.updateDialogBubble(content);
  }

  update(t: number, dt: number) {
    if (this.myPlayer && this.network) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR,
        this.network
      );
    }
  }
}
