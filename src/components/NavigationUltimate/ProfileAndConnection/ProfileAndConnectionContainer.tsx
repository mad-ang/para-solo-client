import react from 'react';
import Profile from './Profile';
import Connection from './Connection';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
`;

export default function () {
  return (
    <Wrapper>
      <Profile />
      <Connection />
    </Wrapper>
  );
}
