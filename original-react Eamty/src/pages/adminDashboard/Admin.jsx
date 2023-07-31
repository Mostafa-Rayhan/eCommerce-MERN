import * as React from "react";
// import React from "react"
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AllProduct from "./AllProduct";
import AddProduct from "./AddProduct";
import Category from "./Category";
import ManageOrder from "./ManageOrder";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Myprofile from "./Myprofile";
import MyProducts from "./MyProducts";

const drawerWidth = 240;

const Admin = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabSelect, setTabSelect] = React.useState("");
  const navigate = useNavigate();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (localStorage.getItem("ecomuser")) {
      let cUser = JSON.parse(localStorage.getItem("ecomuser"));
      setUser(cUser);
    }
  }, []);


  React.useEffect(() => {
  if(user){
    if(user.role=="retailer"){
      setTabSelect("My profile")
     }
     else if(user.role=="whole_seller")
     setTabSelect("My product")
     else if(user.role=="admin"){
      setTabSelect("all product")
     }
  } 
  }, [user, user?.role]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const home = () => {
    navigate("/");
  };
  const selectMenu = (text) => {
    setTabSelect(text);
  };

  console.log("suer", user );

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      <Toolbar style={{ backgroundColor: "#1976D2" }}>
        <div className="userAvatar">
          <Avatar sx={{ bgcolor: deepOrange[500] }}>OP</Avatar>
          <p>{user?.email}</p>
        </div>
      </Toolbar>

      <Divider />
      <List>
        {user?.role == "admin" &&
          ["all product", "category"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => selectMenu(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        {user?.role == "whole_seller" &&
          [
            // "My profile",
            "My product",
            "add-product",
            "category",
            "Manage Orders",
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => selectMenu(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

        {user?.role == "retailer" &&
          ["My profile"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => selectMenu(text)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <Divider />
      <button className="homebtn" onClick={home}>
        Go To Home
      </button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const getTab = () => {
    // console.log("ttt", tabSelect);
    switch (tabSelect) {
      case "all product":
        return <AllProduct />;
      case "add-product":
        return <AddProduct />;
      case "category":
        return <Category />;
      case "Manage Orders":
        return <ManageOrder />;
      case "My profile":
        return <Myprofile />;
      case "My product":
        return <MyProducts />;

      default:
        <Myprofile />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            E-commerce
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {getTab()}
      </Box>
    </Box>
  );
};

Admin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Admin;
