import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './admin/Header';
import Footer from './admin/Footer';

const defaultTheme = createTheme();
export default function Dashboard() {

  return (
    <ThemeProvider theme={defaultTheme}>
    <Box sx={{ display: 'flex' }}>
    <Header />
    <div className='container-fluid inner-wrapper'>
      <h1> Hello World</h1>
      <Footer />
    </div>
    </Box>
    </ThemeProvider>
      
  );
}