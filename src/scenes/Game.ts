// import Phaser from "phaser";

import { debugDraw } from '../utils/debug';
import { createCharacterAnims } from '../anims/CharacterAnims';

import Item from '../items/Item';
import Chair from '../items/Chair';
import '../characters/MyPlayer';
import '../characters/OtherPlayer';
import MyPlayer from '../characters/MyPlayer';
import OtherPlayer from '../characters/OtherPlayer';
import PlayerSelector from '../characters/PlayerSelector';
import Network from '../services/Network';
import Network2 from '../services/Network2';
import { IPlayer } from '../types/ITownState';
import { PlayerBehavior } from '../types/PlayerBehavior';
import { ItemType } from '../types/Items';
import store from '../stores';
import { setFocused, setShowChat } from '../stores/ChatStore';
import { NavKeys, Keyboard } from '../types/KeyboardState';
import Cookies from 'universal-cookie';
import { AnimatedTile } from 'src/anims/AnimatedTile';

export default class Game extends Phaser.Scene {
  network!: Network;
  networt2!: Network2;
  private cursors!: NavKeys;
  private keyE!: Phaser.Input.Keyboard.Key;
  private keyR!: Phaser.Input.Keyboard.Key;
  private keySpace!: Phaser.Input.Keyboard.Key;
  private map!: Phaser.Tilemaps.Tilemap;
  myPlayer!: MyPlayer;
  private playerSelector!: Phaser.GameObjects.Zone;
  private otherPlayers!: Phaser.Physics.Arcade.Group;
  private otherPlayerMap = new Map<string, OtherPlayer>();
  tableMap = new Map<string, Chair>();
  chairMap = new Map<string, Chair>();
  private animatedTiles: AnimatedTile[] = [];

  constructor() {
    super('game');

  }

  init() {
    this.animatedTiles = [];
  }

  registerKeys() {
    this.cursors = {
      ...this.input.keyboard.createCursorKeys(),
      ...(this.input.keyboard.addKeys('W,S,A,D,Space') as Keyboard),
    };

    // maybe we can have a dedicated method for adding keys if more keys are needed in the future
    this.keyE = this.input.keyboard.addKey('E');
    this.keyR = this.input.keyboard.addKey('R');
    this.keySpace = this.input.keyboard.addKey('Space');
    this.input.keyboard.disableGlobalCapture();
    this.input.keyboard.on('keydown-ENTER', (event) => {
      store.dispatch(setShowChat(true));
      store.dispatch(setFocused(true));
    });
    this.input.keyboard.on('keydown-ESC', (event) => {
      store.dispatch(setShowChat(false));
    });
  }
  disableKeys() {
    this.input.keyboard.enabled = false;
  }

