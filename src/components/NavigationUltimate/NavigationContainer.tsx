import react from 'react';
import styled from 'styled-components';
import ProfileAndConnection from './ProfileAndConnection/ProfileAndConnectionContainer';
import SocialFunctions from './Social/SocialFunctionsContainer';
import ProjectHuntingPochaPocha from './ShowProjectName/HuntingPochaPocha';
import HelperButtonGroup from './Helpers/HelperButtonGroup';
import Colors from 'src/utils/Colors';

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
  return (
    <Backdrop className="myNavbar">
      <RedContainer>
        <ProfileAndConnection />
        <SocialFunctions />
        <ProjectHuntingPochaPocha />
        <HelperButtonGroup />
      </RedContainer>
    </Backdrop>
  );
}
