import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import firebaseConfig from '../config/firebase.json';
import firebase from 'firebase/compat/app';
import firebaseApp, { login } from '../config/server.js';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import gapiConfig from "../config/gapi.json"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));


export default function Login() {
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       apiKey: firebaseConfig.apiKey,
  //       clientId: gapiConfig.clientId,
  //       scope: "profile email https://www.googleapis.com/auth/documents",
  //     });
  //   };
  //   gapi.load('client:auth2', start);

  //   const accessToken = gapi.auth.getToken().access_token;
  // });



  // console.log(gapi.auth.getToken().access_token);

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.paper}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Fool Me Twice
      </Typography>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in to play
      </Typography>

      <GoogleLogin
        clientId={gapiConfig.clientId}
        buttonText="Sign In with Google"
        onSuccess={login}
        onFailure={login}
        scope="profile email https://www.googleapis.com/auth/documents"
      />
    </Container>
  );
}