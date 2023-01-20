import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import { setShowDM } from 'src/stores/DMboxStore';
import { SetWhichModalActivated, ModalState } from 'src/stores/NavbarStore';

export default function HeadAppBar() {
  const dispatch = useAppDispatch();
  const friendId = useAppSelector((state) => state.dm.friendId);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => {
              dispatch(SetWhichModalActivated(ModalState.ChattingList));
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {friendId}
          </Typography>
          {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>
            <CloseIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
