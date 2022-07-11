import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import GoogleLogo from "../assets/google-logo.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { createCookieInHour } from "../utils/cookies";
import LoginBackground from "../assets/login-bg.jpg";
import { firebaseConfig } from "../utils/firebase";
import LoadingContext from "../contexts/LoadingContext";
import AuthContext from "../contexts/AuthContext";

initializeApp(firebaseConfig);

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loadingContext = useContext(LoadingContext);
  const authContext = useContext(AuthContext);

  const signUpWithEmailAndPassword = async () => {
    try {
      const auth = getAuth();
      loadingContext.setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      authContext?.setUser(res.user.displayName !== null ? res.user.displayName : res.user.email);
      createCookieInHour("user", res?.user?.displayName, 10);
      localStorage.setItem("firstLogin", "true");
      loadingContext.setLoading(false);
      navigate("/");
    } catch (err) {
      loadingContext.setLoading(false);
      console.log(err);
    }
  };

  const GoogleSignUpWithFirebase = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      loadingContext.setLoading(true);
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.displayName);
      authContext?.setUser(res.user.displayName !== null ? res.user.displayName : res.user.email);
      createCookieInHour("user", res?.user?.displayName, 10);
      localStorage.setItem("firstLogin", "true");
      loadingContext.setLoading(false);
      navigate("/");
    } catch (err) {
      loadingContext.setLoading(false);
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        background: `url(${LoginBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          minHeight: "100vh !important",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        maxWidth="xs"
      >
        <Box marginY="auto" display="flex" flexDirection="column" alignItems="center">
          <Typography sx={{ color: "#fff" }} variant="h4" component="h4">
            Sign Up
          </Typography>
          <Box padding={4} display="flex" flexDirection="column">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                padding: "8px 0",
                ".MuiOutlinedInput-input": {
                  background: "#fff",
                },
              }}
              placeholder="Email Address"
              variant="outlined"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                padding: "8px 0",
                ".MuiOutlinedInput-input": {
                  background: "#fff",
                },
              }}
              placeholder="Password"
              type="password"
              variant="outlined"
            />
            <Box sx={{ padding: "8px 0" }}>
              <Button
                onClick={signUpWithEmailAndPassword}
                sx={{ width: "100%" }}
                variant="contained"
              >
                Sign Up
              </Button>
            </Box>
            <Typography sx={{ color: "#fff", marginTop: "12px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#1976d2" }}>
                Sign in!
              </Link>
            </Typography>
          </Box>
          <Divider
            color="#ffffff"
            variant="middle"
            sx={{
              width: "70%",
              color: "#f3f3f3",
              "&::before, &::after": {
                borderColor: "#a0a0a0",
              },
            }}
          >
            or
          </Divider>
          <Box padding={4}>
            <Button
              onClick={GoogleSignUpWithFirebase}
              variant="contained"
              sx={{
                background: "#fff",
                color: "#206aaf",
                textTransform: "none",
                fontSize: "15px",
                "&:hover": {
                  background: "#eee",
                },
              }}
            >
              <img
                src={GoogleLogo}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "20px",
                }}
                alt="google"
              />
              Sign Up with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
