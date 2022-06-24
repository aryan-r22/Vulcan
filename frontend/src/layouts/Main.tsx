import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExploreIcon from "@mui/icons-material/Explore";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LanguageIcon from "@mui/icons-material/Language";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import { Badge, Container, InputAdornment, TextField } from "@mui/material";
import Home from "../pages/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import EthereumLogo from "../assets/ethereum-white.png";
import Profile from "../pages/Profile";

const Icons = [
  [
    <ExploreIcon sx={{ color: "#fff" }} />,
    <MusicNoteIcon sx={{ color: "#fff" }} />,
    <SportsEsportsIcon sx={{ color: "#fff" }} />,
    <LanguageIcon sx={{ color: "#fff" }} />,
    <ReceiptLongIcon sx={{ color: "#fff" }} />,
    <PlayCircleIcon sx={{ color: "#fff" }} />,
    <PeopleIcon sx={{ color: "#fff" }} />,
  ],
  [<SettingsIcon sx={{ color: "#fff" }} />, <AccountCircleIcon sx={{ color: "#fff" }} />],
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#2C2F48",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const SearchBar = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    position: "relative",
    background: "transparent",
    border: "1px solid #ced4da",
    color: "white",
    fontSize: 16,
    width: "auto",
    height: "48px",
    outline: "none",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}));

const StyledBoxContainer = styled(Box)(() => ({
  marginTop: "40px",
  flexGrow: 1,
  height: `calc(100vh - 40px) !important`,
  background: "#1D203E",
  overflowY: "scroll",
  overflowX: "hidden",
  width: "100%",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

type SidebarProps = {};

const Main = (props: SidebarProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Box>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SearchBar
                placeholder="Explore Projects"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Box display="flex">
                <Badge variant="dot" color="primary">
                  <IconButton color="inherit">
                    <img
                      src={EthereumLogo}
                      alt="Connect to wallet"
                      style={{ color: "#fff" }}
                      height={24}
                    />
                  </IconButton>
                </Badge>
                <IconButton color="inherit">
                  <LoginIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "rgba(44, 47, 72, 0.5)",
              backdropFilter: "blur(100px)",
            },
          }}
        >
          <DrawerHeader>
            <Typography sx={{ color: "#fff" }} variant="h5">
              Explore
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Home", "Music", "Gaming", "Science & Tech", "Education"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block", color: "#fff" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    if (text === "Home") navigate("/");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {Icons[0][index]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ marginTop: "auto" }}>
            {["Settings", "My Profile"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block", color: "#fff" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    text === "Settings" ? navigate("/settings") : navigate("/profile");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {Icons[1][index]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <StyledBoxContainer>
        <Container maxWidth="lg">
          <Box sx={{ padding: `${matches ? "80px" : "20px"}` }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<div>Settings</div>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Container>
      </StyledBoxContainer>
    </Box>
  );
};

export default Main;
