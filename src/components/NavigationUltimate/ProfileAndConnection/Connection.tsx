import react from 'react';
import styled from 'styled-components';
import MicIcon from '@mui/icons-material/Mic';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

// styled.div with Shadow
const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 44px;
  background-color: #c4564c;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 2rem;
  font-weight: 900;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function ConnectionStatus() {
  return (
    <Wrapper>
      <StyledRedBox>
        <MicIcon fontSize="large" />
      </StyledRedBox>
      <StyledRedBox>
        <VideoCameraFrontIcon fontSize="large" />
      </StyledRedBox>
    </Wrapper>
  );
}
