import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        MY KART
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Footer() {
  return (
    <>
    <Copyright sx={{ pt: 4 }} />
    </>
  );
}