import react from 'react';
import PublicChat from './PublicChat'
import AddFriendsInRoom from './AddFriendsInRoom'
import DirectMessage from './DirectMessage'
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  width: 400px;
  justify-content: flex-end;
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