import React from 'react'
import {render} from 'react-dom'
import App from '../components/App'
import {ThemeProvider} from '@material-ui/core'

import theme from '../../assets/theme'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
    document.body.appendChild(document.createElement('div')),
  )
})
