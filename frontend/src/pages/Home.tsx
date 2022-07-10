import { Alert, Box } from "@mui/material";
import React from "react";
import Banner from "../components/Banner";
import ProjectsLayout from "../layouts/ProjectsLayout";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const WelcomeSnackbar = ({ user }: Props) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      action={action}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert action={action} onClose={handleClose} severity="info">{`Welcome, ${user}`}</Alert>
    </Snackbar>
  );
};

type Props = {
  user: string | null;
};

const Home = ({ user }: Props) => {
  const firstLogin = localStorage.getItem("firstLogin") === "true";

  if (firstLogin) {
    setTimeout(() => {
      localStorage.setItem("firstLogin", "false");
    }, 5000);
    return (
      <Box>
        <Banner heading={"Find your VcFi community"} />
        <ProjectsLayout projectGroup="Featured Projects" />
        <ProjectsLayout projectGroup="Popular Right Now" />
        <ProjectsLayout projectGroup="Recently Added" />
        <WelcomeSnackbar user={user} />
      </Box>
    );
  }

  return (
    <Box>
      <Banner heading={"Find your VcFi community"} />
      <ProjectsLayout projectGroup="Featured Projects" />
      <ProjectsLayout projectGroup="Popular Right Now" />
      <ProjectsLayout projectGroup="Recently Added" />
    </Box>
  );
};

export default Home;
