import { createTheme } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

const theme = createTheme({
  overrides: {
    MuiAccordionDetails: {
      root: {
        display: "block",
      }
    },
    MuiStepLabel: {
      label: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
      },
    },
  },
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
      light: '#5c67a3',
      main: '#3f4771',
      dark: '#2e355b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff79b0',
      main: '#ff4081',
      dark: '#c60055',
      contrastText: '#000',
    },
      openTitle: '#3f4771',
      protectedTitle: pink['400'],
      type: 'light',
      action: {
        hoverOpacity: 0.1
      }
    }
  })

  export default theme