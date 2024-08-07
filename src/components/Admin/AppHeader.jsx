import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import logo from "../../assets/logo.png";
function AppHeader(props) {
  const { sideNavExpanded, setSideNavExpanded } = props;
  return (
    <AppBar position="sticky" sx={style.appBar}>
      <Toolbar>
        <IconButton
          onClick={() =>
            sideNavExpanded
              ? setSideNavExpanded(false)
              : setSideNavExpanded(true)
          }
          color="secondary"
        >
          <MenuTwoToneIcon></MenuTwoToneIcon>
        </IconButton>
        <Box component="img" sx={style.appLogo} src={logo} />
        <Box sx={{ flexGrow: 1 }} />
        {/* <IconButton title="Notification" color="secondary">
          <Badge badgeContent={14} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton title="Setting" color="secondary">
          <SettingsIcon />
        </IconButton>
        <IconButton title="Logout" color="secondary">
          <LogoutIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  appBar: {
    bgcolor: "skyblue",
  },
  appLogo: {
    borderRadius: 2,
    width: 200,
    ml: 2,
    cursor: "pointer",
  },
};
export default AppHeader;
