import React, { Suspense, useState } from "react";

import {
  ThemeProvider,
  Box,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import theme from "../../config/theme.js";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SideNav from "../../components/Admin/SideNav.jsx";
import AppHeader from "../../components/Admin/AppHeader.jsx";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Promotion,
  UserManager,
  ProductManager,
  Voucher,
  Bill,
  Category,
} from "../../routes/AdminRouter.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AdminHomePage() {
  const [sideNavExpanded, setSideNavExpanded] = useState(false);
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader
          setSideNavExpanded={setSideNavExpanded}
          sideNavExpanded={sideNavExpanded}
        />
        <Box sx={style.container}>
          <SideNav sideNavExpanded={sideNavExpanded} />
          <Box component={"main"} sx={style.mainSection}>
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bill" element={<Bill />} />
                <Route path="/productmanager" element={<ProductManager />} />
                <Route path="/usermanager" element={<UserManager />} />
                <Route path="/category" element={<Category />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </ThemeProvider>
      <ToastContainer></ToastContainer>
    </React.Fragment>
  );
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    p: 4,
    height: "100%",
    width: "100%",
    overflow: "auto",
  },
};
export default AdminHomePage;
