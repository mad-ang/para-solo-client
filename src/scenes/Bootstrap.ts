import Phaser from 'phaser';
import Network from '../services/Network';
import { BackgroundMode } from '../types/BackgroundMode';
import store from '../stores';
import { ENTERING_PROCESS, setEnteringProcess } from '../stores/UserStore';

export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false;
  network!: Network;

  constructor() {
    super('bootstrap');
  }

  preload() {
    this.load.atlas(
      'cloud_day',
      'assets/background/cloud_day.png',
      'assets/background/cloud_day.json'
    );
    this.load.image('backdrop_day', 'assets/background/backdrop_day.png');
    this.load.atlas(
      'cloud_night',
      'assets/background/cloud_night.png',
      'assets/background/cloud_night.json'
    );
    this.load.image('backdrop_night', 'assets/background/backdrop_night.png');
    this.load.image('sun_moon', 'assets/background/sun_moon.png');

    this.load.tilemapTiledJSON('tilemap', 'assets/map/game_map.json');

    this.load.spritesheet('interior', 'assets/map/interior.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('tiles', 'assets/map/tiles.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('buildings', 'assets/map/buildings.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('adam', 'assets/character/adam.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ash', 'assets/character/ash.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('lucy', 'assets/character/lucy.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('nancy', 'assets/character/nancy.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.on('complete', () => {
      this.preloadComplete = true;
      this.launchBackground(store.getState().user.backgroundMode);
    });
  }

  init() {
    this.network = new Network();
  }

  private launchBackground(backgroundMode: BackgroundMode) {
    this.scene.launch('background', { backgroundMode });
  }

  launchGame() {
    // if (!this.preloadComplete) return;
    this.network.webRTC?.checkPreviousPermission();
    this.scene.launch('game', {
      network: this.network,
    });

    // update Redux state
    store.dispatch(setEnteringProcess(ENTERING_PROCESS.CHARACTER_SELECTION));
    console.log('launchGame');
  }

  changeBackgroundMode(backgroundMode: BackgroundMode) {
    this.scene.stop('background');
    this.launchBackground(backgroundMode);
  }
}
