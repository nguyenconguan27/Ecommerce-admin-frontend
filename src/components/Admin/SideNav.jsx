import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
function SideNav(props) {
  const theme = useTheme();
  const { sideNavExpanded } = props;
  const location = useLocation();
  return (
    <Sidebar
      style={{
        height: "100%",
        top: "auto",
      }}
      breakPoint="md"
      backgroundColor={theme.palette.neutral.light}
      collapsed={!sideNavExpanded}
    >
      <Box sx={style.avatarContainer}>
        <Avatar sx={style.avatar} alt="Channel Name" src={avatar}></Avatar>
        {sideNavExpanded ? (
          <Typography variant="body2" sx={style.yourChannel}>
            {" "}
            Your Channel
          </Typography>
        ) : null}
        {sideNavExpanded ? (
          <Typography variant="overline">React</Typography>
        ) : null}
      </Box>
      <Menu
        menuItemStyles={{
          button: ({ active }) => {
            return {
              backgroundColor: active
                ? theme.palette.neutral.medium
                : undefined,
            };
          },
        }}
      >
        <MenuItem
          active={location.pathname === "/"}
          component={<Link to={"/"} />}
          icon={<DashboardOutlinedIcon />}
        >
          <Typography variant="body2">Thống kê</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/bill"}
          component={<Link to={"/bill"} />}
          icon={<PaymentIcon />}
        >
          <Typography variant="body2">Hoá đơn</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/productmanager"}
          component={<Link to={"/productmanager"} />}
          icon={<Inventory2OutlinedIcon />}
        >
          <Typography variant="body2">Sản phẩm</Typography>
        </MenuItem>
        <MenuItem
          active={location.pathname === "/usermanager"}
          component={<Link to={"/usermanager"} />}
          icon={<PersonOutlineOutlinedIcon />}
        >
          <Typography variant="body2"> Khách Hàng</Typography>
        </MenuItem>
        {/* <MenuItem
          active={location.pathname === "/category"}
          component={<Link to={"/category"} />}
          icon={<CategoryOutlinedIcon />}
        >
          <Typography variant="body2">Danh mục</Typography>
        </MenuItem> */}
      </Menu>
    </Sidebar>
  );
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  avatar: {
    width: "50%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
};
export default SideNav;
