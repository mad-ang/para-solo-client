import react,{ useState } from 'react';
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

const ProfileSettingEditor = styled.div`
position: fixed;
bottom: 100px;
left: 0px;
background-color: #FFFFFF;
gap: 10px;
bottom: 60px;
height: 400px;
width: 370px;
border-radius: 25px;
box-shadow: 20px 0px 10px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`


function ProfileEditModal(props){

    function handleClick() {
        props.setShowProfileEditModal(false);
      }

    return(
        <ProfileSettingEditor>
            <button  onClick={()=>{handleClick()}}  > X </button>
            <h1>프로필 수정</h1>
        </ProfileSettingEditor>
    )
}



export default function ConnectionStatus() {
    const [profileEditModal, setShowProfileEditModal] = useState(false);

    function handleClick() {
        setShowProfileEditModal(true);
      }

    return (
        <div>
            <StyledRedBox>
                <img src ="https://user-images.githubusercontent.com/63194662/211139459-96aa37f8-fcd9-4126-9a6b-52296fc3236c.png" height={35}/>
                    <UserNameDiv>
                        왕십리꿀벅지
                    </UserNameDiv>
                <EditIcon sx={{ fontSize: 30 }}  onClick={()=>{
                    handleClick();
                    console.log("click");
                    }}>
                </EditIcon>
                {profileEditModal ? (
                        <ProfileEditModal setShowProfileEditModal={setShowProfileEditModal}/>
                    ): null}
            </StyledRedBox>
        </div>
    );
}