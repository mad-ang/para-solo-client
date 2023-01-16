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

    this.load.tilemapTiledJSON('tilemap', 'assets/map/huntingMap.json');

    this.load.spritesheet('interior', 'assets/tileset/interior.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('camping', 'assets/tileset/camping.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('waterBridge', 'assets/tileset/waterBridge.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('foodCars', 'assets/tileset/foodCars.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    // food 이미지 너무커서 vehicles 에 다 있음

    this.load.spritesheet('campfire2', 'assets/animate/campfire2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('modernExteriors', 'assets/tileset/modernExteriors.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('ModernExteriorsComplete', 'assets/tileset/ModernExteriorsComplete.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    
    this.load.spritesheet('villas', 'assets/tileset/villas.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('vehicles', 'assets/tileset/vehicles.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('waterToy', 'assets/tileset/waterToy.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('tiles', 'assets/tileset/tiles.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('parasol', 'assets/tileset/parasol.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('parasol2', 'assets/tileset/parasol2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('billboard', 'assets/animate/billboard.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('boat1', 'assets/animate/boat1.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('bird', 'assets/animate/bird.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('worm', 'assets/animate/worm.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('pigeon', 'assets/animate/pigeon.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('characterInWater', 'assets/animate/characterInWater.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('clothes', 'assets/animate/clothes.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('ball1', 'assets/animate/ball1.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('ball2', 'assets/animate/ball2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('fishingBoat', 'assets/animate/fishingBoat.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('fish', 'assets/animate/fish.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('fish2', 'assets/animate/fish2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('fish3', 'assets/animate/fish3.png', {
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
