import React from "react";
import styled from "styled-components";
import { HashRouter } from 'react-router-dom';
import { useAppSelector } from "./hooks";

import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import TableDialog from "./components/TableDialog";
import Chat from "./components/Chat";
import HelperButtonGroup from "./components/HelperButtonGroup";
import WelcomeToast from "./components/ToastNotification";
import DMbutton from "./components/DM/DirectMessageBox";

const Backdrop = styled.div`
  position: absolute;
  z-index: 10;
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
                    <DMbutton />
                </>
            );
        }
    } else if (roomJoined) {
        /* Render LoginDialog if not logged in but selected a room. */
        ui = <LoginDialog />;
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
