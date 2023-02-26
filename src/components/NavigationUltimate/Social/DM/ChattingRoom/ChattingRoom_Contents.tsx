import React, { useState, useEffect } from 'react';
import { ChatFeed } from 'react-chat-ui';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import styled from 'styled-components';
import Game from 'src/scenes/Game';
import phaserGame from 'src/PhaserGame';
import { Colors } from 'src/utils/Colors';
import { setNewMessageCnt } from 'src/stores/DMboxStore';


export default function ChatBubbles(props) {
  const dispatch = useAppDispatch();
  const game = phaserGame.scene.keys.game as Game;
  const socketNetwork = game.network2;
  const roomId = useAppSelector((state) => state.dm.roomId);
  const friendId = useAppSelector((state) => state.dm.friendId);
  const userId = useAppSelector((state) => state.user.userId);
  const newMessage = useAppSelector((state) => state.dm.newMessage);


  // 기존 메세지 리스트 -> 삭제 예정
  const [messageList, setMessageList] = useState<any>([]);
  const callbackForJoinRoom = (oldMessages) => {
    setMessageList(oldMessages);
  };
  useEffect(() => {
    socketNetwork.joinRoom(roomId, userId, friendId, callbackForJoinRoom);
  }, []);

  useEffect(() => {
    if (!props.newMessage || props.newMessage?.message.length === 0) return;

    const body = {
      // id : 0,
      roomId: roomId,
      userId: userId,
      friendId: friendId,
      message: props.newMessage.message,
    };

    // 내가 쓴 메세지 채팅 리스트에 추가
    setMessageList((messageList) => [...messageList, props.newMessage]);

    // 내가 쓴 메세지 서버에 전송
    game.network2.sendMessage(body);
  }, [props.newMessage?.message]);

  useEffect(() => {
    setMessageList((messageList) => [...messageList, newMessage]);
    dispatch(setNewMessageCnt(-1));
  }, [newMessage]);

  return (
    <>
      <Wrapper>
        <ChatFeed
          maxHeight={450}
          messages={messageList || []} // Array: list of message objects
          // isTyping={false} // Boolean: is the recipient typing
          // hasInputField={false} // Boolean: use our input, or use your own
          // showSenderName={'who'} // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontFamily: 'Ycomputer-Regular',
              fontSize: 16,
              color: `${Colors.black[1]}`,
            },
            chatbubble: {
              borderRadius: 8,
              padding: 10,
              maxWidth: 200,
              width: 'fit-content',
              marginTop: 2,
              marginRight: 7,
              marginBottom: 1,
              marginLeft: 7,
              wordBreak: 'break-all',
              backgroundColor: `${Colors.pink[1]}`,
            },
            userBubble: {
              backgroundColor: `${Colors.skyblue[5]}`,
            },
          }}
        />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 450px;
  width: 370px;
`;
