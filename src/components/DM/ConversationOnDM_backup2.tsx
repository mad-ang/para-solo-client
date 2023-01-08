import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ConversationView() {

  type Message = {
    id: string;
    conversationId: string;
    senderId: string;
    text: string;
    createdAt: string;
  };

  const { friendId } = useParams();
  // const [messages, setMessages] = useState([ ]); //서버 완성되면 이걸로 업데이트
  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    async function fetchMessages() {
      /*서버완성되면 이거 땡겨와서 받으면 됨*/
      // const response = await fetch(`/api/conversations/${friendId}/messages`);
      // const data = await response.json();
      const data = [
      {    "id": "1",    "conversationId": "abc",    "senderId": "1",    "text": "Hello!",    "createdAt": "2022-01-01T00:00:00.000Z"  },
      {    "id": "2",    "conversationId": "abc",    "senderId": "2",    "text": "Hi there!",    "createdAt": "2022-01-01T00:01:00.000Z"  },
      {    "id": "3",    "conversationId": "abc",    "senderId": "1",    "text": "How are you?",    "createdAt": "2022-01-01T00:02:00.000Z"  }]

      setMessages(data);
    }
    fetchMessages();
  }, [friendId]);

  return (
    <div>
      {messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ).map(message => (
        <div key={message.id}>
          <p>{message.text}</p>
          <p>{message.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
