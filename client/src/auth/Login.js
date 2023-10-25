import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/Slice/user";
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();

const Login = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const validate = (values) => {
        var errors = {};
        if(!values.email){
            errors.email = "Email is required";
        }
        if(!values.password){
            errors.password = "Password is required";
        }
        return errors;
    }

    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validate,
        onSubmit: async (userInputs)=> {

            dispatch(userLogin({
                    email: userInputs.email,
                    password: userInputs.password,
                }))
                .then((res) => {
                  localStorage.setItem("authToken", res.payload.token);
                  localStorage.setItem("userType", res.payload.type);
                  navigate('/admin/dashboard');
                });
        }
    });

        
          return (
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    autoComplete="email"
                    autoFocus
                  />
                  { formik.errors.email ? <p className="error">{formik.errors.email}</p> : null }
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  { formik.errors.password ? <p className="error">{formik.errors.password}</p> : null }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container className="pb-3 text-center">
                    <Grid item xs>
                      <Link href="#" variant="body2" >
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          );
}

export default Login;
