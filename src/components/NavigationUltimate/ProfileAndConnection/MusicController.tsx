import react from 'react';
import styled from 'styled-components';
import Colors from 'src/utils/Colors';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import React, { useState, useEffect } from 'react';
import BgmSrc from 'src/assets/music/BGM1.mp3';

export default function () {
  const [BGMstate, setBGMstate] = useState<boolean>(true);
  const [audio] = useState<HTMLAudioElement | null>(
    typeof Audio === 'undefined' ? null : new Audio(BgmSrc)
  );

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener(
      'ended',
      function () {
        audio.currentTime = 0;
        audio.play();
      },
      false
    );
  }, []);

  useEffect(() => {
    BGMstate ? audio?.play() : audio?.pause();
    // if (audio) audio?.loop = true;
  }, [BGMstate]);

  const handleBGM = () => {
    setBGMstate(!BGMstate);
  };

  return (
    <Wrapper>
      <StyledAudioBox onClick={handleBGM}>
        {BGMstate ? (
          <MusicNoteIcon fontSize="large" sx={{ color: Colors.white }} />
        ) : (
          <MusicOffIcon fontSize="large" sx={{ color: Colors.white }} />
        )}
      </StyledAudioBox>
    </Wrapper>
  );
}

/***** CSS *****/
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledAudioBox = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 30%;
  background-color: ${Colors.indigo};
  font-size: 1rem;
  font-weight: 900;
  &:hover {
    background-color: ${Colors.skyblue[1]};
  }
`;
