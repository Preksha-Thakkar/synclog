import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import {
  GridView,
  Mail,
  Inbox,
  ShoppingCart,
  FormatListNumberedOutlined,
  AssignmentOutlined,
  Padding,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import synctoolsLogo from "../Assets/synctoolsLogo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { deepPurple } from "@mui/material/colors";
import { useState } from "react";
import { MoveToInbox, LocalMallOutlined } from "@mui/icons-material";

const drawerWidth = 240;
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
export const LayoutMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getCurrentLocation = () => {
    console.log(location.pathname);
    return location.pathname;
  };
  const [age, setAge] = useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="appbar"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <div className="d-flex menu a-i-c">
              <img src={synctoolsLogo} />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={10}>
                    <ListItemIcon>
                      <LocalMallOutlined />
                    </ListItemIcon>
                    ChocoLucious x Chocolates Trading Limited
                  </MenuItem>
                  <MenuItem value={20}>
                    <ListItemIcon>
                      <LocalMallOutlined />
                    </ListItemIcon>
                    BioLite x NutraHealth
                  </MenuItem>
                  <MenuItem value={30}>
                    <ListItemIcon>
                      <LocalMallOutlined />
                    </ListItemIcon>
                    Inkbox x CosmeticsCo
                  </MenuItem>
                </Select>
              </FormControl>
              <div>
                <span style={{ color: "black" }}>Remaining Sync: 300</span>
                <BorderLinearProgress variant="determinate" value={50} />
              </div>
              <IconButton>
                <SettingsOutlinedIcon />{" "}
              </IconButton>
              <Avatar sx={{ bgcolor: deepPurple[100] }}>OP</Avatar>
              <LogoutIcon />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem
              disablePadding
              className={getCurrentLocation() == "/" ? "activeLink" : ""}
            >
              <ListItemButton onClick={(event) => navigate("/")}>
                <ListItemIcon>
                  <GridView />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              className={
                getCurrentLocation() == "/sales-orders" ? "activeLink" : ""
              }
            >
              <ListItemButton onClick={(event) => navigate("/sales-orders")}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText primary="Sales Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ pl: 10 }}>
              <ListItemButton onClick={(event) => navigate("/sales-orders")}>
                <ListItemText primary="Refund" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/")}>
                <ListItemIcon>
                  <FormatListNumberedOutlined />
                </ListItemIcon>
                <ListItemText primary="Purchase Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/")}>
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary="COGS" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/")}>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Expenses" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/")}>
                <ListItemIcon>
                  <AssignmentOutlined />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className="salesOrderBox"
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
