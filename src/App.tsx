import React from "react";
import styled from "styled-components";

import { useAppSelector } from "./hooks";

import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import TableDialog from "./components/TableDialog";
import Chat from "./components/Chat";
import HelperButtonGroup from "./components/HelperButtonGroup";
import WelcomeToast from "./components/ToastNotification";
import SignUpDialog from "./components/SignUpDialog";
import SignInDialog from "./components/SignInDialog";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2567';

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
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
                    <Chat />
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
        <Backdrop>
            {ui}
            {!tableDialogOpen && <HelperButtonGroup />}
        </Backdrop>
    );
}

export default App;
