import Phaser from 'phaser';
import PlayerSelector from './PlayerSelector';
import { PlayerBehavior } from '../types/PlayerBehavior';
import { sittingShiftData } from './Player';
import Player from './Player';
import Network from '../services/Network';
import { phaserEvents, Event } from '../events/EventCenter';
import store from '../stores';
import { pushPlayerJoinedMessage } from '../stores/ChatStore';
import { ItemType } from '../types/Items';
import { NavKeys } from '../types/KeyboardState';
import Chair from '../items/Chair';
import OtherPlayer from './OtherPlayer';
import phaserGame from 'src/PhaserGame';
import Game from 'scenes/Game';
import Cookies from 'universal-cookie';
import { UserResponseDto } from 'src/api/chat';
import { setUserInfo } from 'src/stores/UserStore';
import { getUserInfo } from 'src/api/auth';
const cookies = new Cookies();
export default class MyPlayer extends Player {
  private playContainerBody: Phaser.Physics.Arcade.Body;
  private chairOnSit?: Chair;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    userId: string,
    userInfo: UserResponseDto,
    name: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, id, userId, userInfo, frame);
    this.playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body;
  }

  setPlayerName(name: string) {
    this.playerName.setText(name);
    const userId = store.getState().user?.userId || cookies.get('userId');
    phaserEvents.emit(Event.MY_PLAYER_NAME_CHANGE, name, userId);
    store.dispatch(pushPlayerJoinedMessage(name));
    getUserInfo()
      .then((response) => {
        if (!response) return;
        const { userId, username, ...additionalInfo } = response;
        console.log(userId, username, additionalInfo);
        store.dispatch(setUserInfo(additionalInfo));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setPlayerInfo(userInfo: UserResponseDto) {
    console.log('변경함수 호출!');
    const userId = store.getState().user?.userId || cookies.get('userId');
    phaserEvents.emit(Event.MY_PLAYER_INFO_CHANGE, userInfo, userId);
    const infoToChange = store.getState().user?.userInfo;
    const newInfo = { ...infoToChange, ...userInfo };
    store.dispatch(setUserInfo(newInfo));
  }

  setPlayerTexture(texture: string) {
    this.playerTexture = texture;
    this.anims.play(`${this.playerTexture}_idle_down`, true);
    phaserEvents.emit(Event.MY_PLAYER_TEXTURE_CHANGE, this.x, this.y, this.anims.currentAnim.key);
  }

  update(
    playerSelector: PlayerSelector,
    cursors: NavKeys,
    keyE: Phaser.Input.Keyboard.Key,
    keyR: Phaser.Input.Keyboard.Key,
    keySpace: Phaser.Input.Keyboard.Key,
    network: Network
  ) {
    if (!cursors) return;

    const item = playerSelector.selectedItem;
    const closePlayer = playerSelector.closePlayer;
    const game = phaserGame.scene.keys.game as Game;
    //  쓰일수 있어서 주석처리.
    // if (Phaser.Input.Keyboard.JustDown(keyE)) {
    //   switch (item?.itemType) {
    //     case ItemType.TABLE:
    //       const table = item as Table;

    // break;
    // case ItemType.WHITEBOARD:
    //   const whiteboard = item as Whiteboard;
    //   whiteboard.openDialog(network);
    //   break;
    // case ItemType.VENDINGMACHINE:
    //   // hacky and hard-coded, but leaving it as is for now
    //   window.open("https://www.buymeacoffee.com/skyoffice", "_blank");
    //   break;
    // }
    // }

    switch (this.playerBehavior) {
      case PlayerBehavior.IDLE:
        // if press E in front of selected chair
        if (Phaser.Input.Keyboard.JustDown(keyE) && item?.itemType === ItemType.CHAIR) {
          console.log('press E in Idle');

          const chairItem = item as Chair;
          const chair = network.getChairState()?.get(String(chairItem.chairId));
          const isExisted = network.getPlayers()?.has(String(chair?.clientId));
          if (chair?.occupied && isExisted) {
            chairItem.clearDialogBox();
            chairItem.setDialogBox('이미 사람이 앉아있습니다.');
            break;
          }

          /**
           * move player to the chair and play sit animation
           * a delay is called to wait for player movement (from previous velocity) to end
           * as the player tends to move one more frame before sitting down causing player
           * not sitting at the center of the chair
           */

          chairItem.openDialog(this.playerId, network);
          game.allOtherPlayers().forEach((otherPlayer) => {
            otherPlayer.pauseConnect();
          });
          this.scene.time.addEvent({
            delay: 10,
            callback: () => {
              // update character velocity and position
              this.setVelocity(0, 0);
              if (chairItem.itemDirection) {
                this.setPosition(
                  chairItem.x + sittingShiftData[chairItem.itemDirection][0],
                  chairItem.y + sittingShiftData[chairItem.itemDirection][1]
                ).setDepth(chairItem.depth + sittingShiftData[chairItem.itemDirection][2]);
                // also update playerNameContainer velocity and position
                this.playContainerBody.setVelocity(0, 0);
                this.playerContainer.setPosition(
                  chairItem.x + sittingShiftData[chairItem.itemDirection][0],
                  chairItem.y + sittingShiftData[chairItem.itemDirection][1] - 30
                );
              }

              this.play(`${this.playerTexture}_sit_${chairItem.itemDirection}`, true);
              playerSelector.selectedItem = undefined;
              if (chairItem.itemDirection === 'up') {
                playerSelector.setPosition(this.x, this.y - this.height);
              } else {
                playerSelector.setPosition(0, 0);
              }
              // send new location and anim to server
              network.updatePlayer(this.x, this.y, this.anims.currentAnim.key);
              network.updateChairStatus(chairItem.tableId, chairItem.chairId, true);
            },
            loop: false,
          });
          // set up new dialog as player sits down
          chairItem.clearDialogBox();
          chairItem.setDialogBox('E키를 눌러 일어나기');
          this.chairOnSit = chairItem;
          this.playerBehavior = PlayerBehavior.SITTING;

          return;
        } else if (Phaser.Input.Keyboard.JustDown(keyR) && closePlayer) {
          // if press R in front of another player
          console.log(closePlayer);

          network.sendPrivateMessage(this.userId, closePlayer.userId, '안녕하세요');
          return;
        } else {
          const speed = cursors.shift?.isDown ? 240 : 120;
          let vx = 0;
          let vy = 0;
          if (cursors.left?.isDown || cursors.A?.isDown) vx -= speed;
          if (cursors.right?.isDown || cursors.D?.isDown) vx += speed;
          if (cursors.up?.isDown || cursors.W?.isDown) {
            vy -= speed;
            this.setDepth(this.y); //change player.depth if player.y changes
          }
          if (cursors.down?.isDown || cursors.S?.isDown) {
            vy += speed;
            this.setDepth(this.y); //change player.depth if player.y changes
          }

          // update character velocity
          this.setVelocity(vx, vy);
          this.body.velocity.setLength(speed);
          // also update playerNameContainer velocity
          this.playContainerBody.setVelocity(vx, vy); // 캐릭터
          this.playContainerBody.velocity.setLength(speed); // 이름

          // update animation according to velocity and send new location and anim to server
          if (vx !== 0 || vy !== 0)
            network.updatePlayer(this.x, this.y, this.anims.currentAnim.key);
          if (vx > 0) {
            this.play(`${this.playerTexture}_run_right`, true);
          } else if (vx < 0) {
            this.play(`${this.playerTexture}_run_left`, true);
          } else if (vy > 0) {
            this.play(`${this.playerTexture}_run_down`, true);
          } else if (vy < 0) {
            this.play(`${this.playerTexture}_run_up`, true);
          } else {
            const parts = this.anims.currentAnim.key.split('_');
            parts[1] = 'idle';
            const newAnim = parts.join('_');
            // this prevents idle animation keeps getting called
            if (this.anims.currentAnim.key !== newAnim) {
              this.play(parts.join('_'), true);
              // send new location and anim to server
              network.updatePlayer(this.x, this.y, this.anims.currentAnim.key);
            }
          }
          break;
        }
      case PlayerBehavior.SITTING:
        // back to idle if player press E while sitting
        if (Phaser.Input.Keyboard.JustDown(keyE)) {
          const parts = this.anims.currentAnim.key.split('_');
          parts[1] = 'idle';
          this.play(parts.join('_'), true);
          this.playerBehavior = PlayerBehavior.IDLE;
          playerSelector.setPosition(this.x, this.y);
          playerSelector.update(this, cursors);
          network.updateChairStatus(this.chairOnSit?.tableId, this.chairOnSit?.chairId, false);
          network.updatePlayer(this.x, this.y, this.anims.currentAnim.key);
        }
        // this.chairOnSit?.clearDialogBox();
        // this.chairOnSit?.setDialogBox("E키를 눌러서 일어나기");
        // window.addEventListener("beforeunload", (event) => {
        //   network.updateChairStatus(
        //     this.chairOnSit?.chairId
        //   );
        //   event.returnValue = "다음에 또 방문해주세요!";
        // });
        break;
    }
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      myPlayer(
        x: number,
        y: number,
        texture: string,
        id: string,
        userId: string,
        userInfo: UserResponseDto,
        frame?: string | number
      ): MyPlayer;
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'myPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    id: string,
    userId: string,
    userInfo: UserResponseDto,
    frame?: string | number
  ) {
    const sprite = new MyPlayer(this.scene, x, y, texture, id, userId, userInfo, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

    const collisionScale = [0.5, 0.2];
    sprite.body
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(
        sprite.width * (1 - collisionScale[0]) * 0.5,
        sprite.height * (1 - collisionScale[1])
      );

    return sprite;
  }
);
