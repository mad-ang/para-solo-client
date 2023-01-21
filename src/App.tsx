// Welcome to our source code!
// Project: 동물의왕국
// Contributed by: 윤중선 <https://github.com/Joong-Sunny> (FE,TL)
//                 이송희 <https://github.com/soneelee> (FE)
//                 우수연 <https://github.com/yeonwooz> (BE)
//                 김희산 <https://github.com/heesankim> (BE)
//                 김기운 <https://github.com/KiwoonKim> (BE)
// Thanks to SWJungle & KAIST where we made this project.
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HashRouter } from 'react-router-dom';
import { useAppSelector } from './hooks';
import EntryDialog from './components/EntryDialog';
import CharacterSelectionDialog from './components/CharacterSelectionDialog';
import VideoConnectionDialog from './components/VideoConnectionDialog';
import TableDialog from './components/TableDialog';
import WelcomeToast from './components/ToastNotification';
import SignUpDialog from './components/SignUpDialog';
import SignInDialog from './components/SignInDialog';
import axios from 'axios';
import NavigationContainer from './components/NavigationUltimate/NavigationContainer';
import { ENTERING_PROCESS, setCharacterSelected, setEnteringProcess } from './stores/UserStore';
import phaserGame from './PhaserGame';
import Game from './scenes/Game';
import Bootstrap from 'scenes/Bootstrap';
import Cookies from 'universal-cookie';
import store from './stores';
import { Tab } from '@mui/material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const cookies = new Cookies();

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' || import.meta.env.VITE_SERVER === 'PRO'
    ? `https://${import.meta.env.VITE_SERVER_URL}`
    : `http://${window.location.hostname}:8080`;

console.log('axios.defaults.baseURL ', axios.defaults.baseURL);

const Backdrop = styled.div`
  font-family: 'Ycomputer-Regular';
  position: absolute;
  z-index: 10;
  height: 90%;
  width: 100%;
`;

function App() {
  const tableDialogOpen = useAppSelector((state) => state.table.tableDialogOpen);
  const videoConnected = useAppSelector((state) => state.user.videoConnected);
  const enteringProcess = useAppSelector((state) => state.user.enteringProcess);
  const characterSelected = useAppSelector((state) => state.user.characterSelected);

  let ui: JSX.Element;
  if (characterSelected) {
    ui = (
      /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
      <>
        <NavigationContainer />
        {tableDialogOpen ? <TableDialog /> : null}
        {/* Render VideoConnectionDialog if user is not connected to a webcam. */}
        {!videoConnected && <VideoConnectionDialog />}
        {!cookies.get('refreshToken') && <WelcomeToast />}
      </>
    );
  } else if (enteringProcess === ENTERING_PROCESS.ENTRY) {
    ui = <EntryDialog hasToken={cookies.get('refreshToken') ? true : false} />;
  } else if (enteringProcess === ENTERING_PROCESS.SIGNUP) {
    ui = <SignUpDialog />;
  } else if (enteringProcess === ENTERING_PROCESS.LOGIN) {
    ui = <SignInDialog />;
  } else {
    ui = (
      <CharacterSelectionDialog
        hasToken={cookies.get('refreshToken') ? true : false}
        playerName={cookies.get('playerName') || null}
        playerTexture={cookies.get('playerTexture') || null}
      />
    );
  }

  return (
    <>
      <Backdrop className="Backdrop">{ui}</Backdrop>
      <PayPalScriptProvider
        options={{
          'client-id':
            'AQ8I5aGAigVewWYkxJqmKqbGP_jLcGXGaSFK7FRrx2SG0sLcokhp8LyrnJC47ecahbqwvBLyDTm9Nps2',
        }}
      >
        {/* <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            /> */}
      </PayPalScriptProvider>
    </>
  );
}
export default App;
