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
        ? `https://${import.meta.env.VITE_SOCKET_SERVER_URL}`
        : `http://${window.location.hostname}:5002`;

    this.socketClient = io(socketUrl, {
      transports: ['websocket', 'polling', 'flashsocket'],
      withCredentials: true,
    });
    this.oldMessages = [];

    this.socketClient.on('request-friend-res', (data) => {
      store.dispatch(setRequestFriendCnt(1));
      fireNotification('[PARA-SOLO] 친구 요청 도착', {
        body: `${data}님과 친구를 맺어보아요.`,
        icon: `${ParasolImg}`,
      });
    });

    this.socketClient.on('updata-room-id', (data) => {
      console.log('updata-room-id!!!');
    });

    this.socketClient.on('delete-friend-res', (data) => {
      console.log('delete-friend-res!!!');
    });

    this.socketClient.on('request-friend', (data) => {
      console.log('request-friend!!!');
    });

    this.socketClient.on('accept-friend', (data) => {
      console.log('accept-friend!!!');
    });

    this.socketClient.on('accept-friend-res', (data) => {
      fireNotification('[PARA-SOLO] 친구 요청 수락', {
        body: `짝짝짝, ${data}님이 친구 요청을 수락했습니다.`,
        icon: `${ParasolImg}`,
      });
    });

    this.socketClient.on('message', (data) => {
      data.id = 1;

      store.dispatch(setNewMessage(data));
      store.dispatch(setNewMessageCnt(1));
    });
  }

  getSocket = () => {
    return this.socketClient;
  };

  joinRoom = (roomId: string, userId: string, friendId: string, callback: any) => {
    this.socketClient.emit('join-room', { roomId: roomId, userId: userId, friendId: friendId });

    this.socketClient.on('old-messages', (data) => {
      const userId = store.getState().user.userId || cookies.get('userId');
      this.oldMessages = [];
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

  requestFriendReq = (obj: object) => {
    this.socketClient.emit('request-friend-req', obj);
  };

  acceptFriendReq = (obj: object) => {
    this.socketClient.emit('accept-friend-req', obj);
  };

  sendMessage = (message: object) => {
    this.socketClient.emit('message', message);
  };

  whoAmI = (userId: string) => {
    this.socketClient.emit('whoAmI', userId);
  };

  deleteFriend = (userId: string, friendId: string) => {
    this.socketClient.emit('delete-friend', { userId: userId, friendId: friendId });
  };

  moreFriendInfo = (friendId: string) => {
    this.socketClient.emit('more-friendInfo', { friendId: friendId });
  };
}
