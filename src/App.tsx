// Welcome to our source code!
// Project: 동물의왕국
// Contributed by: 윤중선 <https://github.com/Joong-Sunny> (FE,TL)
//                 이송희 <https://github.com/soneelee> (FE)
//                 우수연 <https://github.com/yeonwooz> (BE)
//                 김희산 <https://github.com/heesankim> (BE)
//                 김기운 <https://github.com/KiwoonKim> (BE)
// Thanks to SWJungle & KAIST where we made this project.

import React from "react";
import styled from "styled-components";
import { HashRouter } from 'react-router-dom';
import { useAppSelector } from "./hooks";
import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import TableDialog from "./components/TableDialog";
import WelcomeToast from "./components/ToastNotification";
import SignUpDialog from "./components/SignUpDialog";
import SignInDialog from "./components/SignInDialog";
import axios from 'axios';
import NavigationContainer from './components/NavigationUltimate/NavigationContainer';


axios.defaults.baseURL = 'http://localhost:2567';


const Backdrop = styled.div`
    position: absolute;
    z-index: 10;
    height: 90%;
    width: 100%;
`;

function App() {
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const tableDialogOpen = useAppSelector(
        (state) => state.table.tableDialogOpen
  );
    const videoConnected = useAppSelector((state) => state.user.videoConnected);
    const roomJoined = useAppSelector((state) => state.room.roomJoined);
    const signUp = useAppSelector((state) => state.user.signUp);
    const signIn = useAppSelector((state) => state.user.signIn);

    let ui: JSX.Element;
    if (loggedIn) {
        if (tableDialogOpen) {
            ui = <TableDialog />;
        } else {
            ui = (
                /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
                <>
                     <NavigationContainer />
                    {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
                    {!videoConnected && <VideoConnectionDialog />}
                    <WelcomeToast />
                </>
            );
        }
    } else if (roomJoined) {
        /* Render LoginDialog if not logged in but selected a room. */
        ui = <LoginDialog />;
    } else if (signUp) {
        ui = <SignUpDialog />;
    } else if (signIn) {
        ui = <SignInDialog />
    } else {
        /* Render RoomSelectionDialog if yet selected a room. */
        ui = <RoomSelectionDialog />;
    }

    return (
        <Backdrop className='Backdrop'>
            {ui}
            {!tableDialogOpen}
            
        </Backdrop>
    );
}
export default App;
