// src/theme.ts
import { createTheme } from '@mui/material/styles'
import { faIR } from '@mui/material/locale'

const theme = createTheme(
  {
    direction: 'rtl',
    typography: {
      fontFamily: '"Tajawal", "Arial", sans-serif',
    },
    palette: {
      primary: {
        main: '#1EA887',
      },
    },
  },
  faIR
)

export default theme
