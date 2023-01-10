import react from 'react';
import styled from 'styled-components';

const SexyChar = styled.span`
  width: 50px;
  height: 50px;
  color: #ff0000;
  font-size: 2rem;
  font-weight: 900;
  margin: 0 0.5rem;
  color: #CE0000;
  background-color: #FFFFFF;
`;

const Wrapper = styled.div`
  padding: 8px;
`


function ProjectNameChar(char: string) {
  return(
    <SexyChar>
      {char}
    </SexyChar>    
  );
}

export default function HuntingPochaPocha() {
  return (
    <Wrapper>
      {ProjectNameChar('삼')}
      {ProjectNameChar('거')}
      {ProjectNameChar('리')}
      {ProjectNameChar('포')}
      {ProjectNameChar('차')}
    </Wrapper>
  );
}