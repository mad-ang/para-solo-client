import React, { useState, useEffect } from 'react';
import Phaser from 'phaser';

export default function BGM2() {
  let bgm: any = null;
  useEffect(() => {
    const newScene = new Phaser.Scene({ key: 'MyScene' });
    newScene.load.audio('bgm', 'src/assets/music/BGMsmall.mp3');
    newScene.load.on('complete', () => {
      const bgm = newScene.sound.add('bgm', { loop: true });
    });
  }, []);

  function playMusic() {
    if (!bgm) {
      return;
    }
    // play the sound
    bgm.play();
  }

  function pauseMusic() {
    if (bgm) {
      // pause the sound
      bgm.pause();
    }
  }

  function stopMusic() {
    if (bgm) {
      // stop the sound
      bgm.stop();
    }
  }

  return (
    <>
      <button onClick={playMusic}>Play</button>
      <button onClick={pauseMusic}>Pause</button>
      <button onClick={stopMusic}>Stop</button>
    </>
  );
}
