import React, { useRef, useState, useEffect } from 'react';
import { ChatFeed, Message, ChatInput } from 'react-chat-ui';
// import ChatFeed from 'react-chat-ui';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 460px;
  width: 370px;
`;

export default function ChatBubbles(props) {
  const [messageList, setMessageList] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
  ]);

  const directMessages = useAppSelector((state) => state.dm.directMessages);
  const showDM = useAppSelector((state) => state.dm.showDM);

  // 채팅 보여줄 시(useEffect), scrollToBottom()

  // 저장 되어 있던 메세지 보여줌
  useEffect(() => {
    console.log('props.newMessage', props.newMessage);
    setMessageList((messageList) => [...messageList, props.newMessage]);
  }, [props.newMessage]);

  return (
    <>
      <Wrapper>
        <ChatFeed
          maxHeight={460}
          messages={messageList} // Array: list of message objects
          // isTyping={messages.is_typing} // Boolean: is the recipient typing
          hasInputField={false} // Boolean: use our input, or use your own
          showSenderName={false} // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble styles
          bubbleStyles={{
            text: {
              fontSize: 20,
            },
            chatbubble: {
              borderRadius: 25,
              padding: 15,
              maxWidth: 250,
              width: '75%',
              marginTop: 1,
              marginRight: 'auto',
              marginBottom: 1,
              marginLeft: 'auto',
            },
            userBubble: {},
          }}
        />
      </Wrapper>
    </>
  );
}
