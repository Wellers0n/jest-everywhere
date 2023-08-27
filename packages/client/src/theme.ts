import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C2A3A',
      contrastText: '#fff',
      
    },
    secondary: {
      main: '#fff',
      contrastText: '#1C2A3A',
    },
  },
});

export default theme