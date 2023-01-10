import react from 'react';
import styled from 'styled-components';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
  height: 44px;
  background-color: #C4564C;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 1rem;
  font-weight: 900;
`;


export default function AddFriendsInRoom() {
    return (
        <StyledRedBox>
            <GroupAddIcon fontSize='large'/>
        </StyledRedBox>
    );
}