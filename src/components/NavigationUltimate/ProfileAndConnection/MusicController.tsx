import react from 'react';
import Connection from './Connection';
import styled from 'styled-components';
import Colors from 'src/utils/Colors';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import React, { useRef, useState, useEffect } from 'react';
import { truncate } from 'fs';

export default function () {
  const [BGMstate, setBGMstate] = useState(true);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = '/assets/music/BGM1.mp3';
    audio.loop = true;
    if (BGMstate) audio.play();
  }, [BGMstate]);

  const handleBGM = () => {
    setBGMstate(!BGMstate);
    if (!BGMstate) audioRef.current.pause();
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
