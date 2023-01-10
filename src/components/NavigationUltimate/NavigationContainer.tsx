import react from 'react';
import styled from 'styled-components';
import ProfileAndConnection from './ProfileAndConnection/ProfileAndConnectionContainer';
import SocialFunctions from './Social/SocialFunctionsContainer';
import ProjectHuntingPochaPocha from './ShowProjectName/HuntingPochaPocha';
import HelperButtonGroup from './Helpers/HelperButtonGroup';

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
  gap: 10px;
  width: 100vw;
  height: 60px;
  background-color:  #C4564C;
`;


export default function NavigationContainer() {
  
  return (
    <Backdrop>
      <RedContainer>
            <ProfileAndConnection/>
            <SocialFunctions/>
            <ProjectHuntingPochaPocha/>
            <HelperButtonGroup/>
      </RedContainer>
    </Backdrop>
  );
}