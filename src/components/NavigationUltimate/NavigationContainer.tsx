import react from 'react';
import styled from 'styled-components';
import ProfileAndConnection from './ProfileAndConnection/ProfileAndConnectionContainer';
import SocialFunctions from './Social/SocialFunctionsContainer';
import ProjectHuntingPochaPocha from './ShowProjectName/HuntingPochaPocha';
import HelperButtonGroup from './Helpers/HelperButtonGroup';
import Colors from 'src/utils/Colors';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import React, { useRef, useState, useEffect } from 'react';
import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  gap: 10px;
  bottom: 0px;
  right: 0px;
  align-items: flex-end;
`;

const RedContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  width: 100vw;
  height: 60px;
  background-color: ${Colors.indigo};
`;

export default function NavigationContainer() {

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      inputRef.current?.blur();
      dispatch(SetWhichModalActivated(ModalState.None));
    }
  };

  return (
    <Backdrop className="myNavbar" onKeyDown={handleKeyDown}>
      <RedContainer>
        <ProfileAndConnection />
        <SocialFunctions />
        <ProjectHuntingPochaPocha />
        <HelperButtonGroup />
      </RedContainer>
    </Backdrop>
  );
}
