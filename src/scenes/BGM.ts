
import Phaser from 'phaser';
import BGMmusic from 'src/assets/music/BGM2.mp3'

export default class BGM extends Phaser.Scene {
  private bgm!: Phaser.Sound.BaseSound;
  private playButton!: Phaser.GameObjects.Text;
  private pauseButton!: Phaser.GameObjects.Text;
  private stopButton!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'BGM'})
  }

  preload() {
    // load the audio file
    // this.load.audio('bgm', 'src/assets/music/BGM1.mp3');
    this.load.audio('bgm', BGMmusic );
    console.log("로딩완료")
    console.log("로딩완료")
    console.log("로딩완료")
    console.log("로딩완료")
    this.load.on('complete', this.playMusic, this);
    this.load.start();
  }

  create() {
    // create sound control buttons
    this.playButton = this.add.text(50, 50, 'Play', { font: '24px Arial' });
    this.playButton.setColor('#0f0');
    this.playButton.setInteractive();
    this.playButton.on('pointerdown', this.playMusic, this);
    
    this.pauseButton = this.add.text(100, 50, 'Pause', { font: '24px Arial' });
    this.playButton.setColor('#0f0');
    this.pauseButton.setInteractive();
    this.pauseButton.on('pointerdown', this.pauseMusic, this);
    
    this.stopButton = this.add.text(150, 50, 'Stop', { font: '24px Arial' });
    this.playButton.setColor('#0f0');
    this.stopButton.setInteractive();
    this.stopButton.on('pointerdown', this.stopMusic, this);
  }

  playMusic() {
    if (!this.bgm) {
      // create a new sound
      this.bgm = this.sound.add('bgm', { loop: true });
    }
    // play the sound
    this.bgm.play();
  }

  pauseMusic() {
    if (this.bgm) {
      // pause the sound
      this.bgm.pause();
    }
  }

  stopMusic() {
    if (this.bgm) {
      // stop the sound
      this.bgm.stop();
    }
  }
}
