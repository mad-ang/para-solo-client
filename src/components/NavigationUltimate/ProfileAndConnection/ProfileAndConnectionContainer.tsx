import react from 'react';
import Profile from './Profile'
import Connection from './Connection'
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  width: 400px;
  justify-content: flex-end;
`

export default function() {
  return (
    <Wrapper>
      <Profile />
      <Connection />
    </Wrapper>
  );
}