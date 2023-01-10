import react from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 185px;
  height: 44px;
  background-color: #C4564C;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 1rem;
  font-weight: 900;
  padding: 4x;
`;

const UserNameDiv = styled.div`
    padding: 4px 0px;
    font-size: 1rem;
`


export default function ConnectionStatus() {
    return (
        <div>
            <StyledRedBox>
                <img src ="https://user-images.githubusercontent.com/63194662/211139459-96aa37f8-fcd9-4126-9a6b-52296fc3236c.png" height={35}/>
                    <UserNameDiv>
                        왕십리꿀벅지
                    </UserNameDiv>
                <EditIcon sx={{ fontSize: 30 }}/>
            </StyledRedBox>
        </div>
    );
}