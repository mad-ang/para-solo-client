import React from "react";
import styled from "styled-components";

import { useAppSelector } from "./hooks";

import RoomSelectionDialog from "./components/RoomSelectionDialog";
import LoginDialog from "./components/LoginDialog";
import VideoConnectionDialog from "./components/VideoConnectionDialog";
import Chat from "./components/Chat";
import HelperButtonGroup from "./components/HelperButtonGroup";

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const videoConnected = useAppSelector((state) => state.user.videoConnected);
  const roomJoined = useAppSelector((state) => state.room.roomJoined);

  let ui: JSX.Element;
  if (loggedIn) {
    ui = (
      /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
      <>
        <Chat />
        {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
        {!videoConnected && <VideoConnectionDialog />}
      </>
    );
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
      <HelperButtonGroup />
    </Backdrop>
  );
}

export default App;
