import react, { useRef, useState } from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import { SetProfileActivated, SetProfileActivateOnly } from '../../../../stores/NavbarStore';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import DefaultAvatar from 'src/assets/profiles/DefaultAvatar.png';
import Colors from 'src/utils/Colors';
import InputBase from '@mui/material/InputBase';
import Select from 'react-select';
import { infoItemList, Option } from './data';

function ProfileEditModal(props) {
  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState('ㅇㅇㅇ');
  const [gender, setGender] = useState<Option | null>(null);
  const [age, setAge] = useState<Option | null>(null);
  const [height, setHeight] = useState<Option | null>(null);
  const dispatch = useAppDispatch();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  function handleClick() {
    dispatch(SetProfileActivated(false));
  }

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      // move focus back to the game
      dispatch(SetProfileActivated(false));
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      setEditable(!editable);
    }
  };

  const edit = () => {
    setEditable(!editable);
    if (usernameInputRef?.current) {
      usernameInputRef.current.focus();
    }
  };

  return (
    <ProfileSettingEditor>
      <ProfileHeader>
        <TitleText>프로필 수정</TitleText>
        <CloseButton
          onClick={() => {
            handleClick();
          }}
        >
          X
        </CloseButton>
      </ProfileHeader>
      <ProfileBody>
        <ImageWrapper editable={editable}>
          <ProfileAvatarImage src={DefaultAvatar} />
        </ImageWrapper>
        <ProfileUserName editable={editable}>
          <InputWrapper>
            <InputTextField
              inputRef={usernameInputRef}
              readOnly={!editable}
              value={username}
              placeholder={'사용자 이름'}
              autoFocus={editable}
              onKeyDown={handleKeyDown}
              onChange={handleChangeUsername}
            />
          </InputWrapper>
        </ProfileUserName>
        <InfoContainer editable={editable}>
          {infoItemList?.map((item) => (
            <InfoItem key={item.id}>
              <InfoLabelArea>{item.label}</InfoLabelArea>
              <InfoSelectionArea>
                <InfoSelection
                  value={
                    item.id === 1
                      ? gender
                      : item.id === 2
                      ? age
                      : item.id === 3
                      ? height
                      : item.id === 4
                      ? '요소4'
                      : '요소5'
                  }
                  placeholder={item.label}
                  onChange={(choice: any) => {
                    item.id === 1
                      ? setGender(choice)
                      : item.id === 2
                      ? setAge(choice)
                      : item.id === 3
                      ? setHeight(choice)
                      : () => {};
                  }}
                  options={item.options}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  menuPortalTarget={document.body}
                />
              </InfoSelectionArea>
            </InfoItem>
          ))}
        </InfoContainer>
      </ProfileBody>
      <ProfileBottom>
        <ProfileEditButton onClick={edit}>{editable ? '저장' : '프로필 편집'}</ProfileEditButton>
      </ProfileBottom>
    </ProfileSettingEditor>
  );
}

export default function ConnectionStatus() {
  const NavControllerProfileActivated = useAppSelector(
    (state) => state.nav.NavControllerProfileActivated
  );
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(SetProfileActivateOnly());
  }

  return (
    <div>
      <StyledRedBox>
        <img
          src="https://user-images.githubusercontent.com/63194662/211139459-96aa37f8-fcd9-4126-9a6b-52296fc3236c.png"
          height={35}
        />
        <UserNameDiv>왕십리꿀벅지</UserNameDiv>
        <EditButton onClick={handleClick}>
          <EditIcon sx={{ fontSize: 30 }}></EditIcon>
        </EditButton>
        {NavControllerProfileActivated ? <ProfileEditModal /> : null}
      </StyledRedBox>
    </div>
  );
}

interface EditableProps {
  editable: boolean;
}

const StyledRedBox = styled.div`
  display: flex;
  justify-content: center;
  width: 185px;
  height: 44px;
  background-color: #c4564c;
  box-shadow: 0 0 10px 0 #000000;
  font-size: 1rem;
  font-weight: 900;
  padding: 4x;
`;

const EditButton = styled.button`
  background-color: #c4564c;
`;

const UserNameDiv = styled.div`
  padding: 4px 0px;
  font-size: 1rem;
`;
const ProfileSettingEditor = styled.div`
  position: fixed;
  bottom: 100px;
  left: 0px;
  background-color: #ffffff;
  gap: 10px;
  bottom: 60px;
  height: 400px;
  width: 370px;
  border-radius: 6px;
  box-shadow: 20px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  font-style: normal;
  font-weight: 400;
`;

const TitleText = styled.div`
  font-weight: 600;
  font-size: 24px;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
`;

const ProfileHeader = styled.div`
  padding: 10px 10px 0 10px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 90% 10%;
`;

const ProfileBody = styled.div`
  padding: 0 10px 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 75%;
`;

const ImageWrapper = styled.div<EditableProps>`
  margin-top: 32px;
  width: 98px;
  height: 98px;
  border-radius: 50%;
  border: ${(props) => (props.editable ? '1px solid #c4564c' : '1px solid transparent')};
  cursor: ${(props) => (props.editable ? 'pointer' : 'default')};
`;

const ProfileAvatarImage = styled.img`
  width: 100%;
`;

const ProfileUserName = styled.div<EditableProps>`
  margin-top: 14px;
  font-size: 20px;
  font-weight: 600;
  border: ${(props) => (props.editable ? '1px solid #c4564c' : '1px solid transparent')};
  cursor: ${(props) => (props.editable ? 'pointer' : 'default')};
`;

const InfoContainer = styled.div<EditableProps>`
  padding: 5px;
  margin-top: 14px;
  width: 100%;
  border: ${(props) => (props.editable ? '1px solid #c4564c' : '1px solid transparent')};
  cursor: ${(props) => (props.editable ? 'pointer' : 'default')};
`;

const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  margin-top: 8px;
  font-size: 18px;
`;

const InfoLabelArea = styled.div``;

const InfoSelectionArea = styled.div`
  width: 150px;
  outline: none;
`;

const InfoSelection = styled(Select)`
  outline: none;
`;

const ProfileBottom = styled.div`
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.red[2]};
  &:hover {
    background-color: ${Colors.red[1]};
  }
`;

const ProfileEditButton = styled.button`
  border: none;
  width: 100%;
  font-weight: 600;
  font-size: 20px;
  background: none;
`;

const InputWrapper = styled.form`
  display: flex;
  flex-direction: row;
`;
const InputTextField = styled(InputBase)`
  border-radius: 0px 0px 10px 10px;
  input {
    padding: 5px;
    color: #000;
  }
`;
