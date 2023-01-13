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

    this.load.spritesheet('basement', 'assets/tileset/basement.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('bigTree', 'assets/tileset/bigTree.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('boat', 'assets/tileset/boat.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('camping', 'assets/tileset/camping.png', {
      frameWidth: 16,
      frameHeight: 16,
    });


    this.load.spritesheet('camping3', 'assets/tileset/camping3.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('campingZone', 'assets/tileset/campingZone.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('waterBridge', 'assets/tileset/waterBridge.png', {
      frameWidth: 16,
      frameHeight: 16,
      });

    // food 이미지 너무커서 vehicles 에 다 있음

    this.load.spritesheet('generic', 'assets/tileset/generic.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('boat1', 'assets/animate/boat1.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('billboard', 'assets/animate/billboard.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('campfire2', 'assets/tileset/campfire2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('genericBuildings', 'assets/tileset/genericBuildings.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('picnic', 'assets/tileset/picnic.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('playground', 'assets/tileset/playground.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('tent', 'assets/tileset/tent.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('modernExteriors', 'assets/tileset/modernExteriors.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('floorTiles', 'assets/tileset/floorTiles.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('fences', 'assets/tileset/fences.png', {
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

    this.load.spritesheet('buildings', 'assets/tileset/buildings.png', {
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
