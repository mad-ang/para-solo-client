import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { phaserEvents, Event } from 'src/events/EventCenter';
import { ServerToClientEvents, ClientToServerEvents } from 'src/api/chat';
import ParasolImg from 'src/assets/directmessage/parasol.png';

import { ChatFeed, Message } from 'react-chat-ui';
import store from '../stores';
import { setNewMessageCnt, setNewMessage, setRequestFriendCnt } from 'src/stores/DMboxStore';
import Cookies from 'universal-cookie';
import { fireNotification } from 'src/api/notification';
const cookies = new Cookies();
export default class chatNetwork {
  private socketClient: Socket;
  public oldMessages: any[];

  constructor() {
    const socketUrl =
      process.env.NODE_ENV === 'production' || import.meta.env.VITE_SERVER === 'PRO'
        ? `http://43.201.32.156:5002`
        : `http://${window.location.hostname}:5002`;

    this.socketClient = io(`${socketUrl}`);
    this.oldMessages = [];
    this.socketClient.on('connect', () => {
      this.socketClient.on('request-friend', (data) => {
        store.dispatch(setRequestFriendCnt(1));
        fireNotification('[PARA-SOLO] 친구 요청 도착', {
          body: `${data.username}님과 친구를 맺어보아요.`,
          icon: `${ParasolImg}`,
        });
        console.log('request-friend', data);
      });
      this.socketClient.on('accept-friend', (data) => {
        fireNotification('[PARA-SOLO] 친구 요청 수락', {
          body: `짝짝짝, ${data}님이 친구 요청을 수락했습니다.`,
          icon: `${ParasolImg}`,
        });
        console.log('request-friend', data);
      });

      this.socketClient.on('message', (data) => {
        console.log('message와땅');
        data.id = 1;
        store.dispatch(setNewMessage(data));
        store.dispatch(setNewMessageCnt(1));
      });
    });
  }

  getSocket = () => {
    return this.socketClient;
  };

  joinRoom = (roomId: string, userId: string, friendId: string, callback: any) => {
    console.log('join!');
    this.socketClient.emit('join-room', { roomId: roomId, userId: userId, friendId: friendId });

    this.socketClient.on('old-messages', (data) => {
      const userId = store.getState().user.userId || cookies.get('userId');
      this.oldMessages = [];
      console.log('old-messages', '받아왔다!', data);
      data.forEach((element: any) => {
        if (element.senderId) {
          if (element.senderId === userId) {
            element.id = 0;
          } else {
            element.id = 1;
          }
          this.oldMessages.push(element);
        }
      });
      callback(this.oldMessages);
    });
  };

  listenMessage = () => {};

  sendMessage = (message: object) => {
    this.socketClient.emit('message', message);
  };

  whoAmI = (userId: string) => {
    this.socketClient.emit('whoAmI', userId);
  };
}
