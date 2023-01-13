import 'regenerator-runtime/runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'

import './index.scss'
import './PhaserGame'
import muiTheme from './MuiTheme'
import App from './App'
import store from './stores'
import { QueryClient, QueryClientProvider } from 'react-query';
const container = document.getElementById('root')
const root = createRoot(container!)
const queryClient = new QueryClient();
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  // </React.StrictMode>
)
