import { ReactNode, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Link,
  SxProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";

// routes

import { Link as RouterLink } from "wouter";

const drawerWidth = 240;

const Root = styled("div")({
  display: "flex",
});

const AppBarHeader = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necesario para que el contenido no se solape con el header
  ...theme.mixins.toolbar,
}));

const AppLayout = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);
  const linkstyle: SxProps = {
    color: "black",
    textDecoration: "none",
  };

  return (
    <Root>
      <AppBarHeader position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Mi aplicación
          </Typography>
        </Toolbar>
      </AppBarHeader>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link sx={linkstyle} component={RouterLink} href={"/"}>
            <a>
              <ListItem
                sx={{
                  cursor: "pointer",
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
              </ListItem>
            </a>
          </Link>
          <Link sx={linkstyle} component={RouterLink} href="/s26">
            <a>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="s26" />
              </ListItem>
            </a>
          </Link>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Root>
  );
};

export { AppLayout };
