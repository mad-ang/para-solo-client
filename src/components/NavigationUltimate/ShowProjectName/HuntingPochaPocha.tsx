import react from 'react';
import Colors from 'src/utils/Colors';
import styled from 'styled-components';

const SexyChar = styled.span`
  width: 50px;
  height: 50px;
  font-size: 2rem;
  font-weight: 900;
  margin: 0 0.5rem;
  font-family: 'Nanum Gothic', sans-serif;
  color: #c1ffd7;
  background-color: ${Colors.indigo};
`;

const Wrapper = styled.div`
  padding: 8px;
`;

function ProjectNameChar(char: string) {
  return <SexyChar>{char}</SexyChar>;
}

export default function HuntingPochaPocha() {
  return (
    <Wrapper>
      <img src="/src/assets/navbar/Beach.png" height={35} />
      {ProjectNameChar('Solo')}
      {ProjectNameChar('Beach')}
    </Wrapper>
  );
}
