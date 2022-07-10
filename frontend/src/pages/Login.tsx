import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import GoogleLogo from "../assets/google-logo.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { createCookieInHour } from "../utils/cookies";
import LoadingContext from "../contexts/LoadingContext";
import LoginBackground from "../assets/login-bg.jpg";
import { firebaseConfig } from "../utils/firebase";

initializeApp(firebaseConfig);

type Props = {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

const Login = ({ setUser }: Props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loadingContext = useContext(LoadingContext);

  const GoogleSignInWithFirebase = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      loadingContext.setLoading(true);
      const res = await signInWithPopup(auth, provider);
      console.log(res.user.displayName);
      setUser(res.user.displayName !== null ? res.user.displayName : res.user.email);
      createCookieInHour("user", res?.user?.displayName, 10);
      localStorage.setItem("firstLogin", "true");
      loadingContext.setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const logInWithEmailAndPassword = async () => {
    const auth = getAuth();
    try {
      loadingContext.setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      setUser(res.user.displayName !== null ? res.user.displayName : res.user.email);
      createCookieInHour("user", res?.user?.displayName, 10);
      localStorage.setItem("firstLogin", "true");
      loadingContext.setLoading(false);
      navigate("/");
    } catch (err) {
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
            Sign In
          </Typography>
          <Box padding={4} display="flex" flexDirection="column">
            <TextField
              sx={{
                padding: "8px 0",
                ".MuiOutlinedInput-input": {
                  background: "#fff",
                },
              }}
              placeholder="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{
                padding: "8px 0",
                ".MuiOutlinedInput-input": {
                  background: "#fff",
                },
              }}
              placeholder="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ padding: "8px 0" }}>
              <Button
                onClick={logInWithEmailAndPassword}
                sx={{ width: "100%" }}
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
            <Typography sx={{ color: "#fff", marginTop: "12px" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#1976d2" }}>
                Sign up!
              </Link>{" "}
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
              onClick={GoogleSignInWithFirebase}
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
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
