import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ba5536',
      light: '#a43820',
      dark: '#46211a',
    },
    secondary: {
      main: '#693d3d',
      light: '#8a4f4f',
      dark: '#522f2f',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#46211a',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#693d3d',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#ba5536',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 