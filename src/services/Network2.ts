import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { phaserEvents, Event } from 'src/events/EventCenter';
import { ServerToClientEvents, ClientToServerEvents } from 'src/api/chat';
import { ChatFeed, Message } from 'react-chat-ui';

export default class chatNetwork {
  private socketClient: Socket;

  constructor() {
    const socketUrl =
      process.env.NODE_ENV === 'production' || import.meta.env.VITE_SERVER === 'PRO'
        ? `http://${import.meta.env.VITE_SERVER_URL}`
        : `http://${window.location.hostname}:5002`;

    this.socketClient = io(`${socketUrl}`,{rejectUnauthorized: false});

    this.socketClient.on('request-friend', (data) => {});
    this.socketClient.on('accept-friend', (data) => {});
    this.socketClient.on('update-room-id', (data) => {});
  }
  // init() {
  //   this.socketClient.on('connect', () => {
  //     console.log('socket connected');

  //     this.socketClient.on('message', (data) => {
  //       console.log('message', data);
  //       // data.id = 1;
  //       // setMessageList((messageList) => [...messageList, data]);
  //     });

  //     this.socketClient.on('disconnect', () => {
  //       console.log('socket disconnected');
  //     });
  //   });
  // }

  getSocket = () => {
    return this.socketClient;
  };
  sendMessage = (message: object) => {
    this.socketClient.emit('message', message);
  };
  whoAmI = (userId: string) => {
    console.log('whoAmI', userId);
    this.socketClient.emit('whoAmI', userId);
  };
}
