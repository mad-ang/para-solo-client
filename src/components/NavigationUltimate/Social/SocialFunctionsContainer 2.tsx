import react from 'react';
import PublicChat from './PublicChat'
import AddFriendsInRoom from './AddFriendsInRoom'
import DirectMessage from './DirectMessage'
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`

export default function() {
  return (
    <Wrapper>
      <PublicChat />
      <AddFriendsInRoom />
      <DirectMessage />
    </Wrapper>
  );
}