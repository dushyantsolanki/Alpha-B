import React, { useState } from "react";
import { ChevronLeftIcon, MenuIcon } from "../../icon/icon";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { authentication } from "../../firebase/";
import { useDispatch, useSelector, logout } from "../../redux";
const drawerWidth = 200;

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData.payload);

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = async () => {
    await authentication.logout();
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#FFA500", zIndex: "1000" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer ? handleDrawerClose : handleDrawerOpen}
            edge="start"
          >
            {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            Alpha Bee
          </Typography>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="User"
              src={
                userData?.photoURL ||
                "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1705175078~exp=1705175678~hmac=62501d338b7243623047fc72e9a7ee10ed847d4c78fcf1af5d29528b60aa4f30"
              }
              sx={{ marginRight: "15px" }}
            />
            <Typography
              variant="h6"
              sx={{ marginRight: "15px", fontSize: "0.8em" }}
              noWrap
            >
              {userData?.displayName.toUpperCase()}
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        style={{ zIndex: "500" }}
      >
        <div style={{ width: drawerWidth }}>
          <div
            style={{
              margin: "4.5rem 0 0 0",
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <Typography variant="h6" noWrap>
              Dashboard Menu
            </Typography>
          </div>
          <Divider />
          <List>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2em",
                }}
                to=""
              >
                {" "}
                Dashboard
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2em",
                }}
                to="editor"
              >
                {" "}
                Editor
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2em",
                }}
                to="profile"
              >
                {" "}
                Profile
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main
        style={{
          flexGrow: 1,
          padding: "0px 0px",
          marginLeft: 0,
        }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          component="div"
          style={{
            // border: "2px solid black",
            minHeight: "90vh",
            width: "90vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Outlet />
        </Typography>
      </main>
    </div>
  );
};

export default DashboardLayout;