  enableKeys() {
    this.input.keyboard.enabled = true;
  }
  allOtherPlayers() {
    return this.otherPlayerMap;
  }
  setUptable = (
    chairs: Phaser.Physics.Arcade.StaticGroup,
    chairLayer: Phaser.Tilemaps.ObjectLayer,
    lastChairIdx: number,
    lastTableIdx: number,
    talbePerChair: number
  ) => {
    let currentChairIdx = lastChairIdx;
    chairLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(chairs, obj, 'chairs', 'chairs') as Chair;
      const tableId = `${Math.floor(i / talbePerChair) + lastTableIdx}`;
      const chairId = `${currentChairIdx++}`;

      // item.setDepth(item.y + item.height * 0.27);
      item.itemDirection = obj.properties[0].value;
      item.tableId = tableId;
      item.chairId = chairId;
      this.tableMap.set(tableId, item);
      this.chairMap.set(chairId, item);
    });
    lastTableIdx = lastTableIdx + Math.floor((currentChairIdx - lastChairIdx) / talbePerChair);
    lastChairIdx = currentChairIdx;
    return { lastChairIdx, lastTableIdx };
  };

  create(data: { network: Network; network2: Network2 }) {
    if (!data.network) {
      throw new Error('server instance missing');
    } else {
      this.network = data.network;
      this.networt2 = data.network2;
    }

    createCharacterAnims(this.anims);

    this.map = this.make.tilemap({ key: 'tilemap' });

    const logoImage = this.map.addTilesetImage('logo', 'logo');

    const interiorImage = this.map.addTilesetImage('interior', 'interior');

    const campingImage = this.map.addTilesetImage('camping', 'camping');

    const modernExteriorsImage = this.map.addTilesetImage('modernExteriors', 'modernExteriors');

    const ModernExteriorsCompleteImage = this.map.addTilesetImage(
      'ModernExteriorsComplete',
      'ModernExteriorsComplete'
    );
    const villasImage = this.map.addTilesetImage('villas', 'villas');

    const indoorsImage = this.map.addTilesetImage('indoors', 'indoors');

    const vehiclesImage = this.map.addTilesetImage('vehicles', 'vehicles');

    const waterToyImage = this.map.addTilesetImage('waterToy', 'waterToy');

    const tileImage = this.map.addTilesetImage('tiles', 'tiles');
    const waterBridgeImage = this.map.addTilesetImage('waterBridge', 'waterBridge');

    const parasolImage = this.map.addTilesetImage('parasol', 'parasol');

    const parasol2Image = this.map.addTilesetImage('parasol2', 'parasol2');

    // 이하 animated tileset
    const boat1Image = this.map.addTilesetImage('boat1', 'boat1');

    const billboardImage = this.map.addTilesetImage('billboard', 'billboard');

    const campfire2Image = this.map.addTilesetImage('campfire2', 'campfire2');

    const foodCarsImage = this.map.addTilesetImage('foodCars', 'foodCars');

    const pigeonImage = this.map.addTilesetImage('pigeon', 'pigeon');

    const characterInWater = this.map.addTilesetImage('characterInWater', 'characterInWater');

    const clothesImage = this.map.addTilesetImage('clothes', 'clothes');

    const ball1Image = this.map.addTilesetImage('ball1', 'ball1');

    const ball2Image = this.map.addTilesetImage('ball2', 'ball2');

    const fishingBoatImage = this.map.addTilesetImage('fishingBoat', 'fishingBoat');

    const busDoorImage = this.map.addTilesetImage('busDoor', 'busDoor');

    const fishImage = this.map.addTilesetImage('fish', 'fish');

    const fish2Image = this.map.addTilesetImage('fish2', 'fish2');

    const fish3Image = this.map.addTilesetImage('fish3', 'fish3');
    const wormImage = this.map.addTilesetImage('worm', 'worm');
    const birdImage = this.map.addTilesetImage('bird', 'bird');
    const flowersImage = this.map.addTilesetImage('flowers', 'flowers');

    const GroundLayer = this.map.createLayer('ground', [
      modernExteriorsImage,
      waterToyImage,
      tileImage,
      waterBridgeImage,
      ModernExteriorsCompleteImage,
    ]);
    const fencesLayer = this.map.createLayer('fences', interiorImage);

    const logoLayer = this.map.createLayer('logo', logoImage);
    const buildingsLayer = this.map.createLayer('buildings', [
      boat1Image,
      ModernExteriorsCompleteImage,
      clothesImage,
      interiorImage,
      campfire2Image,
      pigeonImage,
      characterInWater,
      fishImage,
      fish2Image,
      fish3Image,
      fishingBoatImage,
      campingImage,
      vehiclesImage,
      foodCarsImage,
      villasImage,
      birdImage,
      pigeonImage,
      ball1Image,
      ball2Image,
      flowersImage,
      wormImage,
      busDoorImage,
      indoorsImage,
    ]);

    const buildingAnimationImages = [
      boat1Image,
      campfire2Image,
      pigeonImage,
      characterInWater,
      fishImage,
      fish2Image,
      fish3Image,
      fishingBoatImage,
      birdImage,
      pigeonImage,
      ball1Image,
      ball2Image,
      wormImage,
      clothesImage,
      busDoorImage,
    ];
    let i = 0;
    buildingAnimationImages.forEach((imageSet) => {
      const tileData = imageSet.tileData as any;
      for (let tileid in tileData) {
        this.map.layers.forEach((layer) => {
          if (layer.tilemapLayer?.type === 'StaticTilemapLayer') return;
          layer.data.forEach((tileRow) => {
            tileRow.forEach((tile) => {
              if (tile.index - imageSet.firstgid === parseInt(tileid, 10)) {
                this.animatedTiles.push(
                  new AnimatedTile(tile, tileData[tileid].animation, imageSet.firstgid)
                );
              }
              i++;
            });
          });
        });
      }
    });
    console.log('animate loop i', i);
    const ForegroundLayer = this.map.createLayer('foreground', [
      villasImage,
      interiorImage,
      billboardImage,
      ModernExteriorsCompleteImage,
      parasol2Image,
      parasolImage,
      campingImage,
      vehiclesImage,
      foodCarsImage,
      modernExteriorsImage,
      clothesImage,
    ]);
    let j = 0;
    const foregroundAnimationImage = [billboardImage];
    foregroundAnimationImage.forEach((imageSet) => {
      const tileData = imageSet.tileData as any;

      for (let tileid in tileData) {
        this.map.layers.forEach((layer) => {
          if (layer.tilemapLayer?.type === 'StaticTilemapLayer') return;
          layer.data.forEach((tileRow) => {
            tileRow.forEach((tile) => {
              if (tile.index - imageSet.firstgid === parseInt(tileid, 10)) {
                this.animatedTiles.push(
                  new AnimatedTile(tile, tileData[tileid].animation, imageSet.firstgid)
                );
              }
              j++;
            });
          });
        });
      }
    });
    console.log('billboardImage', j);

    const secondGroundLayer = this.map.createLayer('secondGround', [
      ModernExteriorsCompleteImage,
      interiorImage,
      campingImage,
    ]);

    const thirdGroundLayer = this.map.createLayer('thirdGround', [
      ModernExteriorsCompleteImage,
      interiorImage,
      campingImage,
    ]);

    const chairs = this.physics.add.staticGroup({ classType: Chair });

    const chairs2Layer = this.map.getObjectLayer('object2');
    const chairs3Layer = this.map.getObjectLayer('object3');
    const chairs4Layer = this.map.getObjectLayer('object4');
    const chairs6Layer = this.map.getObjectLayer('object6');
    let TableSet = {
      lastChairIdx: 0,
      lastTableIdx: 0,
    };
    TableSet = this.setUptable(
      chairs,
      chairs2Layer,
      TableSet.lastChairIdx,
      TableSet.lastTableIdx,
      2
    );
    TableSet = this.setUptable(
      chairs,
      chairs3Layer,
      TableSet.lastChairIdx,
      TableSet.lastTableIdx,
      3
    );
    TableSet = this.setUptable(
      chairs,
      chairs4Layer,
      TableSet.lastChairIdx,
      TableSet.lastTableIdx,
      4
    );
    chairs6Layer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(chairs, obj, 'interior', 'interior') as Chair;
      // item.setDepth(item.y + item.height * 0.27);
      const tableId = `${Math.floor(i / 6) + TableSet.lastTableIdx}`;
      const chairId = `${TableSet.lastChairIdx++}`;
      // 다음에 맵을 제작할 땐 아이템d의 방향을 지정해주는 프로퍼티를 만들어서 지정해주자
      item.itemDirection = obj.properties[0].value;
      // item.itemDirection = 'down';
      item.tableId = tableId;
      item.chairId = chairId;
      this.tableMap.set(item.tableId, item);
      this.chairMap.set(item.chairId, item);
    });

    thirdGroundLayer.setDepth(6500);
    ForegroundLayer.setDepth(6000);

    fencesLayer.setCollisionByProperty({ collisions: true });
    secondGroundLayer.setCollisionByProperty({ collisions: true });

    const cookies = new Cookies();
    const userId = store.getState().user?.userId || cookies.get('userId') || this.network.userId;
    const userProfile = store.getState().user?.userProfile;
    this.myPlayer = this.add.myPlayer(
      Phaser.Math.RND.between(400, 900),
      Phaser.Math.RND.between(400, 900),
      'kevin',
      this.network.mySessionId,
      userId,
      userProfile
      // 로건 케빈 엠마
    );
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16);

    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer });
    this.cameras.main.zoom = 2;
    this.cameras.main.startFollow(this.myPlayer, true);

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], fencesLayer);

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], secondGroundLayer);

    this.physics.add.overlap(
      this.playerSelector,
      [chairs],
      this.handleItemSelectorOverlap,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.playerSelector,
      this.otherPlayers,
      this.handleClosePlayerOverlap,
      undefined,
      this
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
    this.network.onItemUserAdded(this.handleItemUserAdded, this);
    this.network.onItemUserRemoved(this.handleItemUserRemoved, this);
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this);
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item;
    // currentItem is undefined if nothing was perviously selected
    if (currentItem) {
      // if the selection has not changed, do nothing
      if (currentItem === selectionItem || currentItem.depth >= selectionItem.depth) {
        return;
      }
      // if selection changes, clear pervious dialog
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING) currentItem.clearDialogBox();
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
      .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
      .setDepth(actualY * 0.5);
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
        .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
        .setDepth(actualY);
    });
    if (this.myPlayer && collidable)
      this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group);
  }

  // function to add new player to the otherPlayer group
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(
      newPlayer.x,
      newPlayer.y,
      'kevin',
      id,
      newPlayer.userId,
      newPlayer.userProfile,
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
  private handlePlayerUpdated(field: string, value: number | string, id: string) {
    const otherPlayer = this.otherPlayerMap.get(id);
    if (value != undefined) otherPlayer?.updateOtherPlayer(field, value);
  }

  private handlePlayersOverlap(myPlayer, otherPlayer) {
    if (myPlayer.playerBehavior === PlayerBehavior.SITTING) {
      return;
    }

    otherPlayer.makeCall(myPlayer, this.network?.webRTC);
  }
  private handleClosePlayerOverlap(playerSelector, otherPlayer) {
    if (this.myPlayer.playerBehavior === PlayerBehavior.SITTING) {
      return;
    }
    const currentClosePlayer = playerSelector.closePlayer as OtherPlayer;
    // currentItem is undefined if nothing was perviously selected
    if (currentClosePlayer) {
      // if the selection has not changed, do nothing
      if (currentClosePlayer === otherPlayer) {
        return;
      }
      // if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING)
      //   currentClosePlayer.clearDialogBox();
    }
    // set selected item and set up new dialog
    playerSelector.closePlayer = otherPlayer;
    // .onOverlapDialog()
  }

  private handleItemUserAdded(playerId: string, itemId: string, itemType: ItemType) {
    console.log('handleItemUserAdded');

    if (itemType === ItemType.CHAIR) {
      const table = this.tableMap.get(itemId);
      table?.addCurrentUser(playerId);
    }
  }

  private handleItemUserRemoved(playerId: string, itemId: string, itemType: ItemType) {
    if (itemType === ItemType.CHAIR) {
      const table = this.tableMap.get(itemId);
      table?.removeCurrentUser(playerId);
    }
  }

  private handleChatMessageAdded(playerId: string, content: string) {
    const otherPlayer = this.otherPlayerMap.get(playerId);
    otherPlayer?.updateDialogBubble(content);
  }

  update(t: number, dt: number) {
    this.animatedTiles.forEach((tile) => tile.update(dt));

    if (this.myPlayer && this.network) {
      this.playerSelector.update(this.myPlayer, this.cursors);
      this.myPlayer.update(
        this.playerSelector,
        this.cursors,
        this.keyE,
        this.keyR,
        this.keySpace,
        this.network
      );
    }
  }
}
